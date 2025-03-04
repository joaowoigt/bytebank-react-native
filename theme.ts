import { createTheme } from "@shopify/restyle";

const palette = {
  primary: "#004D61",
  secondary: "#47A138",
  secondaryVariant: "#E4EDE3",
  negative: "#FF5031",
  gradientStart: "#004D61",
  gradientEnd: "#FFFFFF",
  grey: "#DEE9EA",
  white: "#F8F8F8",
  darkGray: "#8B8B8B",
  black: "#0B0B0B",
  grayVariant: "#CBCBCB",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.secondaryVariant,
    primary: palette.primary,
    secondary: palette.secondary,
    secondaryVariant: palette.secondaryVariant,
    negative: palette.negative,
    gradientStart: palette.gradientStart,
    gradientEnd: palette.gradientEnd,
    grey: palette.grey,
    white: palette.white,
    darkGray: palette.darkGray,
    black: palette.black,
    grayVariant: palette.grayVariant,
  },
  spacing: {
    extraBig: "32",
    small: "8",
    medium: "16",
    big: "24",
  },
  textVariants: {
    header: {
      fontSize: 32,
      fontWeight: "bold",
      color: "black",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: "black",
    },
    small: {
      fontSize: 12,
      color: "black",
    },
  },
});

export type Theme = typeof theme;
export default theme;
