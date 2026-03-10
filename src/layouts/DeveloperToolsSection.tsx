import {
  Box,
  FormControlLabel,
  MenuItem,
  Switch,
  Typography,
} from "@mui/material";
import { useParkingData } from "../hooks/useParkingData";

export const DeveloperToolsSection = () => {
  const { isDemoEmptyMode, toggleDemoEmptyMode } = useParkingData();

  const control = (
    <Switch
      size="small"
      checked={isDemoEmptyMode}
      onChange={toggleDemoEmptyMode}
      color="warning"
    />
  );

  // const label = asMenuItem ? (
  //   <Typography variant="body2">Simulate Empty State</Typography>
  // ) : (
  //   <Typography variant="caption" color="text.secondary">
  //     Simulate Empty State
  //   </Typography>
  // );

  const label = <Typography variant="body2">Simulate Empty State</Typography>;

  return (
    <>
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography
          variant="caption"
          color="text.disabled"
          fontWeight={700}
          letterSpacing={0.8}
          display="block"
          sx={{ mb: 1 }}
        >
          DEVELOPER TOOLS
        </Typography>
      </Box>

      <MenuItem disableRipple sx={{ py: 0.5 }}>
        <FormControlLabel
          control={control}
          label={label}
          sx={{ width: "100%", mr: 0 }}
        />
      </MenuItem>
    </>
  );
};
