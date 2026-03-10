import { Box, Card, CardContent, Skeleton } from "@mui/material";

export const ZoneCardSkeleton = () => {
  return (
    <Card sx={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Skeleton variant="text" width="55%" height={24} />
          <Skeleton variant="rounded" width={90} height={22} />
        </Box>
        <Skeleton variant="text" width="40%" height={16} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 4 }} />
        <Skeleton variant="text" width="30%" height={14} sx={{ mt: 1.5 }} />
      </CardContent>
    </Card>
  );
};
