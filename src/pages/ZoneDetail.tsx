import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Chip, EmptyState, ErrorAlert, SectionLabel } from "../components/ui";
import RefreshIcon from "@mui/icons-material/Refresh";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material/styles";
import { ActionType } from "../types/domain";
import { useZoneDetail } from "../hooks/useZoneDetail";
import { useParkingData } from "../hooks/useParkingData";
import {
  VehicleCard,
  VehicleCardSkeleton,
} from "../components/features/enforcement/components";

export const ZoneDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { zone, vehicles, isLoading, error, refetch } = useZoneDetail(id ?? "");
  const { logs } = useParkingData();
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  const handleActionSuccess = (message: string) =>
    setSnackbar({ open: true, message });

  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const getActionLog = (vehicleId: string) =>
    logs.find(
      (log) =>
        log.vehicleId === vehicleId &&
        (log.action === ActionType.Warning ||
          log.action === ActionType.Citation)
    );

  const awaiting = vehicles
    .filter((v) => !getActionLog(v.id))
    .sort((a, b) => a.minutesRemaining - b.minutesRemaining);

  const processed = vehicles.filter((v) => !!getActionLog(v.id));

  const totalViolationsCount = vehicles.filter((v) => v.isOverstayed).length;
  const processedViolationsCount = vehicles.filter(
    (v) => v.isOverstayed && !!getActionLog(v.id)
  ).length;

  const overstayedCount = vehicles.filter((v) => v.isOverstayed).length;
  const nearingLimitCount = vehicles.filter(
    (v) => !v.isOverstayed && v.minutesRemaining <= 15
  ).length;

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="inherit" />}>
          <Typography
            variant="caption"
            sx={{ cursor: "pointer", color: "primary.main" }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Typography>
          <Typography variant="caption" color="text.primary">
            {isLoading ? "Loading…" : zone?.name ?? "Zone"}
          </Typography>
        </Breadcrumbs>

        <IconButton
          size="small"
          onClick={refetch}
          aria-label="Refresh zone data"
        >
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>

      <Grid container spacing={{ xs: 0, md: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 80 },
              pb: { xs: 2, md: 0 },
            }}
          >
            {zone && (
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ mb: 0.25 }}>
                  {zone.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {zone.location} · {zone.currentOccupancy} / {zone.maxCapacity}{" "}
                  spaces occupied
                </Typography>
                {totalViolationsCount > 0 && (
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    sx={{
                      color:
                        processedViolationsCount === totalViolationsCount
                          ? theme.palette.enforcement.valid
                          : theme.palette.enforcement.medium,
                    }}
                  >
                    {processedViolationsCount} / {totalViolationsCount}{" "}
                    Violations Processed
                  </Typography>
                )}
              </Box>
            )}

            {!isLoading && !error && vehicles.length > 0 && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {overstayedCount > 0 && (
                  <Chip
                    label={`${overstayedCount} Overstayed`}
                    statusColor={theme.palette.enforcement.high}
                  />
                )}
                {nearingLimitCount > 0 && (
                  <Chip
                    label={`${nearingLimitCount} Nearing Limit`}
                    statusColor={theme.palette.enforcement.medium}
                  />
                )}
                {overstayedCount === 0 && nearingLimitCount === 0 && (
                  <Chip
                    label="All Clear"
                    statusColor={theme.palette.enforcement.valid}
                  />
                )}
              </Box>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {error && <ErrorAlert message={error} onRetry={refetch} />}

          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))
          ) : !error && vehicles.length === 0 ? (
            <EmptyState message="No vehicles currently tracked in this zone." />
          ) : (
            <>
              {awaiting.length > 0 && (
                <>
                  <SectionLabel>Awaiting Action</SectionLabel>
                  {awaiting.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      zoneName={zone?.name ?? ""}
                      onActionSuccess={handleActionSuccess}
                    />
                  ))}
                </>
              )}

              {processed.length > 0 && (
                <>
                  <Divider
                    sx={{ my: 2, borderColor: "rgba(255,255,255,0.08)" }}
                  />
                  <SectionLabel>Processed</SectionLabel>
                  {processed.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      zoneName={zone?.name ?? ""}
                      onActionSuccess={handleActionSuccess}
                      actionLog={getActionLog(vehicle.id)}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={snackbar.message}
        sx={{ bottom: 16 }}
      />
    </Box>
  );
};
