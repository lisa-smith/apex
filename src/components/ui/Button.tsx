import { forwardRef } from "react";
import {
  Button as MuiButton,
  CircularProgress,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      loadingText = "Loading…",
      disabled,
      children,
      startIcon,
      sx,
      ...rest
    },
    ref
  ) => (
    <MuiButton
      ref={ref}
      disabled={disabled || loading}
      startIcon={
        loading ? <CircularProgress size={18} color="inherit" /> : startIcon
      }
      sx={{ minHeight: 48, textTransform: "none", fontWeight: 600, ...sx }}
      {...rest}
    >
      {loading ? loadingText : children}
    </MuiButton>
  )
);

Button.displayName = "Button";
