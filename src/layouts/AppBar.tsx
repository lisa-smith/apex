import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { UserProfile } from "../components/ui";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../context/ColorModeContext";
import { NAV_ITEMS } from "./nav.constants";
import { DeveloperToolsSection } from "./DeveloperToolsSection";

interface HeaderProps {
  onOpenDrawer: () => void;
}

export const AppBar = ({ onOpenDrawer }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const isActive = (path: string) => location.pathname.startsWith(path);
  const ThemeToggleIcon = mode === "dark" ? LightModeIcon : DarkModeIcon;

  return (
    <MuiAppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderBottomColor: "divider",
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        {/* Mobile */}
        <IconButton
          edge="start"
          aria-label="Open navigation menu"
          onClick={onOpenDrawer}
          sx={{
            display: { xs: "flex", md: "none" },
            mr: 0.5,
            color: "text.primary",
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: "primary.main", letterSpacing: 2, fontWeight: 800 }}
          >
            APEX
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Enforcement
          </Typography>
        </Box>

        {/* Desktop only */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, ml: 3 }}>
          {NAV_ITEMS.map(({ label, path, icon }) => (
            <Button
              key={path}
              onClick={() => navigate(path)}
              startIcon={icon}
              sx={{
                color: isActive(path) ? "primary.main" : "text.secondary",
                bgcolor: isActive(path)
                  ? `${theme.palette.primary.main}18`
                  : "transparent",
                "&:hover": { bgcolor: "action.hover" },
                minHeight: 40,
                px: 2,
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Desktop  */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            sx={{
              width: 34,
              height: 34,
              bgcolor: theme.palette.primary.main,
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            LP
          </Avatar>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
            slotProps={{ paper: { sx: { minWidth: 220, mt: 1 } } }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <UserProfile showAvatar={true} sx={{ px: 2, py: 1.5 }} />

            <Divider />

            <MenuItem onClick={toggleColorMode} sx={{ gap: 1.5 }}>
              <ThemeToggleIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
              <Typography variant="body2">
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </Typography>
            </MenuItem>

            <Divider />

            <DeveloperToolsSection />
          </Menu>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
