import { forwardRef } from "react";
import { Typography, type TypographyProps } from "@mui/material";

type SectionLabelProps = TypographyProps;

export const SectionLabel = forwardRef<HTMLElement, SectionLabelProps>(
  ({ sx, ...rest }, ref) => (
    <Typography
      ref={ref}
      variant="overline"
      color="text.secondary"
      display="block"
      sx={{ letterSpacing: 1.5, mb: 1, ...sx }}
      {...rest}
    />
  )
);

SectionLabel.displayName = "SectionLabel";
