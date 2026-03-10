import type { Theme } from "@mui/material/styles";
import { ActionType, type Urgency, type Vehicle } from "../types/domain";

/**
 * Derives a vehicle's time urgency from its overstay/time-remaining state.
 */
export const getVehicleUrgency = (vehicle: Vehicle): Urgency => {
  if (vehicle.isOverstayed) return "high";
  if (vehicle.minutesRemaining <= 15) return "medium";
  return "valid";
};

/**
 * Maps an Urgency level to the corresponding enforcement palette color.
 */
export const getUrgencyColor = (
  urgency: Urgency,
  palette: Theme["palette"]
): string => palette.enforcement[urgency];

/**
 * Maps an ActionType to its corresponding enforcement palette color.
 * Falls back to primary.main for neutral actions (Check-in, Note).
 */
export const getActionColor = (
  action: ActionType,
  palette: Theme["palette"]
): string => {
  if (action === ActionType.Citation) return palette.enforcement.high;
  if (action === ActionType.Warning) return palette.enforcement.medium;
  return palette.primary.main;
};
