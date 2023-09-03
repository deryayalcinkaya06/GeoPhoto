import { TextStyle } from "react-native";

export const COLORS = {
  baseOrange: "#F14E23",
  backgroundGray: "#E5E5E566",
  baseGray: "#B0B0B0",
  linkGray: "#989898",
  white: "#FFFFFF",
  darkBlue: "#014876",
  softBlue: "#5D8EAE",
  textSuccess: "#5CC83B",
  textBase: "#3C4044",
  textGray: "#828282",
  textError: "#bf2404",
  textWarning: "#eea702",
  transparent: "transparent",
  divider: "#D8D5D5",
  inputPlaceholder: "#c7c7cd",
};

export const radius = {
  xs: 4,
  sm: 8,
  md: 24,
  lg: 64,
  hg: 128,
  full: 9999,
  none: 0,
};

export const fontSize = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 18,
  buttonText: 16,
  paragraph: 14,
  small: 12,
  xs: 8,
};

export const margin = {
  "0": 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 48,
  hg: 128,
};

export const fontFamily = {
  // regular: "",
};

export const textBase: TextStyle = {
  // fontFamily: fontFamily.regular,
  color: "textBase",
};

export const h1: TextStyle = {
  ...textBase,
  lineHeight: 90,
  fontSize: fontSize.h1,
};

export const h2: TextStyle = {
  ...textBase,
  lineHeight: 64,
  fontSize: fontSize.h2,
};

export const h3: TextStyle = {
  ...textBase,
  lineHeight: 45,
  fontSize: fontSize.h3,
};

export const h4: TextStyle = {
  ...textBase,
  lineHeight: 32,
  fontSize: fontSize.h4,
};

export const paragraph: TextStyle = {
  ...textBase,
  fontSize: fontSize.paragraph,
  lineHeight: 18,
};

export const paragraphBold: TextStyle = {
  ...paragraph,
  fontWeight: "700",
};

export const small: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.small,
  lineHeight: 16,
};

export const smallBold: TextStyle = {
  ...small,
  fontWeight: "bold",
};

export const buttonText: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.buttonText,
  lineHeight: 22,
};

export const xsmall: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.xs,
  lineHeight: 16,
};

export const xsmallBold: TextStyle = {
  ...xsmall,
  fontWeight: "700",
};

export const textVariants = {
  h1,
  h2,
  h3,
  h4,
  buttonText,
  paragraph,
  small,
  xsmall,
};
