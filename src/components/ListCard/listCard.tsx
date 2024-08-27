"use client";

import { palette } from "@/theme/palette";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import React, { FC, useState } from "react";
import Modal from "@mui/material/Modal";
import { CardModal } from "../CardModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ListCard {
  listId: string;
  listTitle: string;
  cardId: string;
  title: string;
  desc?: string;
  date?: string;
  dueDate?: string;
  activity?: [
    {
      name?: string;
      comment?: string;
    }
  ];
  members?: [
    {
      name?: string;
    }
  ];
}

const ListCard: FC<ListCard> = ({
  listId,
  listTitle,
  cardId,
  title,
  desc,
  date,
  dueDate,
  activity,
  members,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isCardHovered, setIsCardHovered] = useState(false);
  console.log(open);
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

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: palette.base.white,
        borderRadius: "7px",
        p: "10px",
        mt: "7px",
        border: `1px solid #00FFFFFF`,
        boxShadow: `rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px`,
        "&:hover": {
          border: `1px solid #388BFF`,
        },
      }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      // onClick={handleOpen}
    >
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="text-sm-regular">{title}</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#aaa" }}
            onClick={handleOpen}
          >
            Open
          </Button>
          {isCardHovered && (
            <CreateRoundedIcon
              sx={{
                width: "16px",
                height: "16px",
                color: palette.color.iconColors.cardModalIconColor,
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from triggering Box's onClick
                // Handle icon click event here
              }}
            />
          )}
        </Stack>
        {/* card desc, comment icons */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ display: "flex", alignItems: "center", mt: "0px" }}
        >
          <Stack direction={"row"} gap={1}>
            {cardDescription ? (
              <NotesIcon
                sx={{
                  mt: "5px",
                  width: "16px",
                  height: "16px",
                  color: palette.color.iconColors.cardModalIconColor,
                }}
              />
            ) : (
              <></>
            )}

            {comments.length != 0 ? (
              <ChatBubbleOutlineRoundedIcon
                sx={{
                  mt: "5px",
                  width: "16px",
                  height: "16px",
                  color: palette.color.iconColors.cardModalIconColor,
                }}
              />
            ) : (
              <></>
            )}
          </Stack>
          {comments.length != 0 ? (
            <Avatar
              sx={{
                mt: "5px",
                width: "24px",
                height: "24px",
                backgroundColor: "#DE5737",
              }}
            >
              <Typography variant="text-xxs-medium">AY</Typography>
            </Avatar>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
      <CardModal
        listId={listId}
        cardId={cardId}
        title={title}
        listName={listTitle}
        openModal={open}
        onCloseModal={() => setOpen(false)}
      />
      {/* <Button
        variant="contained"
        sx={{ width: "100%", mt: "5px", backgroundColor: "#aaa" }}
        onClick={handleOpen}
      >
        Open
      </Button> */}
      {/* <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </Box>
  );
};

export default ListCard;
