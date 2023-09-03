import { COLORS } from "../lib/style";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Box, { BoxProps } from "./base/box";

export interface DividerProps extends BoxProps {
  color?: string;
  inset?: boolean;
  insetType?: "left" | "right" | "middle";
  orientation?: "horizontal" | "vertical";
  width?: number;
}

export const Divider: React.FC<DividerProps> = ({
  color,
  inset = false,
  insetType = "left",
  orientation = "horizontal",
  style,
  width,
  ...rest
}) => (
  <Box
    testID="RNE__Divider"
    style={
      StyleSheet.flatten([
        styles.divider,
        style,
        inset &&
          (insetType === "left"
            ? styles.leftInset
            : insetType === "right"
            ? styles.rightInset
            : { ...styles.leftInset, ...styles.rightInset }),
        orientation === "vertical" && styles.vertical,
        width &&
          (orientation === "horizontal"
            ? { borderBottomWidth: width }
            : { borderRightWidth: width }),
        color &&
          (orientation === "horizontal"
            ? { borderBottomColor: color }
            : { borderRightColor: color }),
      ]) as StyleProp<ViewStyle>
    }
    {...rest}
  />
);

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.divider,
  },
  leftInset: {
    marginLeft: 72,
  },
  rightInset: {
    marginRight: 72,
  },
  vertical: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: COLORS.divider,
    height: "auto",
    alignSelf: "stretch",
  },
  subHeader: {
    includeFontPadding: false,
  },
});
