import { GeoTheme } from "@/lib/theme";
import { createBox } from "@shopify/restyle";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const BaseTouchable = createBox<GeoTheme, TouchableOpacityProps>(
  TouchableOpacity,
);

export type BaseTouchableProps = React.ComponentProps<typeof BaseTouchable>;

export default BaseTouchable;
