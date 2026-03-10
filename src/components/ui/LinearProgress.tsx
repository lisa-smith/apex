import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import {
  LinearProgress as MuiLinearProgress,
  type LinearProgressProps,
} from "@mui/material";

interface LinearProgressProps_ extends LinearProgressProps {
  statusColor?: string;
}

export const LinearProgress = forwardRef<HTMLSpanElement, LinearProgressProps_>(
  ({ statusColor, sx, ...rest }, ref) => {
    const { palette } = useTheme();
    // Track color adapts to mode — a subtle tint on both dark and light backgrounds
    const trackColor =
      palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

    return (
      <MuiLinearProgress
        ref={ref}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: trackColor,
          ...(statusColor && {
            "& .MuiLinearProgress-bar": {
              bgcolor: statusColor,
              borderRadius: 4,
            },
          }),
          ...sx,
        }}
        {...rest}
      />
    );
  }
);

LinearProgress.displayName = "LinearProgress";
