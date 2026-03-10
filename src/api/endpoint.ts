import { mockFetch } from "./client";
import { MOCK_ZONES, MOCK_VEHICLES, MOCK_LOGS } from "../data/mockData";
import { type Zone, type Vehicle, type OfficerLog } from "../types/domain";

/**
 * In-memory log store.
 * Supports state persistence across the current session, allowing
 * newly created logs to persist through refetches.
 */
let logsStore: OfficerLog[] = [...MOCK_LOGS];

/**
 * Fetches all available parking zones.
 * * @returns {Promise<Zone[]>} A promise that resolves to an array of all parking zones.
 */
export const getZones = (): Promise<Zone[]> => mockFetch([...MOCK_ZONES]);

/**
 * Retrieves a specific parking zone by its unique identifier.
 * * @param {string} id - The unique ID of the zone to retrieve.
 * @returns {Promise<Zone>} A promise that resolves to the requested Zone object.
 * @throws {Error} Throws "Zone not found" if no matching ID exists.
 */
export const getZoneById = (id: string): Promise<Zone> => {
  const zone = MOCK_ZONES.find((z) => z.id === id);
  if (!zone) throw new Error("Zone not found");
  return mockFetch({ ...zone });
};

/**
 * Fetches all vehicles currently associated with a specific zone.
 * * @param {string} zoneId - The ID of the zone to filter vehicles by.
 * @returns {Promise<Vehicle[]>} A promise that resolves to an array of vehicles in that zone.
 */
export const getVehiclesByZone = (zoneId: string): Promise<Vehicle[]> =>
  mockFetch(MOCK_VEHICLES.filter((v) => v.zoneId === zoneId));

/**
 * Retrieves the full history of officer activity logs.
 * * @returns {Promise<OfficerLog[]>} A promise that resolves to the current list of activity logs.
 */
export const getLogs = (): Promise<OfficerLog[]> => mockFetch([...logsStore]);

/**
 * Persists a new enforcement action (Check-in, Citation, etc.) to the log store.
 * * @param {Omit<OfficerLog, "id">} log - The log entry data, excluding the server-generated ID.
 * @returns {Promise<OfficerLog>} A promise that resolves to the newly created log entry, including its generated ID.
 */
export const postAction = (
  log: Omit<OfficerLog, "id">
): Promise<OfficerLog> => {
  const newLog: OfficerLog = { ...log, id: `l${Date.now()}` };
  return mockFetch(newLog).then((created) => {
    logsStore = [created, ...logsStore];
    return created;
  });
};
