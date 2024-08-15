import { palette } from "../palette";

export const MuiTextField = () => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.MuiTextField-sizeSmall": {
            height: "42px",
            borderRadius: 7,
          },

          "&.MuiTextField-sizeLarge:hover": {
            height: "42px",
            borderRadius: "8px !important",
          },

          "& .MuiOutlinedInput-root": {
            borderRadius: "3px ",

            "& fieldset": {
              borderColor: palette.color.gray[120],
            },
            "& .Mui-focused fieldset": {
              borderRadius: "3px !important",
            },
          },

          "& .MuiInputBase-input": {
            height: "32px",
            padding: "0px 10px",
            // width: "100%",
            borderRadius: 2,
            color: palette.base.black,
            "&:hover": {},
            "&::placeholder": {
              // color: palette.color.gray[100],
              color: "#626F86",
            },
            "&:-webkit-autofill": {
              // change input field color on auto fill
              WebkitBoxShadow: `0 0 0 100px ${palette.base.white} inset`,
              WebkitTextFillColor: palette.base.black,
            },
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #307ECC inset",
            WebkitTextFillColor: "ffffff",
          },
        },
        contained: {},
        outlined: {
          border: `1px solid ${palette.color.gray[400]}`,
          color: palette.color.gray[700],
          borderRadius: "3px",
        },
        standard: {
          border: "none",
        },
      },
    },
  };
};
