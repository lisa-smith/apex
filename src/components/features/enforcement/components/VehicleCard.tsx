import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, CardContent, IconButton, Typography } from "@mui/material";
import { Card, Chip, LinearProgress, PlateDisplay } from "../../../ui";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ActionType,
  type OfficerLog,
  type Vehicle,
} from "../../../../types/domain";
import { useParkingData } from "../../../../hooks/useParkingData";
import { formatMins } from "../../../../utils/date.utils";
import { getVehicleUrgency, getUrgencyColor } from "../../../../utils/enforcement.utils";
import { ActionDrawer } from "../ActionDrawer";

interface VehicleCardProps {
  vehicle: Vehicle;
  zoneName: string;
  onActionSuccess: (message: string) => void;
  /** Most recent Warning or Citation log for this vehicle, if one exists this session */
  actionLog?: OfficerLog;
}

export const VehicleCard = ({
  vehicle,
  zoneName,
  onActionSuccess,
  actionLog,
}: VehicleCardProps) => {
  const theme = useTheme();
  const { isSubmitting } = useParkingData();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActioned = !!actionLog;
  const isCited = actionLog?.action === ActionType.Citation;
  const isWarned = actionLog?.action === ActionType.Warning;

  const minutesParked = vehicle.timeLimitMinutes - vehicle.minutesRemaining;

  const percentUsed = vehicle.isOverstayed
    ? 100
    : Math.min(
        100,
        Math.max(0, (minutesParked / vehicle.timeLimitMinutes) * 100)
      );

  const timeColor = getUrgencyColor(getVehicleUrgency(vehicle), theme.palette);

  const statusText = vehicle.isOverstayed
    ? `Overstayed by ${formatMins(Math.abs(vehicle.minutesRemaining))} (${
        vehicle.timeLimitMinutes
      }m limit)`
    : `${formatMins(vehicle.minutesRemaining)} remaining of ${
        vehicle.timeLimitMinutes
      }m limit`;

  return (
    <>
      <Card
        accentColor={timeColor}
        sx={{
          mb: 1.5,
          opacity: isActioned ? 0.7 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <CardContent sx={{ pb: "12px !important" }}>
          {/* Header row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <PlateDisplay plate={vehicle.licensePlate} dimmed={isActioned} />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                {vehicle.state}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Enforcement status badge */}
              {isCited && (
                <Chip
                  label="CITED"
                  statusColor={theme.palette.enforcement.high}
                  sx={{ fontSize: "0.65rem", letterSpacing: 0.5 }}
                />
              )}
              {isWarned && (
                <Chip
                  label="WARNED"
                  statusColor={theme.palette.enforcement.medium}
                  sx={{ fontSize: "0.65rem", letterSpacing: 0.5 }}
                />
              )}
              {!isActioned && (
                <Chip
                  label={vehicle.type}
                  sx={{ bgcolor: "rgba(255,255,255,0.06)", fontSize: "0.7rem" }}
                />
              )}
              <IconButton
                size="small"
                onClick={() => setDrawerOpen(true)}
                // Disable if a citation has already been issued — warnings can still be upgraded
                disabled={isSubmitting || isCited}
                aria-label="Open quick actions"
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Status text */}
          <Typography
            variant="caption"
            sx={{ color: timeColor, display: "block", mt: 0.5, mb: 1.5 }}
          >
            {statusText}
          </Typography>

          {/* Time-limit visualizer */}
          <LinearProgress
            variant="determinate"
            value={percentUsed}
            statusColor={timeColor}
          />
        </CardContent>
      </Card>

      <ActionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        vehicle={vehicle}
        zoneName={zoneName}
        onSuccess={onActionSuccess}
      />
    </>
  );
};
