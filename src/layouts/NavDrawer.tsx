import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../context/ColorModeContext";
import { UserProfile } from "../components/ui";
import { NAV_ITEMS } from "./nav.constants";
import { DeveloperToolsSection } from "./DeveloperToolsSection";

const DRAWER_WIDTH = 260;

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const NavDrawer = ({ open, onClose }: NavDrawerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();

  const isActive = (path: string) => location.pathname.startsWith(path);
  const ThemeToggleIcon = mode === "dark" ? LightModeIcon : DarkModeIcon;

  const handleNavClick = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
      slotProps={{ paper: { sx: { width: DRAWER_WIDTH } } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <UserProfile sx={{ bgcolor: "background.default", px: 2, py: 3 }} />

        <Divider />

        <List sx={{ flex: 1, pt: 1 }}>
          {NAV_ITEMS.map(({ label, path, icon }) => (
            <ListItemButton
              key={path}
              selected={isActive(path)}
              onClick={() => handleNavClick(path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
                "&.Mui-selected": {
                  bgcolor: `${theme.palette.primary.main}22`,
                  color: "primary.main",
                  "& .MuiListItemIcon-root": { color: "primary.main" },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{ primary: { variant: "body2", fontWeight: 600 } }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Developer Tools */}
        <Box
          sx={{
            borderTop: "1px solid",
            borderTopColor: "divider",
          }}
        >
          <DeveloperToolsSection />
        </Box>

        {/* Theme toggle + version */}
        <Box
          sx={{
            px: 2,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid",
            borderTopColor: "divider",
          }}
        >
          <Typography variant="caption" color="text.disabled">
            Apex v1.0.0
          </Typography>
          <IconButton
            size="small"
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            sx={{ color: "text.secondary" }}
          >
            <ThemeToggleIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};
