import { Box, Divider, Skeleton } from "@mui/material";

interface LogEntrySkeletonProps {
  isLast?: boolean;
}

export const LogEntrySkeleton = ({ isLast = false }: LogEntrySkeletonProps) => (
  <>
    <Box sx={{ display: "flex", gap: 1.5, py: 1.5 }}>
      {/* Icon column */}
      <Skeleton variant="circular" width={22} height={22} sx={{ mt: 0.25, flexShrink: 0 }} />

      {/* Content column */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Primary row: action label + plate */}
        <Box sx={{ display: "flex", gap: 1, mb: 0.5 }}>
          <Skeleton variant="text" width="38%" height={20} />
          <Skeleton variant="text" width="22%" height={20} />
        </Box>
        {/* Secondary row: zone · officer · timestamp */}
        <Skeleton variant="text" width="60%" height={16} />
      </Box>
    </Box>

    {!isLast && <Divider />}
  </>
);
