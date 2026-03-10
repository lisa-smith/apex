import {
  Box,
  Drawer,
  IconButton,
  Typography,
  type SxProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";

export interface BaseDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  children: ReactNode;
}

const paperSx: SxProps = {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  px: 2.5,
  pt: 1.5,
  pb: 4,
  // Match the app container's max-width so the sheet never stretches on desktop
  maxWidth: 500,
  mx: "auto",
  left: 0,
  right: 0,
  width: "100%",
};

export const BaseDrawer = ({
  open,
  onClose,
  title,
  subtitle,
  disabled = false,
  children,
}: BaseDrawerProps) => (
  <Drawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    slotProps={{ paper: { sx: paperSx } }}
  >
    {/* Drag handle */}
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <Box
        sx={{
          width: 36,
          height: 4,
          borderRadius: 2,
          bgcolor: "rgba(255,255,255,0.2)",
        }}
      />
    </Box>

    {/* Header: title + optional subtitle + close button */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 2.5,
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      <IconButton
        size="small"
        onClick={onClose}
        disabled={disabled}
        aria-label="Close drawer"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>

    {children}
  </Drawer>
);
