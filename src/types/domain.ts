/**
 * Core Domain Models for Apex Parking Enforcement
 */

export enum VehicleType {
  Passenger = "Passenger",
  Commercial = "Commercial",
  Motorcycle = "Motorcycle",
  Emergency = "Emergency",
  Electric = "EV",
}

export enum ViolationType {
  ExpiredMeter = "Expired Meter",
  NoParkingZone = "No Parking Zone",
  FireHydrant = "Fire Hydrant",
  PermitRequired = "Permit Required",
  Overstay = "Overstay",
}

export enum AlertSeverity {
  Low = "Low", // e.g., 5 mins remaining
  Medium = "Medium", // e.g., Just expired
  High = "High", // e.g., Fire hydrant or 30+ min overstay
}

export enum ActionType {
  CheckIn = "Zone Check-in",
  Warning = "Warning Issued",
  Citation = "Citation Issued",
  Note = "General Note",
}

export interface Zone {
  id: string;
  name: string;
  location: string;
  currentOccupancy: number;
  maxCapacity: number;
  violationCount: number;
  lastChecked: string; // ISO 8601 string
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  state: string; // Registration state, e.g. "CA", "NY"
  zoneId: string;
  type: VehicleType;
  arrivalTime: string;
  timeLimitMinutes: number;
  isOverstayed: boolean;
  minutesRemaining: number;
}

export interface Alert {
  id: string;
  zoneId: string;
  vehicleId: string;
  type: ViolationType;
  severity: AlertSeverity;
  description: string;
  timestamp: string;
}

export interface OfficerLog {
  id: string;
  action: ActionType;
  zoneId: string;
  vehicleId?: string;
  licensePlate?: string; // Denormalized for display — avoids a separate vehicle lookup
  timestamp: string;
  notes?: string;
  officerId: string;
}

export type Urgency = "high" | "medium" | "valid";
