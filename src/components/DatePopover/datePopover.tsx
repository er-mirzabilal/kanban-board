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
import { useDispatch } from "react-redux";
import { updateCardDates } from "@/redux/features/task-list-slice";

interface DatePopover {
  listId: string;
  cardId: string;
  isOpen: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}

const DatePopover: React.FC<DatePopover> = ({
  listId,
  cardId,
  isOpen,
  anchorEl,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [isStartDateChecked, setIsStartDateChecked] = React.useState(false);
  const [isDueDateChecked, setIsDueDateChecked] = React.useState(true);

  const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(
    dayjs()
  );
  const [dueDateValue, setDueDateValue] = React.useState<Dayjs | null>(dayjs());

  const [focusedField, setFocusedField] = React.useState<
    "start" | "due" | null
  >(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsStartDateChecked(event.target.checked);
  };

  const handleDueDateCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsDueDateChecked(event.target.checked);
  };

  const handleCalendarChange = (newValue: Dayjs | null) => {
    if (newValue) {
      if (focusedField === "start" && isStartDateChecked) {
        setStartDateValue(newValue);
        // Ensure the due date is not earlier than the start date
        if (dueDateValue && newValue.isAfter(dueDateValue)) {
          setDueDateValue(newValue);
        }
      } else if (focusedField === "due" && isDueDateChecked) {
        // Ensure the due date is not earlier than the start date
        setDueDateValue(newValue);
        if (startDateValue && newValue.isBefore(startDateValue)) {
          setStartDateValue(newValue);
        }
      }
    }
  };

  const handleSaveClick = () => {
    dispatch(
      updateCardDates({
        listId,
        cardId,
        startDate: isStartDateChecked ? startDateValue : null,
        dueDate: isDueDateChecked ? dueDateValue : null,
      })
    );
    onClose(); // Close the popover after saving
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
          gap={2}
          sx={{ display: "flex", alignItems: "center", p: "10px" }}
        >
          <Typography
            variant="text-xs-semibold"
            sx={{ color: palette.color.textColor.cardModalTextColor }}
          >
            Dates
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={focusedField === "start" ? startDateValue : dueDateValue}
              onChange={handleCalendarChange}
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
              value={isStartDateChecked ? startDateValue : null}
              onChange={(newValue) => setStartDateValue(newValue)}
              onFocus={() => setFocusedField("start")}
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
              value={isDueDateChecked ? dueDateValue : null}
              onChange={(newValue) => setDueDateValue(newValue)}
              onFocus={() => setFocusedField("due")}
              disabled={!isDueDateChecked}
            />
          </LocalizationProvider>
        </Stack>

        <Stack direction={"column"} gap={1} sx={{ p: "10px" }}>
          <IconButton
            onClick={handleSaveClick}
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
