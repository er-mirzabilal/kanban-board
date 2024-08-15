"use client";

import { palette } from "@/theme/palette";
import {
  Avatar,
  Box,
  Divider,
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
import "quill/dist/quill.core.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { FC, useEffect, useState } from "react";
import { MembersPopover } from "../MembersPopover";
import { DatePopover } from "../DatePopover";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelecter } from "@/redux/store";


interface CardModal {
  title: string;
  listName?: string;
  openModal: boolean;
  onCloseModal: () => void;
}

const CardModal: FC<CardModal> = ({
  title,
  listName,
  openModal,
  onCloseModal,
}) => {
  const [comment, setComment] = useState([
    {
      id: 0,
      name: "",
      comment: "",
    },
  ]);

  // const cardtitle = useAppSelecter((state) => state.rootReducer.taskcard);

  const dispatch = useDispatch<AppDispatch>();
  const toolbarOptions = [ // tool bar options for quill text field
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
  const [commValue, setCommValue] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isDescClick, setIsDescClick] = useState(false);
  const [isCommentClick, setIsCommentClick] = useState(false);
  const [isComment, setIsComment] = useState(true);

  const isCommentValChange = commValue.replace(/<(.|\n)*?>/g, "").trim() !== ""; // Check if there's any non-whitespace content

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
    console.log("Title was entered.");
    // dispatch(setCardTitle(titalValue));
  };

  const handleDescBlur = () => {
    // Desc blur
    console.log("Desc was entered.");
    // custom logic here
    // dispatch(setCardDesc(descValue));
  };

  const handleCommentBlur = () => {
    // Comment blur
    console.log("Comment was entered.");
    // custom logic here
    // dispatch(addCardActivity({ id: 0, name: "User Name", comment: commValue }));
  };

  useEffect(() => {
    console.log(`Is Open: ${openModal}`);
  }, [openModal]);

  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box
        sx={{
          overflow: "auto",
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "750px",
          //   height: "",
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
                defaultValue={title}
                onChange={(e) => setTitalValue(e.target.value)}
                onBlur={handleTitleBlur}
                sx={{
                  width: "224px",
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
          <Stack direction={"row"}>
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
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: "50px",
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
              {/* <TextareaAutosize minRows={2} /> */}

              {!isDescClick ? (
                <Box
                  onClick={() => {
                    setIsDescClick(!isDescClick);
                  }}
                  sx={{
                    height: "60px",
                    cursor: "pointer",
                    p: "10px",
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
              ) : (
                <Box>
                  <ReactQuill
                    modules={module}
                    theme="snow"
                    value={descValue}
                    onChange={setDescValue}
                    onBlur={handleDescBlur}
                    // style={{ minHeight: "200px" }}
                  />
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
                      onClick={() => setIsDescClick(!isDescClick)}
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
                    <ReactQuill
                      modules={module}
                      theme="snow"
                      value={commValue}
                      onChange={(content) => setCommValue(content)}
                      // onBlur={handleCommentBlur}
                    />
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

              {isComment ? (
                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{ width: "100%", mt: "20px" }}
                >
                  <Avatar
                    alt="A"
                    src=""
                    sx={{ width: "32px", height: "32px" }}
                  />
                  <Stack direction={"column"} gap={0.5} sx={{ width: "100%" }}>
                    <Typography
                      variant="text-xs-bold"
                      sx={{ color: palette.color.textColor.cardModalTextColor }}
                    >
                      User Name
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
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
                        comment...
                      </Typography>
                    </Box>
                    <Stack direction={"row"} gap={1}>
                      <Link sx={{ cursor: "pointer" }}>
                        <Typography
                          variant="text-xs-small"
                          sx={{
                            color:
                              palette.color.textColor.cardModalLightTextColor,
                          }}
                        >
                          Edit
                        </Typography>
                      </Link>
                      <Divider />
                      <Link sx={{ cursor: "pointer" }}>
                        <Typography
                          variant="text-xs-small"
                          sx={{
                            color:
                              palette.color.textColor.cardModalLightTextColor,
                          }}
                        >
                          Delete
                        </Typography>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <></>
              )}
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
