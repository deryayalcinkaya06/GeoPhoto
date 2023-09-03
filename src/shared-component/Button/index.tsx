import { GeoTheme } from "@/lib/theme";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import Text, { TextProps } from "../base/text";
import BaseTouchable, { BaseTouchableProps } from "../base/touchable";

export type ButtonVariant = "primary" | "secondary";

type Props = {
  label: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  labelProps?: Partial<TextProps>;
  upperCase?: boolean;
} & Partial<BaseTouchableProps>;

const Button = React.forwardRef<TouchableOpacity, Props>(
  (
    {
      label,
      variant = "primary",
      loading,
      fullWidth = true,
      labelProps,
      upperCase = true,
      ...rest
    },
    ref,
  ) => {
    const { colors } = useTheme<GeoTheme>();
    const loadingOrDisabled = loading || rest.disabled;
    const isPrimary = variant === "primary";

    const _label = upperCase
      ? label.toLocaleUpperCase("tr")
      : label;

    return (
      <BaseTouchable
        accessibilityRole={rest.accessibilityRole ?? "button"}
        accessibilityState={
          rest.accessibilityState ?? { disabled: loadingOrDisabled }
        }
        accessibilityHint={rest.accessibilityHint ?? "Tap to submit"}
        accessibilityLabel={rest.accessibilityLabel ?? label}
        ref={ref}
        disabled={loading}
        height={50}
        bg={isPrimary ? "baseOrange" : "white"}
        width={fullWidth ? "100%" : undefined}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"xs"}
        borderWidth={variant === "secondary" ? 1 : 0}
        borderColor={isPrimary ? undefined : "baseOrange"}
        opacity={loadingOrDisabled ? 0.5 : 1}
        px="md"
        {...rest}>
        {loading ? (
          <ActivityIndicator
            size={24}
            color={isPrimary ? colors.white : colors.baseOrange}
          />
        ) : (
          <Text
            color={isPrimary ? "white" : "baseOrange"}
            variant={"buttonText"}
            fontWeight={"bold"}
            numberOfLines={1}
            {...labelProps}>
            {_label}
          </Text>
        )}
      </BaseTouchable>
    );
  },
);

export default Button;
