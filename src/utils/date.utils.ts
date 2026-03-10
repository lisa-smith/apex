import { formatDuration } from "date-fns";

// Formats a raw minute count into a human-readable string e.g. "1 hour 15 minutes"
export const formatMins = (totalMinutes: number): string => {
  const abs = Math.abs(totalMinutes);
  const hours = Math.floor(abs / 60);
  const minutes = abs % 60;
  return formatDuration({ hours, minutes }) || "< 1 minute";
};

// Formats a date as a short weekday + month + day string e.g. "Mon, Mar 9"
export const formatShortDate = (date: Date): string =>
  date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

// Formats a date as a short time string e.g. "10:20 AM"
export const formatShortTime = (date: Date): string =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
