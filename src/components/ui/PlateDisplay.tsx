import { forwardRef } from "react";
import { Typography, type TypographyProps } from "@mui/material";

interface PlateDisplayProps extends Omit<TypographyProps, "children"> {
  plate: string;
  dimmed?: boolean;
}

export const PlateDisplay = forwardRef<HTMLSpanElement, PlateDisplayProps>(
  ({ plate, dimmed = false, sx, ...rest }, ref) => (
    <Typography
      ref={ref}
      component="span"
      variant="h6"
      sx={{
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: "uppercase",
        color: dimmed ? "text.secondary" : "text.primary",
        transition: "color 0.3s ease",
        ...sx,
      }}
      {...rest}
    >
      {plate}
    </Typography>
  )
);

PlateDisplay.displayName = "PlateDisplay";
