import {
  VehicleType,
  ViolationType,
  AlertSeverity,
  ActionType,
  type Zone,
  type Vehicle,
  type Alert,
  type OfficerLog,
} from "../types/domain";

/**
 * ZONES (The "Truth" derived from Vehicle counts below)
 * High Urgency: z1 (100% full, 3 violations)
 * Medium Urgency: z3 (75% full, 1 violation)
 * Valid/Green: z5 (25% full, 0 violations)
 */
export const MOCK_ZONES: Zone[] = [
  {
    id: "z1",
    name: "Sector 7 - Broadway",
    location: "400 Block, Broadway",
    currentOccupancy: 5,
    maxCapacity: 5,
    violationCount: 3,
    lastChecked: "2026-03-09T10:20:00Z",
  },
  {
    id: "z3",
    name: "Financial District",
    location: "Bank St & 5th",
    currentOccupancy: 3,
    maxCapacity: 4,
    violationCount: 1,
    lastChecked: "2026-03-09T10:45:00Z",
  },
  {
    id: "z5",
    name: "Residential Zone 4",
    location: "Maple Ave & Oak",
    currentOccupancy: 1,
    maxCapacity: 4,
    violationCount: 0,
    lastChecked: "2026-03-09T09:15:00Z",
  },
];

/**
 * VEHICLES (Mapped specifically to the zones above)
 */
export const MOCK_VEHICLES: Vehicle[] = [
  // --- ZONE 1: Broadway (5/5 Occupied, 3 Violations) ---
  {
    id: "v101",
    licensePlate: "ABC-1234",
    state: "CA",
    zoneId: "z1",
    type: VehicleType.Passenger,
    arrivalTime: "2026-03-09T09:15:00Z",
    timeLimitMinutes: 60,
    isOverstayed: true,
    minutesRemaining: -54,
  },
  {
    id: "v102",
    licensePlate: "COMM-882",
    state: "NV",
    zoneId: "z1",
    type: VehicleType.Commercial,
    arrivalTime: "2026-03-09T09:30:00Z",
    timeLimitMinutes: 30,
    isOverstayed: true,
    minutesRemaining: -69,
  },
  {
    id: "v109",
    licensePlate: "BAD-PARK1",
    state: "CA",
    zoneId: "z1",
    type: VehicleType.Passenger,
    arrivalTime: "2026-03-09T08:00:00Z",
    timeLimitMinutes: 60,
    isOverstayed: true,
    minutesRemaining: -129,
  },
  {
    id: "v104",
    licensePlate: "PRK-9921",
    state: "CA",
    zoneId: "z1",
    type: VehicleType.Passenger,
    arrivalTime: "2026-03-09T10:45:00Z",
    timeLimitMinutes: 60,
    isOverstayed: false,
    minutesRemaining: 36,
  },
  {
    id: "v110",
    licensePlate: "WAIT-001",
    state: "CA",
    zoneId: "z1",
    type: VehicleType.Passenger,
    arrivalTime: "2026-03-09T11:00:00Z",
    timeLimitMinutes: 60,
    isOverstayed: false,
    minutesRemaining: 51,
  },

  // --- ZONE 3: Financial District (3/4 Occupied, 1 Violation) ---
  {
    id: "v106",
    licensePlate: "LUX-888",
    state: "NY",
    zoneId: "z3",
    type: VehicleType.Passenger,
    arrivalTime: "2026-03-09T10:35:00Z",
    timeLimitMinutes: 20,
    isOverstayed: true,
    minutesRemaining: -14,
  },
  {
    id: "v107",
    licensePlate: "DS-9920",
    state: "CA",
    zoneId: "z3",
    type: VehicleType.Commercial,
    arrivalTime: "2026-03-09T10:50:00Z",
    timeLimitMinutes: 15,
    isOverstayed: false,
    minutesRemaining: 2,
  },
  {
    id: "v111",
    licensePlate: "BZZ-2020",
    state: "CA",
    zoneId: "z3",
    type: VehicleType.Electric,
    arrivalTime: "2026-03-09T11:05:00Z",
    timeLimitMinutes: 120,
    isOverstayed: false,
    minutesRemaining: 116,
  },

  // --- ZONE 5: Residential (1/4 Occupied, 0 Violations) ---
  {
    id: "v108",
    licensePlate: "SUB-4402",
    state: "CA",
    zoneId: "z5",
    type: VehicleType.Passenger,
    arrivalTime: "2026-03-09T08:00:00Z",
    timeLimitMinutes: 240,
    isOverstayed: false,
    minutesRemaining: 51,
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "a1",
    zoneId: "z1",
    vehicleId: "v102",
    type: ViolationType.Overstay,
    severity: AlertSeverity.High,
    description:
      "Commercial vehicle v102 exceeded 30-minute limit in Sector 7.",
    timestamp: "2026-03-09T10:30:00Z",
  },
  {
    id: "a2",
    zoneId: "z3",
    vehicleId: "v106",
    type: ViolationType.Overstay,
    severity: AlertSeverity.Medium,
    description: "Vehicle LUX-888 expired in Financial District.",
    timestamp: "2026-03-09T10:55:00Z",
  },
];

export const MOCK_LOGS: OfficerLog[] = [
  // --- TODAY'S LOGS (March 9, 2026) ---
  {
    id: "l1",
    action: ActionType.CheckIn,
    zoneId: "z1",
    timestamp: "2026-03-09T10:00:00Z",
    notes: "Commencing morning patrol of Sector 7.",
    officerId: "OF-442",
  },
  {
    id: "l2",
    action: ActionType.Warning,
    zoneId: "z1",
    vehicleId: "v101",
    timestamp: "2026-03-09T14:45:00Z",
    notes: "Grace period offered for ABC-1234.",
    officerId: "OF-442",
    licensePlate: "ABC-1234",
  },

  // --- YESTERDAY'S LOGS (March 8, 2026) ---
  {
    id: "l3",
    action: ActionType.Citation,
    zoneId: "z2",
    vehicleId: "v202",
    timestamp: "2026-03-08T16:20:00Z",
    notes: "Expired permit. Citation issued at Broadway North.",
    officerId: "OF-442",
    licensePlate: "XYZ-9876",
  },
  {
    id: "l4",
    action: ActionType.CheckIn,
    zoneId: "z2",
    timestamp: "2026-03-08T14:00:00Z",
    notes: "Zone clear upon arrival.",
    officerId: "OF-442",
  },
  {
    id: "l5",
    action: ActionType.Warning,
    zoneId: "z1",
    vehicleId: "v105",
    timestamp: "2026-03-08T11:15:00Z",
    notes: "Driver was present; issued verbal warning for loading zone.",
    officerId: "OF-442",
    licensePlate: "GHI-5566",
  },
  {
    id: "l6",
    action: ActionType.Citation,
    zoneId: "z3",
    vehicleId: "v303",
    timestamp: "2026-03-08T09:45:00Z",
    notes: "Fire hydrant obstruction.",
    officerId: "OF-442",
    licensePlate: "PLATE-1",
  },
  {
    id: "l7",
    action: ActionType.CheckIn,
    zoneId: "z3",
    timestamp: "2026-03-08T08:30:00Z",
    notes: "Shift start. Patrolling downtown core.",
    officerId: "OF-442",
  },
];
