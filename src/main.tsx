import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { ColorModeProvider } from "./context/ColorModeContext";
import { ParkingDataProvider } from "./context/ParkingDataContext";
import App from "./App.tsx";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <CssBaseline />
      <ParkingDataProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App />
        </LocalizationProvider>
      </ParkingDataProvider>
    </ColorModeProvider>
  </StrictMode>
);
