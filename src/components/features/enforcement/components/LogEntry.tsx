import { useTheme } from "@mui/material/styles";
import { Box, Divider, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { format, formatDistanceToNow, isToday, parseISO } from "date-fns";
import { ActionType, type OfficerLog } from "../../../../types/domain";
import { PlateDisplay } from "../../../ui";

interface LogEntryProps {
  log: OfficerLog;
  zoneName: string;
  isLast: boolean;
}

const ACTION_CONFIG: Record<
  ActionType,
  {
    icon: typeof CheckCircleIcon;
    colorKey: "primary" | "high" | "medium" | "secondary";
  }
> = {
  [ActionType.CheckIn]: { icon: CheckCircleIcon, colorKey: "primary" },
  [ActionType.Warning]: { icon: ReportProblemIcon, colorKey: "medium" },
  [ActionType.Citation]: { icon: AssignmentLateIcon, colorKey: "high" },
  [ActionType.Note]: { icon: NoteAltIcon, colorKey: "secondary" },
};

export const LogEntry = ({ log, zoneName, isLast }: LogEntryProps) => {
  const theme = useTheme();
  const config = ACTION_CONFIG[log.action] ?? ACTION_CONFIG[ActionType.Note];
  const Icon = config.icon;

  const iconColor =
    config.colorKey === "primary"
      ? theme.palette.primary.main
      : config.colorKey === "secondary"
      ? theme.palette.text.secondary
      : theme.palette.enforcement[config.colorKey as "high" | "medium"];

  const parsed = parseISO(log.timestamp);
  const timestamp = isToday(parsed)
    ? formatDistanceToNow(parsed, { addSuffix: true })
    : format(parsed, "MMM d, yyyy · HH:mm");

  return (
    <>
      <Box sx={{ display: "flex", gap: 1.5, py: 1.5 }}>
        {/* Icon column */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            pt: 0.25,
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 22, color: iconColor }} />
        </Box>

        {/* Content column */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Primary row: action + plate */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="subtitle2">{log.action}</Typography>
            {log.licensePlate && (
              <PlateDisplay
                plate={log.licensePlate}
                variant="caption"
                sx={{ letterSpacing: 0.5, color: iconColor }}
              />
            )}
          </Box>

          {/* Secondary row: zone + time + officer */}
          <Typography variant="caption" color="text.secondary" display="block">
            {zoneName} · {log.officerId} · {timestamp}
          </Typography>

          {/* Notes (if present) */}
          {log.notes && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ fontStyle: "italic", mt: 0.5 }}
            >
              "{log.notes}"
            </Typography>
          )}
        </Box>
      </Box>

      {!isLast && <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />}
    </>
  );
};
