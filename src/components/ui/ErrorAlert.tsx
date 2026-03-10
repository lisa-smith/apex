import { forwardRef } from "react";
import { Alert, type AlertProps } from "@mui/material";
import { Button } from "./Button";

interface ErrorAlertProps extends Omit<AlertProps, "severity" | "action" | "children"> {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert = forwardRef<HTMLDivElement, ErrorAlertProps>(
  ({ message, onRetry, sx, ...rest }, ref) => (
    <Alert
      ref={ref}
      severity="error"
      sx={{ mb: 2, ...sx }}
      action={
        onRetry ? (
          <Button size="small" color="inherit" onClick={onRetry}>
            Retry
          </Button>
        ) : undefined
      }
      {...rest}
    >
      {message}
    </Alert>
  )
);

ErrorAlert.displayName = "ErrorAlert";
