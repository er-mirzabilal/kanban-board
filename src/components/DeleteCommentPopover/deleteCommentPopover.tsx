import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Button, IconButton, Stack, TextField } from "@mui/material";
import { palette } from "@/theme/palette";

interface DeleteCommentPopover {
  isOpen: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

const DeleteCommentPopover: React.FC<DeleteCommentPopover> = ({
  isOpen,
  anchorEl,
  onClose,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          top: "5px",
          "& .css-3bmhjh-MuiPaper-root-MuiPopover-paper": {
            borderRadius: "7px",
          },
        }}
      >
        <Stack
          direction={"column"}
          gap={1.5}
          sx={{ display: "flex", alignItems: "center", p: "10px" }}
        >
          <Typography
            variant="text-xs-semibold"
            sx={{ color: palette.color.textColor.cardModalTextColor }}
          >
            Delete comment?
          </Typography>
          <Typography
            variant="text-xs-semibold"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              pl: "10px",
              pt: "10px",

              color: palette.color.textColor.cardModalTextColor,
            }}
          >
            Deleting a comment is forever. There is no undo.
          </Typography>
          <IconButton
            sx={{
              width: "100%",
              mt: "7px",
              color: palette.base.white,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#c9372c",
              "&:hover": {
                color: palette.base.white,
                backgroundColor: "#AE2E24",
              },
            }}
          >
            <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
              Delete comment
            </Typography>
          </IconButton>
        </Stack>
      </Popover>
    </div>
  );
};

export default DeleteCommentPopover;
