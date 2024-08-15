import { TypographyOptions } from "@mui/material/styles/createTypography";

export const typography: TypographyOptions = {
  fontFamily: "Inter, sans-serif",
  h1: {
    fontSize: "56px",
    lineHeight: "normal",
    fontWeight: 700,
  },
  h2: {
    fontSize: "48px",
    lineHeight: "normal",
    fontWeight: 700,
  },
  h3: {
    fontSize: "40px",
    lineHeight: "normal",
    fontWeight: 700,
  },
  h4: {
    fontSize: "32px",
    lineHeight: "normal",
    fontWeight: 700,
  },
  h5: {
    fontSize: "24px",
    lineHeight: "normal",
    fontWeight: 700,
  },
  h6: {
    fontSize: "16px",
    lineHeight: "normal",
    fontWeight: 700,
  },
  subtitle1: {
    fontWeight: 400,
    fontStyle: "normal",
  },
  subtitle2: {
    fontSize: "15px",
    lineHeight: "normal",
  },
  body1: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "normal",
  },
  body2: {
    fontSize: "12px",
    lineHeight: "normal",
  },
  caption: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "normal",
  },
  overline: {
    fontSize: "11px",
    fontWeight: 400,
    lineHeight: "normal",
  },
  button: {
    fontSize: "14px !important",
    fontWeight: 700,
    lineHeight: "normal",
  },
};

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    "display-2xl-bold": true;
    "display-2xl-semibold": true;
    "display-2xl-medium": true;
    "display-2xl-regular": true;
    "display-xxl-bold": true;
    "display-xl-bold": true;
    "display-xl-semibold": true;
    "display-xl-medium": true;
    "display-xl-regular": true;
    "display-lg-regular": true;
    "display-lg-medium": true;
    "display-lg-semibold": true;
    "display-lg-bold": true;
    "display-md-bold": true;
    "display-md-semibold": true;
    "display-md-medium": true;
    "display-md-regular": true;
    "display-sm-regular": true;
    "display-sm-medium": true;
    "display-sm-semibold": true;
    "display-sm-bold": true;
    "display-xs-bold": true;
    "display-xs-semibold": true;
    "display-xs-medium": true;
    "display-xs-regular": true;
    "text-xl-bold": true;
    "text-xl-semibold": true;
    "text-xl-medium": true;
    "text-xl-regular": true;
    "text-lg-regular": true;
    "text-lg-medium": true;
    "text-lg-semibold": true;
    "text-lg-bold": true;
    "text-md-bold": true;
    "text-md-semibold": true;
    "text-md-medium": true;
    "text-md-regular": true;
    "text-sm-regular": true;
    "text-sm-medium": true;
    "text-sm-semibold": true;
    "text-sm-bold": true;
    "text-xs-bold": true;
    "text-xs-semibold": true;
    "text-xs-medium": true;
    "text-xs-small": true;
    "text-xs-regular": true;
    "text-xs-regular-color": true;
    "text-xs": true;
    "text-xxs-small": true;
    "text-xxs-medium": true;
    "text-xxs-semi-bold": true;
    "text-xxs-bold": true;
    "text-sm": true;
    "display-xs": true;
    "text-xxs-regular": true;
    "display-xs-response": true;
    "display-xs-response-bold": true;
  }
}
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    miniMobile: true;
  }
}
