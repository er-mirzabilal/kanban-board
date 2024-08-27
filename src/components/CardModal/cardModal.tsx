"use client";

import { palette } from "@/theme/palette";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SubtitlesOutlinedIcon from "@mui/icons-material/SubtitlesOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AlignHorizontalLeftRoundedIcon from "@mui/icons-material/AlignHorizontalLeftRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import NotesIcon from "@mui/icons-material/Notes";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "quill/dist/quill.core.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { FC, useRef, useEffect, useState } from "react";
import { MembersPopover } from "../MembersPopover";
import { DatePopover } from "../DatePopover";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppSelecter } from "@/redux/store";
import { addDescription, addCardTitle } from "@/redux/features/task-list-slice";
import { addComment } from "@/redux/features/task-list-slice";
import { Comment } from "../Comment";
import dayjs from "dayjs";

interface CardModal {
  listId: string;
  cardId: string;
  title: string;
  listName?: string;
  openModal: boolean;
  onCloseModal: () => void;
}

const CardModal: FC<CardModal> = ({
  listId,
  cardId,
  title,
  listName,
  openModal,
  onCloseModal,
}) => {
  // const [comment, setComment] = useState([
  //   {
  //     id: 0,
  //     name: "",
  //     comment: "",
  //   },
  // ]);
  const quillRef = useRef<ReactQuill | null>(null);
  const cardTitle = useSelector((state: RootState) => {
    const list = state.rootReducer.tasklist.value.find(
      (list) => list.listId === listId
    );
    if (list) {
      const card = list.cards.find((card) => card.cardId === cardId);
      return card ? card.title : null;
    }
    return null;
  });

  const comments = useSelector((state: RootState) => {
    // Find the list by listId
    const list = state.rootReducer.tasklist.value.find(
      (list) => list.listId === listId
    );
    // If the list is found, find the card by cardId
    if (list) {
      const card = list.cards.find((card) => card.cardId === cardId);
      // Return the comments if the card is found, or an empty array if not
      return card?.comments || [];
    }
    // Return an empty array if the list is not found
    return [];
  });

  const cardDescription = useSelector((state: RootState) => {
    const list = state.rootReducer.tasklist.value.find(
      (list) => list.listId === listId
    );
    if (list) {
      const card = list.cards.find((card) => card.cardId === cardId);
      return card ? card.desc : null;
    }
    return null;
  });

  // const cardStartDate = useSelector((state: RootState) => {
  //   const list = state.rootReducer.tasklist.value.find(
  //     (list) => list.listId === listId
  //   );
  //   if (list) {
  //     const card = list.cards.find((card) => card.cardId === cardId);
  //     return card ? card.startDate : null;
  //   }
  //   return null;
  // });

  const cardStartDate = useSelector((state: RootState) => {
    const list = state.rootReducer.tasklist.value.find(
      (list) => list.listId === listId
    );
    if (list) {
      const card = list.cards.find((card) => card.cardId === cardId);
      return card && card.startDate
        ? dayjs(card.startDate).format("D MMM")
        : null;
    }
    return null;
  });

  // const cardDueDate = useSelector((state: RootState) => {
  //   const list = state.rootReducer.tasklist.value.find(
  //     (list) => list.listId === listId
  //   );
  //   if (list) {
  //     const card = list.cards.find((card) => card.cardId === cardId);
  //     return card ? card.dueDate : null;
  //   }
  //   return null;
  // });

  const cardDueDate = useSelector((state: RootState) => {
    const list = state.rootReducer.tasklist.value.find(
      (list) => list.listId === listId
    );
    if (list) {
      const card = list.cards.find((card) => card.cardId === cardId);
      return card && card.dueDate ? dayjs(card.dueDate).format("D MMM") : null;
    }
    return null;
  });

  const dispatch = useDispatch<AppDispatch>();
  const toolbarOptions = [
    // tool bar options for quill text field
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["link", "image"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  const [titalValue, setTitalValue] = useState(title);
  const [descValue, setDescValue] = useState("");
  const [isDescSaved, setIsDescSaved] = useState(false);
  const [commValue, setCommValue] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDescClick, setIsDescClick] = useState(false);
  const [isCommentClick, setIsCommentClick] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const [name, setName] = useState("Com Name");

  const isCommentValChange = commValue.replace(/<(.|\n)*?>/g, "").trim() !== ""; // Check if there's any non-whitespace content
  const isDescValEmpty = descValue.replace(/<(.|\n)*?>/g, "").trim() !== ""; // Check if there's any non-whitespace content
  // const isDescValEmpty = cardDescription
  //   ? cardDescription.replace(/<(.|\n)*?>/g, "").trim() !== ""
  //   : false; // Handle null case by returning false

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openMemberPopover = Boolean(anchorEl);

  const handleMembersClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlemembersClose = () => {
    setAnchorEl(null);
  };

  // dates popover
  const [anchorElDates, setAnchorElDates] =
    React.useState<HTMLButtonElement | null>(null);
  const openDatesPopover = Boolean(anchorElDates);

  const handleDatesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDates(event.currentTarget);
  };

  const handleDatesClose = () => {
    setAnchorElDates(null);
  };

  const handleTitleBlur = () => {
    // Title blur
    if (titalValue.trim() != "") {
      const payload = {
        listId: listId,
        cardId: cardId,
        cardTitle: titalValue,
      };
      dispatch(addCardTitle(payload));
      setIsEdit(true);
    } else {
      setTitalValue(cardTitle || "");
    }
  };

  const handleDescBlur = () => {
    // Desc blur
    if (descValue != "") {
      setIsDescSaved(true);
      const payload = {
        listId: listId,
        cardId: cardId,
        description: descValue,
      };
      dispatch(addDescription(payload));
      setIsEdit(true);
    }
    if (!isDescValEmpty) {
      // handleDescCancel();
      setIsEdit(false);
      setIsDescClick(false);
      setIsDescSaved(true);
      setDescValue("");
    }
  };

  const handleDescQuillChange = (value: string) => {
    setDescValue(value); // Update state with new content
  };

  const handleCommentBlur = () => {
    if (commValue.trim() && name.trim()) {
      // Dispatch the addComment action with the required payload
      dispatch(
        addComment({
          listId,
          cardId,
          name,
          commValue,
        })
      );

      // Clear the input fields after submitting
      setCommValue("");
      setIsComment(true);
      setIsCommentClick(false);
    }
  };

  const showDescQuill = () => {
    setIsDescSaved(false);
    setIsDescClick(true);
  };

  const handleDescCancel = () => {
    setDescValue(cardDescription ?? "");
    console.log(`is Desc value: ${isDescValEmpty}`);
    if (isDescValEmpty && descValue) {
      console.log(`Desc not empty (0): ${isDescClick}`);
      setIsDescClick(true);
      setIsDescSaved(true);
      setIsEdit(true);
    } else if (cardDescription == "" && !isDescValEmpty) {
      console.log(
        `Desc not empty (1): ${isDescValEmpty} : ${cardDescription}.`
      );
      setIsDescClick(false);
      setIsDescSaved(false);
      setIsEdit(false);
    } else if (cardDescription != "<p><br></p>" && !isDescValEmpty) {
      console.log(
        `Desc not empty (1.1): ${isDescValEmpty} : ${cardDescription}.`
      );
      setIsDescClick(true);
      setIsDescSaved(true);
      setIsEdit(true);
    } else if (cardDescription != "" && !isDescValEmpty) {
      console.log(
        `Desc not empty (1.2): ${isDescValEmpty} : ${cardDescription}.`
      );
      setIsDescClick(true);
      setIsDescSaved(true);
      setIsEdit(true);
    } else if (cardDescription == "" && !isDescValEmpty) {
      console.log(`All desc empty (2): ${isDescValEmpty}`);
      setIsDescClick(false);
      setIsDescSaved(true);
    } else {
      console.log(`Desc not empty (3): ${isDescClick}`);
      setIsDescClick(false);
      setIsDescSaved(false);
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.focus(); // focus for quill
    }
  }, [isDescClick]);

  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
      sx={{ overflow: "auto" }}
    >
      <Box
        sx={{
          overflow: "auto",
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "750px",
          maxHeight: "90%",
          bgcolor: "#F1F2F4",
          boxShadow: 1,
          p: "22px",
          borderRadius: "12px",
        }}
      >
        <Stack direction={"column"}>
          {/* title section */}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Stack
              direction={"row"}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <SubtitlesOutlinedIcon
                sx={{ color: palette.color.iconColors.cardModalIconColor }}
              />
              <TextField
                value={titalValue}
                onChange={(e) => setTitalValue(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTitleBlur();
                  }
                }}
                sx={{
                  width: "100%",
                  border: "none",
                  "& .MuiInputBase-input": {
                    fontSize: "18px", // Change the font size
                    fontWeight: 600,
                    color: "#172B4D", // Change the text color
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none", // Removes the border
                    },
                    "&.Mui-focused fieldset": {
                      border: "2px solid #0c66e4", // Change the border color when focused
                    },
                  },
                }}
              />
            </Stack>
            <IconButton
              sx={{
                "&:hover": {
                  color: "#172B4D",
                  backgroundColor:
                    palette.color.buttonColors.cardModalButtonHover,
                },
              }}
              onClick={() => {
                console.log("Close button clicked"); // Check if this logs when you click the close button
                onCloseModal;
              }}
            >
              <CloseRoundedIcon sx={{ cursor: "pointer" }} />
            </IconButton>
          </Stack>
          <Stack direction={"column"}>
            <Stack
              direction={"row"}
              gap={0.5}
              sx={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Typography
                sx={{
                  color: palette.color.textColor.cardModalLightTextColor,
                }}
              >
                In list
              </Typography>
              <Link
                sx={{
                  cursor: "pointer",
                  color: palette.color.textColor.cardModalLightTextColor,
                }}
              >
                <Typography
                  sx={{
                    color: palette.color.textColor.cardModalLightTextColor,
                  }}
                >
                  {listName}
                </Typography>
              </Link>
            </Stack>
          </Stack>

          {/* left section */}
          <Stack direction={"row"} gap={1.5}>
            {/* description and comments section */}

            <Stack direction={"column"} sx={{ width: "70%" }}>
              {cardDueDate || cardStartDate ? (
                <Stack direction={"column"} sx={{ ml: "100px" }}>
                  <Typography
                    variant="text-xs-semibold"
                    sx={{
                      color: palette.color.textColor.cardModalLightTextColor,
                    }}
                  >
                    {cardDueDate && cardStartDate
                      ? "Dates"
                      : cardStartDate
                      ? "Date"
                      : "Due Date"}
                  </Typography>
                  <IconButton
                    onClick={handleDatesClick}
                    sx={{
                      minWidth: "70px",
                      maxWidth: cardStartDate
                        ? cardDueDate
                          ? "165px"
                          : "110px"
                        : "110px",
                      mt: "7px",
                      color: "#172B4D",
                      display: "flex",
                      justifyContent: "flex-start",
                      backgroundColor: "#e4e6ea",
                      "&:hover": {
                        color: "#172B4D",
                        backgroundColor:
                          palette.color.buttonColors.cardModalButtonHover,
                      },
                    }}
                  >
                    <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                      {cardStartDate ? `${cardStartDate} - ` : ""}
                      {cardDueDate}
                    </Typography>
                    <KeyboardArrowDownRoundedIcon />
                  </IconButton>
                </Stack>
              ) : (
                <></>
              )}

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: "10px",
                }}
              >
                <Stack direction={"row"} gap={1}>
                  <NotesIcon
                    sx={{
                      color: palette.color.iconColors.cardModalIconColor,
                    }}
                  />
                  <Typography
                    variant="text-md-semibold"
                    sx={{ color: palette.color.textColor.cardModalTextColor }}
                  >
                    Description
                  </Typography>
                </Stack>
                {isEdit ? (
                  <IconButton
                    onClick={() => {
                      setIsDescClick(true);
                      setIsDescSaved(false);
                      setIsEdit(false);
                    }}
                    sx={{
                      mt: "7px",
                      color: "#172B4D",
                      display: "flex",
                      justifyContent: "flex-start",
                      backgroundColor: "#e4e6ea",
                      "&:hover": {
                        color: "#172B4D",
                        backgroundColor:
                          palette.color.buttonColors.cardModalButtonHover,
                      },
                    }}
                  >
                    <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                      Edit
                    </Typography>
                  </IconButton>
                ) : (
                  <></>
                )}
              </Stack>
              <br />

              {!isDescClick ? (
                <Box
                  onClick={() => {
                    setIsDescClick(true);
                    setIsDescSaved(false);
                  }}
                  sx={{
                    height: "60px",
                    cursor: "pointer",
                    p: "10px",
                    ml: "30px",
                    borderRadius: "3px",
                    backgroundColor: "#e4e6ea",
                    "&:hover": {
                      color: "#172B4D",
                      backgroundColor:
                        palette.color.buttonColors.cardModalButtonHover,
                    },
                  }}
                >
                  <Typography
                    variant="text-sm-medium"
                    sx={{
                      mx: "5px",
                      color: palette.color.textColor.cardModalLightTextColor,
                    }}
                  >
                    Add a more detailed description...
                  </Typography>
                </Box>
              ) : !isDescSaved ? (
                <Box sx={{ ml: "30px" }}>
                  <Box sx={{ backgroundColor: palette.base.white }}>
                    <ReactQuill
                      ref={quillRef}
                      modules={module}
                      theme="snow"
                      value={descValue}
                      onChange={handleDescQuillChange}
                    />
                  </Box>
                  <Stack direction={"row"} gap={1.5}>
                    <IconButton
                      onClick={handleDescBlur}
                      sx={{
                        mt: "7px",
                        color: palette.base.white,
                        display: "flex",
                        justifyContent: "flex-start",
                        backgroundColor: "#0c66e4",
                        "&:hover": {
                          color: palette.base.white,
                          backgroundColor: "#0055CC",
                        },
                      }}
                    >
                      <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                        Save
                      </Typography>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDescCancel();
                      }}
                      sx={{
                        mt: "7px",
                        color: "#172B4D",
                        display: "flex",
                        justifyContent: "flex-start",
                        backgroundColor: "#e4e6ea",
                        "&:hover": {
                          color: "#172B4D",
                          backgroundColor:
                            palette.color.buttonColors.cardModalButtonHover,
                        },
                      }}
                    >
                      <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                        Cancel
                      </Typography>
                    </IconButton>
                  </Stack>
                </Box>
              ) : (
                <Box
                  sx={{ cursor: "pointer", ml: "30px" }}
                  onClick={() => {
                    showDescQuill();
                    // setIsDescSaved(false);
                    // setIsDescClick(true);
                  }}
                >
                  <Typography
                    sx={{
                      color: palette.color.textColor.cardModalLightTextColor,
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: cardDescription ?? "",
                      }}
                    />
                  </Typography>
                </Box>
              )}

              {/* Activity section head*/}
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: "25px",
                }}
              >
                <Stack direction={"row"} gap={1}>
                  <AlignHorizontalLeftRoundedIcon
                    sx={{
                      color: palette.color.iconColors.cardModalIconColor,
                    }}
                  />
                  <Typography
                    variant="text-md-semibold"
                    sx={{ color: palette.color.textColor.cardModalTextColor }}
                  >
                    Activity
                  </Typography>
                </Stack>
                <IconButton
                  onClick={() => setShowDetails(!showDetails)}
                  sx={{
                    mt: "7px",
                    color: "#172B4D",
                    display: "flex",
                    justifyContent: "flex-start",
                    backgroundColor: "#e4e6ea",
                    "&:hover": {
                      color: "#172B4D",
                      backgroundColor:
                        palette.color.buttonColors.cardModalButtonHover,
                    },
                  }}
                >
                  <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                    {showDetails ? "Show Details" : "Hide Details"}
                  </Typography>
                </IconButton>
              </Stack>

              {/* activity section body */}

              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", mt: "10px" }}
              >
                <Avatar alt="A" src="" sx={{ width: "32px", height: "32px" }} />
                {/* <TextareaAutosize minRows={2} style={{ width: "100%" }} /> */}

                {!isCommentClick ? (
                  <Box
                    onClick={() => {
                      setIsCommentClick(true);
                    }}
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      p: "7px",
                      borderRadius: "7px",
                      boxShadow: `rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px`,
                      backgroundColor: palette.base.white,
                      "&:hover": {
                        color: "#172B4D",
                        backgroundColor: "#F7F8F9",
                      },
                    }}
                  >
                    <Typography
                      variant="text-sm-medium"
                      sx={{
                        mx: "5px",
                        color:
                          palette.color.textColor
                            .cardModalLightCommentTextColor,
                      }}
                    >
                      Write a comment...
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ backgroundColor: palette.base.white }}>
                      <ReactQuill
                        modules={module}
                        theme="snow"
                        value={commValue}
                        onChange={(content) => setCommValue(content)}
                        // onBlur={handleCommentBlur}
                      />
                    </Box>
                    <Stack direction={"row"} gap={1.5}>
                      <IconButton
                        onClick={handleCommentBlur}
                        disabled={!isCommentValChange}
                        sx={{
                          mt: "7px",
                          color: palette.base.white,
                          display: "flex",
                          justifyContent: "flex-start",
                          backgroundColor: "#0c66e4",
                          "&:hover": {
                            color: palette.base.white,
                            backgroundColor: "#0055CC",
                          },
                        }}
                      >
                        <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                          Save
                        </Typography>
                      </IconButton>
                    </Stack>
                  </Box>
                )}
              </Stack>

              {/* {isComment ? <Comment name={name} comment={commValue} /> : <></>} */}

              <div>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Comment
                      listId={listId}
                      cardId={cardId}
                      commentId={comment.id}
                      key={comment.id}
                      name={comment.name}
                      date={comment.date}
                      comment={comment.message}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </Stack>

            {/* right section */}
            <Stack direction={"column"} sx={{ width: "30%" }}>
              <Typography
                variant="text-xs-semibold"
                sx={{ color: palette.color.textColor.cardModalTextColor }}
              >
                Add to card
              </Typography>
              <IconButton
                onClick={handleMembersClick}
                sx={{
                  mt: "7px",
                  color: "#172B4D",
                  display: "flex",
                  justifyContent: "flex-start",
                  backgroundColor: "#e4e6ea",
                  "&:hover": {
                    color: "#172B4D",
                    backgroundColor:
                      palette.color.buttonColors.cardModalButtonHover,
                  },
                }}
              >
                <PersonOutlineRoundedIcon
                  sx={{
                    width: "16",
                    height: "16",
                    color: palette.color.iconColors.cardModalIconColor,
                  }}
                />
                <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                  Members
                </Typography>
              </IconButton>

              <MembersPopover
                isOpen={openMemberPopover}
                anchorEl={anchorEl}
                onClose={handlemembersClose}
              />

              <IconButton
                onClick={handleDatesClick}
                sx={{
                  mt: "7px",
                  color: "#172B4D",
                  display: "flex",
                  justifyContent: "flex-start",
                  backgroundColor: "#e4e6ea",
                  "&:hover": {
                    color: "#172B4D",
                    backgroundColor:
                      palette.color.buttonColors.cardModalButtonHover,
                  },
                }}
              >
                <QueryBuilderRoundedIcon
                  sx={{
                    width: "16",
                    height: "16",
                    color: palette.color.iconColors.cardModalIconColor,
                  }}
                />
                <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
                  Dates
                </Typography>
              </IconButton>
              <DatePopover
                listId={listId}
                cardId={cardId}
                isOpen={openDatesPopover}
                anchorEl={anchorElDates}
                onClose={handleDatesClose}
              />
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CardModal;
