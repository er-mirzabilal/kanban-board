import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Checkbox, IconButton, Stack, TextField } from "@mui/material";
import { palette } from "@/theme/palette";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface DatePopover {
  isOpen: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

const DatePopover: React.FC<DatePopover> = ({ isOpen, anchorEl, onClose }) => {
  const [isStartDateChecked, setIsStartDateChecked] = React.useState(false);
  const [isDueDateChecked, setIsDueDateChecked] = React.useState(true);

  const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(
    dayjs()
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsStartDateChecked(event.target.checked);
  };
  const handleDueDateCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDueDateChecked(event.target.checked);
  };

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
            Dates
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
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
          Start Date
        </Typography>
        <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={isStartDateChecked}
            onChange={handleCheckboxChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              sx={{ width: "120px" }}
              value={startDateValue}
              onChange={(newValue) => setStartDateValue(newValue)}
              disabled={!isStartDateChecked}
            />
          </LocalizationProvider>
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
          Due Date
        </Typography>
        <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox 
          checked={isDueDateChecked}
          onChange={handleDueDateCheckboxChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              sx={{ width: "120px" }}
              value={startDateValue}
              onChange={(newValue) => setStartDateValue(newValue)}
              disabled={!isDueDateChecked}
            />
          </LocalizationProvider>
        </Stack>

        <Stack direction={"column"} gap={1} sx={{ p: "10px" }}>
          <IconButton
            sx={{
              display: "flex",
              width: "100%",
              mt: "7px",
              color: palette.base.white,
              justifyContent: "center",
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
            sx={{
              width: "100%",
              color: "#172B4D",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#e4e6ea",
              "&:hover": {
                color: "#172B4D",
                backgroundColor:
                  palette.color.buttonColors.cardModalButtonHover,
              },
            }}
          >
            <Typography variant="text-sm-medium" sx={{ mx: "5px" }}>
              Remove
            </Typography>
          </IconButton>
        </Stack>
      </Popover>
    </div>
  );
};

export default DatePopover;
