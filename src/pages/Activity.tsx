import { useMemo, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { isSameDay, parseISO } from "date-fns";
import { useParkingData } from "../hooks/useParkingData";
import { LogEntry, LogEntrySkeleton } from "../components/features/enforcement/components";
import { DatePicker, EmptyState } from "../components/ui";

export const Activity = () => {
  const { logs, zones, isLoading, isDemoEmptyMode, toggleDemoEmptyMode } =
    useParkingData();
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  const displayLogs = isDemoEmptyMode ? [] : logs;

  const sortedLogs = [...displayLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const filteredLogs = useMemo(
    () =>
      filterDate
        ? sortedLogs.filter((log) =>
            isSameDay(parseISO(log.timestamp), filterDate)
          )
        : sortedLogs,
    [sortedLogs, filterDate]
  );

  const getZoneName = (zoneId: string): string =>
    zones.find((z) => z.id === zoneId)?.name ?? zoneId;

  const subtitle = filterDate
    ? filteredLogs.length > 0
      ? `${filteredLogs.length} action${
          filteredLogs.length > 1 ? "s" : ""
        } on selected date`
      : "No actions on selected date"
    : sortedLogs.length > 0
    ? `${sortedLogs.length} action${sortedLogs.length > 1 ? "s" : ""}`
    : "";

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: 1,
          mb: 2.5,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 0.25 }}>
            Activity History
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {subtitle}
          </Typography>
        </Box>
        <DatePicker value={filterDate} onChange={setFilterDate} />
      </Box>

      {isLoading ? (
        <Paper variant="outlined" sx={{ borderColor: "divider", px: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <LogEntrySkeleton key={i} isLast={i === 4} />
          ))}
        </Paper>
      ) : filteredLogs.length === 0 ? (
        <EmptyState
          icon={<SearchOffIcon sx={{ fontSize: 56, color: "text.disabled" }} />}
          title="No Activity Recorded"
          message={
            filterDate
              ? "No activity was logged for the selected date."
              : "No activity has been logged."
          }
          actionLabel={!filterDate ? "Refresh Data" : undefined}
          onAction={!filterDate && isDemoEmptyMode ? toggleDemoEmptyMode : undefined}
        />
      ) : (
        <Paper variant="outlined" sx={{ borderColor: "divider", px: 2 }}>
          {filteredLogs.map((log, index) => (
            <LogEntry
              key={log.id}
              log={log}
              zoneName={getZoneName(log.zoneId)}
              isLast={index === filteredLogs.length - 1}
            />
          ))}
        </Paper>
      )}
    </Box>
  );
};
