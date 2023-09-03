import { GeoTheme } from "@/lib/theme";
import { createBox } from "@shopify/restyle";

const Box = createBox<GeoTheme>();
export type BoxProps = React.ComponentProps<typeof Box>;

export default Box;
