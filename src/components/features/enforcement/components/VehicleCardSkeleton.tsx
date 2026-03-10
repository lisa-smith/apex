import { Box, Card, CardContent, Skeleton } from "@mui/material";

export const VehicleCardSkeleton = () => (
  <Card sx={{ border: "1px solid rgba(255,255,255,0.08)", mb: 1.5 }}>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Skeleton variant="text" width="35%" height={28} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
      <Skeleton variant="text" width="50%" height={16} sx={{ mb: 1.5 }} />
      <Skeleton
        variant="rectangular"
        height={8}
        sx={{ borderRadius: 4, mb: 1 }}
      />
      <Skeleton variant="text" width="60%" height={14} />
    </CardContent>
  </Card>
);
