import React from "react";
import Box, { BoxProps } from "./box";

type CenterProps = React.PropsWithChildren<BoxProps>;

const Center = React.forwardRef<unknown, CenterProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Box ref={ref} justifyContent="center" alignItems="center" {...rest}>
        {children}
      </Box>
    );
  },
);

export default Center;
