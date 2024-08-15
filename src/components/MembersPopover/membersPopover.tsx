import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Stack, TextField } from "@mui/material";
import { palette } from "@/theme/palette";

interface MembersPopover {
  isOpen: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

const MembersPopover: React.FC<MembersPopover> = ({
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
          horizontal: "left",
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
          gap={3}
          sx={{ display: "flex", alignItems: "center", p: "10px" }}
        >
          <Typography
            variant="text-xs-semibold"
            sx={{ color: palette.color.textColor.cardModalTextColor }}
          >
            Members
          </Typography>
          <TextField
            placeholder="search members"
            sx={{ width: "250px" }}
          ></TextField>
        </Stack>
        <Typography
          variant="text-xs-semibold"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            pl: "10px",
            pt: "10px",

            color: palette.color.textColor.cardModalLightTextColor,
          }}
        >
          Board members
        </Typography>

        <Stack
          direction={"row"}
          gap={1.5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: palette.color.gray[10],
            },
            p: "5px",
            m: "10px",
          }}
        >
          <Avatar sx={{ width: "30px", height: "30px", bgcolor: "#DE350B" }}>
            <Typography>MN</Typography>
          </Avatar>
          <Typography>Member name</Typography>
        </Stack>
      </Popover>
    </div>
  );
};

export default MembersPopover;
