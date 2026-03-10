import { forwardRef } from "react";
import { Card as MuiCard, type CardProps as MuiCardProps } from "@mui/material";

export interface CardProps extends MuiCardProps {
  accentColor?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ accentColor, sx, children, ...rest }, ref) => (
    <MuiCard
      ref={ref}
      sx={{
        // Use theme-aware divider color when no accentColor is provided
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: accentColor ?? "divider",
        ...(accentColor && { borderLeftWidth: "4px" }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiCard>
  )
);

Card.displayName = "Card";
