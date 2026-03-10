import { forwardRef } from "react";
import { Chip as MuiChip, type ChipProps as MuiChipProps } from "@mui/material";

export interface ChipProps extends MuiChipProps {
  statusColor?: string;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ statusColor, sx, ...rest }, ref) => (
    <MuiChip
      ref={ref}
      size="small"
      sx={
        statusColor
          ? {
              bgcolor: `${statusColor}22`,
              color: statusColor,
              border: `1px solid ${statusColor}`,
              fontWeight: 700,
              ...sx,
            }
          : sx
      }
      {...rest}
    />
  )
);

Chip.displayName = "Chip";
