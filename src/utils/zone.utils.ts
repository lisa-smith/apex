import type { Urgency, Zone } from "../types/domain";

export const getZoneUrgency = (zone: Zone): Urgency => {
  const pct = zone.currentOccupancy / zone.maxCapacity;
  if (zone.violationCount >= 2 || pct >= 0.9) return "high";
  if (zone.violationCount >= 1 || pct >= 0.7) return "medium";
  return "valid";
};
