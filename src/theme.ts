import { createTheme, type PaletteMode } from "@mui/material/styles";

// Augment MUI's Palette to include our enforcement color tokens
declare module "@mui/material/styles" {
  interface Palette {
    enforcement: {
      high: string;
      medium: string;
      valid: string;
    };
  }
  interface PaletteOptions {
    enforcement?: {
      high?: string;
      medium?: string;
      valid?: string;
    };
  }
}

/**
 * Returns the mode-specific palette tokens.
 * Dark: bright enforcement colors on navy/slate.
 * Light: slightly darkened enforcement colors for legibility on white.
 */
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: "#3B82F6",
    },
    background:
      mode === "dark"
        ? { default: "#0F172A", paper: "#1E293B" }
        : { default: "#F5F7FA", paper: "#FFFFFF" },
    text:
      mode === "dark"
        ? { primary: "#F1F5F9", secondary: "#94A3B8" }
        : { primary: "#0F172A", secondary: "#475569" },
    enforcement:
      mode === "dark"
        ? { high: "#EF4444", medium: "#F59E0B", valid: "#22C55E" }
        : { high: "#DC2626", medium: "#D97706", valid: "#16A34A" },
  },
});

/** Builds a full MUI theme for the given mode. */
export const createApexTheme = (mode: PaletteMode) =>
  createTheme({
    ...getDesignTokens(mode),
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "html, body": { overflowX: "hidden" },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 48,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 10,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { minHeight: 48 },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          sizeSmall: { padding: 10 },
        },
      },
    },
  });
