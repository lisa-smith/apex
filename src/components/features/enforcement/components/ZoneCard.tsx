import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box, CardActionArea, CardContent, Typography } from "@mui/material";
import { Card, Chip, LinearProgress } from "../../../ui";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import type { Zone } from "../../../../types/domain";
import { getZoneUrgency } from "../../../../utils/zone.utils";
import { getUrgencyColor } from "../../../../utils/enforcement.utils";
import { formatShortTime } from "../../../../utils/date.utils";

export const ZoneCard = ({ zone }: { zone: Zone }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const urgency = getZoneUrgency(zone);
  const urgencyColor = getUrgencyColor(urgency, theme.palette);
  const occupancyPct = Math.round(
    (zone.currentOccupancy / zone.maxCapacity) * 100
  );
  const lastChecked = formatShortTime(new Date(zone.lastChecked));

  return (
    <Card accentColor={urgencyColor} sx={{ transition: "border-color 0.2s" }}>
      <CardActionArea
        onClick={() => navigate(`/zone/${zone.id}`)}
        sx={{ p: 0 }}
      >
        <CardContent>
          {/* Header row */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 0.5,
            }}
          >
            <Typography variant="subtitle1" sx={{ lineHeight: 1.3, pr: 1 }}>
              {zone.name}
            </Typography>
            {zone.violationCount > 0 && (
              <Chip
                icon={<WarningAmberIcon sx={{ fontSize: "14px !important" }} />}
                label={`${zone.violationCount} violation${
                  zone.violationCount > 1 ? "s" : ""
                }`}
                statusColor={urgencyColor}
                sx={{ flexShrink: 0 }}
              />
            )}
          </Box>

          {/* Location */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 2 }}
          >
            {zone.location}
          </Typography>

          {/* Occupancy bar */}
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="caption" color="text.secondary">
                Occupancy
              </Typography>
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{ color: urgencyColor }}
              >
                {zone.currentOccupancy} / {zone.maxCapacity} ({occupancyPct}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={occupancyPct}
              statusColor={urgencyColor}
            />
          </Box>

          {/* Last checked */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1.5 }}
          >
            Last checked: {lastChecked}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
