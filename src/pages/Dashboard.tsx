import { Box, Grid, Typography } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { useParkingData } from "../hooks/useParkingData";
import {
  ZoneCard,
  ZoneCardSkeleton,
} from "../components/features/enforcement/components";
import { EmptyState, ErrorAlert } from "../components/ui";

import type { Urgency } from "../types/domain";
import { getZoneUrgency } from "../utils/zone.utils";
import { formatShortDate } from "../utils/date.utils";

const urgencyOrder: Record<Urgency, number> = { high: 0, medium: 1, valid: 2 };

export const Dashboard = () => {
  const { zones, isLoading, error, refetch, isDemoEmptyMode, toggleDemoEmptyMode } = useParkingData();

  const displayZones = isDemoEmptyMode ? [] : zones;
  const sortedZones = [...displayZones].sort(
    (a, b) => urgencyOrder[getZoneUrgency(a)] - urgencyOrder[getZoneUrgency(b)]
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 0.25 }}>
        Zones
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 2.5 }}
      >
        Zones ranked by urgency · {formatShortDate(new Date())}
      </Typography>

      {error && <ErrorAlert message={error} onRetry={refetch} />}

      <Grid container spacing={2}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
              <ZoneCardSkeleton />
            </Grid>
          ))
        ) : !error && sortedZones.length === 0 ? (
          <Grid size={12}>
            <EmptyState
              icon={<InboxIcon sx={{ fontSize: 56, color: "text.disabled" }} />}
              title="No Active Zones Found"
              message="There are no zones to display at this time."
              actionLabel="Refresh Data"
              onAction={isDemoEmptyMode ? toggleDemoEmptyMode : refetch}
            />
          </Grid>
        ) : (
          sortedZones.map((zone) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={zone.id}>
              <ZoneCard zone={zone} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};
