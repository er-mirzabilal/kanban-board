import { ThemeProvider } from "@mui/material";
import { customTheme } from ".";
import { ReactNode } from "react";

const MuiThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={customTheme}> {children} </ThemeProvider>;
};

export default MuiThemeProvider;
