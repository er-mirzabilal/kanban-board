"use client";

import { palette } from "@/theme/palette";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import React, { FC, useState } from "react";
import Modal from "@mui/material/Modal";
import { CardModal } from "../CardModal";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(open);
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: palette.base.white,
        borderRadius: "7px",
        p: "10px",
        mt: "7px",
        boxShadow: `rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px`,
        cursor: "pointer",
        "&:hover": {
          border: `1px solid #388BFF`,
        },
      }}
      // onClick={handleOpen}
    >
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography variant="text-sm-regular">{title}</Typography>
          <CreateRoundedIcon
            sx={{
              width: "16px",
              height: "16px",
              color: palette.color.iconColors.cardModalIconColor,
            }}
          />
        </Stack>
        {/* card desc, comment icons */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ display: "flex", alignItems: "center", mt: "5px" }}
        >
          <Stack direction={"row"} gap={1}>
            <NotesIcon
              sx={{
                width: "16px",
                height: "16px",
                color: palette.color.iconColors.cardModalIconColor,
              }}
            />
            <ChatBubbleOutlineRoundedIcon
              sx={{
                width: "16px",
                height: "16px",
                color: palette.color.iconColors.cardModalIconColor,
              }}
            />
          </Stack>
          <Avatar
            sx={{ width: "24px", height: "24px", backgroundColor: "#DE5737" }}
          >
            <Typography variant="text-xxs-medium">AY</Typography>
          </Avatar>
        </Stack>
      </Stack>
      <CardModal
        listId={listId}
        cardId={cardId}
        title={title}
        listName={listTitle}
        openModal={open}
        onCloseModal={handleClose}
      />
      <Button
        variant="contained"
        sx={{ width: "100%", mt: "5px", backgroundColor: "#aaa" }}
        onClick={handleOpen}
      >
        Open
      </Button>
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
