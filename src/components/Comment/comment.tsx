"use client";

import { palette } from "@/theme/palette";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import "quill/dist/quill.core.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { editComment, deleteComment } from "@/redux/features/task-list-slice";

import React, { FC, useState } from "react";
import { DeleteCommentPopover } from "../DeleteCommentPopover";
import { AppDispatch } from "@/redux/store";

interface CommentProps {
  listId: string;
  cardId: string;
  commentId: number;
  name: string;
  date?: string;
  comment: string;
}

const Comment: FC<CommentProps> = ({
  listId,
  cardId,
  commentId,
  name,
  date,
  comment,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [newMessage, setNewMessage] = useState(comment);
  const [isEditCommentClick, setIsEditCommentClick] = useState(false);

  const openDeletePopover = Boolean(anchorEl);
  const [isEditComment, setIsEditComment] = useState(false);
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

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteClose = () => {
    setAnchorEl(null);
  };

  const handleSaveCommentBlur = () => {
    if (newMessage.trim() && name.trim()) {
      // Dispatch the editComment action with the required payload
      dispatch(
        editComment({
          listId,
          cardId,
          commentId,
          newMessage,
        })
      );

      setIsEditComment(false);

      console.log("Commet Added.");
    }
  };

  const handleDelete = (listId: string, cardId: string, commentId: number) => {
    dispatch(deleteComment({ listId, cardId, commentId }));
  };

  return (
    <Stack direction={"row"} gap={1} sx={{ width: "100%", mt: "20px" }}>
      <Avatar alt="A" src="" sx={{ width: "32px", height: "32px" }} />
      <Stack direction={"column"} gap={0.5} sx={{ width: "100%" }}>
        <Stack direction={"row"} gap={1}>
          <Typography
            variant="text-xs-bold"
            sx={{ color: palette.color.textColor.cardModalTextColor }}
          >
            {name}
          </Typography>
          <Typography
            variant="text-xs-small"
            sx={{ color: palette.color.textColor.cardModalLightTextColor }}
          >
            {date}
          </Typography>
        </Stack>
        {isEditComment ? (
          <Box sx={{ width: "100%" }}>
            <ReactQuill
              modules={module}
              theme="snow"
              value={newMessage || ""}
              onChange={(content) => setNewMessage(content)}
              // onBlur={handleCommentBlur}
            />
            <Stack direction={"row"} gap={1.5}>
              <IconButton
                onClick={handleSaveCommentBlur}
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
                  setIsEditComment(false);
                }}
                // disabled={!isCommentValChange}
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
                  Discard Changes
                </Typography>
              </IconButton>
            </Stack>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              p: "7px",
              borderRadius: "7px",
              boxShadow: `rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px`,
              backgroundColor: palette.base.white,
            }}
          >
            <Typography
              variant="text-sm-medium"
              sx={{
                mx: "5px",
                color: palette.color.textColor.cardModalTextColor,
                display: "flex", // Make sure Typography doesn't add extra space
              }}
            >
              <div
                style={{
                  marginTop: 2,
                  marginBottom: 2,
                  fontSize: "inherit",
                }}
                dangerouslySetInnerHTML={{
                  __html: comment || "",
                }}
              />
            </Typography>
          </Box>
        )}

        <Stack direction={"row"} gap={1}>
          <Link sx={{ cursor: "pointer" }}>
            <Typography
              variant="text-xs-small"
              sx={{
                color: palette.color.textColor.cardModalLightTextColor,
              }}
              onClick={() => setIsEditComment(true)}
            >
              Edit
            </Typography>
          </Link>
          <Divider />
          <Link sx={{ cursor: "pointer" }}>
            <Typography
              variant="text-xs-small"
              sx={{
                color: palette.color.textColor.cardModalLightTextColor,
              }}
              onClick={handleDeleteClick}
            >
              Delete
            </Typography>
          </Link>
          <DeleteCommentPopover
            isOpen={openDeletePopover}
            anchorEl={anchorEl}
            onClose={handleDeleteClose}
            onDelete={() => handleDelete(listId, cardId, commentId)}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Comment;
