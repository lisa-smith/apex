import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Button, ErrorAlert } from "../../../ui";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ActionType, type Vehicle } from "../../../../types/domain";
import { useParkingData } from "../../../../hooks/useParkingData";
import { getActionColor } from "../../../../utils/enforcement.utils";

interface VehicleActionFormProps {
  vehicle: Vehicle;
  onSuccess: (message: string) => void;
  /** Called after a successful submission to trigger the parent drawer to close */
  onRequestClose: () => void;
}

const ACTION_OPTIONS: { label: string; value: ActionType }[] = [
  { label: "Check-in", value: ActionType.CheckIn },
  { label: "Warning", value: ActionType.Warning },
  { label: "Citation", value: ActionType.Citation },
];

export const VehicleActionForm = ({
  vehicle,
  onSuccess,
  onRequestClose,
}: VehicleActionFormProps) => {
  const theme = useTheme();
  const { executeAction, isSubmitting, actionError } = useParkingData();
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null);
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);


  const handleSubmit = async () => {
    if (!selectedAction) return;
    try {
      await executeAction({
        action: selectedAction,
        zoneId: vehicle.zoneId,
        vehicleId: vehicle.id,
        licensePlate: vehicle.licensePlate,
        notes: notes.trim() || undefined,
      });
      setIsSuccess(true);
      onSuccess(`${selectedAction} logged for ${vehicle.licensePlate}`);
      setTimeout(() => {
        onRequestClose();
        // Reset form state after the drawer finishes its close animation
        setTimeout(() => {
          setSelectedAction(null);
          setNotes("");
          setIsSuccess(false);
        }, 300);
      }, 500);
    } catch {
      // actionError is surfaced from context
    }
  };

  if (isSuccess) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
          gap: 1.5,
        }}
      >
        <CheckCircleIcon
          sx={{ fontSize: 60, color: theme.palette.enforcement.valid }}
        />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{ color: theme.palette.enforcement.valid }}
        >
          Action Logged
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {actionError && <ErrorAlert message={actionError} />}

      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 1 }}
      >
        Select Action
      </Typography>
      <ToggleButtonGroup
        value={selectedAction}
        exclusive
        onChange={(_, val: ActionType | null) => val && setSelectedAction(val)}
        disabled={isSubmitting}
        fullWidth
        sx={{ mb: 3 }}
      >
        {ACTION_OPTIONS.map(({ label, value }) => (
          <ToggleButton
            key={value}
            value={value}
            sx={{
              flex: 1,
              py: 1.5,
              fontWeight: 600,
              fontSize: "0.8rem",
              borderColor: "rgba(255,255,255,0.12)",
              "&.Mui-selected": {
                bgcolor: `${getActionColor(value, theme.palette)}22`,
                color: getActionColor(value, theme.palette),
                borderColor: getActionColor(value, theme.palette),
                "&:hover": { bgcolor: `${getActionColor(value, theme.palette)}33` },
              },
            }}
          >
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TextField
        label="Officer Notes (optional)"
        multiline
        rows={3}
        fullWidth
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        disabled={isSubmitting}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        fullWidth
        size="large"
        disabled={!selectedAction}
        loading={isSubmitting}
        loadingText="Syncing..."
        onClick={handleSubmit}
      >
        Submit Action
      </Button>
    </>
  );
};
