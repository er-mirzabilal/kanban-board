import { palette } from "../palette";

export const MuiIconButton = () => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-sizeSmall": {
            height: "32px",
            width: "32px",
            borderRadius: "5px",
            "&:hover": {
              // backgroundColor: palette.color.gray[10],
              backgroundColor: "#D0D4DB",
            },
          },
          "&.MuiIconButton-sizeMedium": {
            // height: "40px",
            // width: "40px",
          },
          "&.MuiIconButton-sizeLarge": {
            // height: "50px",
            // width: "50px",
          },
          borderRadius: "3px",
          "&:hover": {
            // backgroundColor: palette.color.gray[10],
            backgroundColor: "#AC608A",
          },
        },
      },
    },
  };
};
