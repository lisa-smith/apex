import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  sx?: SxProps<Theme>;
}

export const EmptyState = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  sx,
}: EmptyStateProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mt: 8,
      gap: 1.5,
      ...sx,
    }}
  >
    {icon}
    {title && (
      <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
        {title}
      </Typography>
    )}
    <Typography variant="body2" color="text.disabled" textAlign="center">
      {message}
    </Typography>
    {actionLabel && onAction && (
      <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Box>
);
