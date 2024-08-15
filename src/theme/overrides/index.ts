import { Theme } from "@mui/material/styles";
import { MuiButton } from "./MuiButton";
import { MuiTextField } from "./MuiTextField";
import { MuiSwitch } from "./MuiSwitch";
import { MuiIconButton } from "./MuiIconButton";

export const overrides = (theme: Theme) => ({
  ...MuiButton(),
  ...MuiTextField(), 
  ...MuiSwitch(),
  ...MuiIconButton(),
});
