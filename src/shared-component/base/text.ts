import { GeoTheme } from "@/lib/theme";
import { createText } from "@shopify/restyle";

const Text = createText<GeoTheme>();

export type TextProps = React.ComponentProps<typeof Text>;

export default Text;
