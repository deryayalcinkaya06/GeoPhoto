import { createTheme } from "@shopify/restyle";
import {
  COLORS,
  fontSize,
  margin,
  textVariants,
  textBase,
  radius,
} from "./style";

const geoTheme = createTheme({
  colors: {
    ...COLORS,
  },
  spacing: {
    ...margin,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      ...textBase,
      fontSize: fontSize.paragraph,
    },
    ...textVariants,
  },
  borderRadii: {
    ...radius,
  },
});

export type GeoTheme = typeof geoTheme;

export default geoTheme;
