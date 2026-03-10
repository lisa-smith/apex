import { Avatar, Box, Typography, type SxProps, type Theme } from "@mui/material";

// Hardcoded for MVP — would come from an auth session in production
const OFFICER = {
  initials: "LP",
  name: "Lisa Portillo",
  badge: "#7702",
} as const;

interface UserProfileProps {
  showAvatar?: boolean;
  sx?: SxProps<Theme>;
}

export const UserProfile = ({ showAvatar = true, sx }: UserProfileProps) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ...sx }}>
    {showAvatar && (
      <Avatar
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          fontWeight: 700,
        }}
      >
        {OFFICER.initials}
      </Avatar>
    )}
    <Box>
      <Typography variant="subtitle2" fontWeight={700}>
        {OFFICER.name}
      </Typography>
      <Typography variant="caption" color="text.secondary" display="block">
        Badge {OFFICER.badge}
      </Typography>
    </Box>
  </Box>
);
