import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import { AppBar } from "./AppBar";
import { NavDrawer } from "./NavDrawer";
import { useParkingData } from "../hooks/useParkingData";

const DemoModeBanner = () => (
  <Box
    sx={{
      bgcolor: "warning.main",
      color: "warning.contrastText",
      py: 0.5,
      px: 2,
      textAlign: "center",
    }}
  >
    <Typography variant="caption" fontWeight={700} letterSpacing={1}>
      DEMO MODE: EMPTY STATE ACTIVE
    </Typography>
  </Box>
);

export const AppLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDemoEmptyMode } = useParkingData();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <AppBar onOpenDrawer={() => setDrawerOpen(true)} />
      {isDemoEmptyMode && <DemoModeBanner />}
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Container
        component="main"
        maxWidth="lg"
        disableGutters
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};
