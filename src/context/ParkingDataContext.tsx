import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ActionType, type OfficerLog, type Zone } from "../types/domain";
import { getLogs, getZones, postAction } from "../api/endpoint";

// Hardcoded for MVP — would come from an auth session in production
const CURRENT_OFFICER_ID = "OF-442";

export interface ActionPayload {
  action: ActionType;
  zoneId: string;
  vehicleId?: string;
  licensePlate?: string;
  notes?: string;
}

export interface ParkingDataContextValue {
  zones: Zone[];
  logs: OfficerLog[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  actionError: string | null;
  isDemoEmptyMode: boolean;
  executeAction: (payload: ActionPayload) => Promise<void>;
  refetch: () => void;
  toggleDemoEmptyMode: () => void;
}

export const ParkingDataContext = createContext<ParkingDataContextValue | null>(
  null
);

export const ParkingDataProvider = ({ children }: { children: ReactNode }) => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [logs, setLogs] = useState<OfficerLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isDemoEmptyMode, setIsDemoEmptyMode] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedZones, fetchedLogs] = await Promise.all([
        getZones(),
        getLogs(),
      ]);
      setZones(fetchedZones);
      setLogs(fetchedLogs);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load data. Please retry."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const executeAction = useCallback(async (payload: ActionPayload) => {
    setIsSubmitting(true);
    setActionError(null);
    try {
      const newLog = await postAction({
        ...payload,
        officerId: CURRENT_OFFICER_ID,
        timestamp: new Date().toISOString(),
      });
      // Optimistically prepend the new log so the Activity Feed updates immediately
      setLogs((prev) => [newLog, ...prev]);

      // Increment violationCount for the affected zone on Warning or Citation
      if (
        payload.action === ActionType.Warning ||
        payload.action === ActionType.Citation
      ) {
        setZones((prev) =>
          prev.map((z) =>
            z.id === payload.zoneId
              ? { ...z, violationCount: z.violationCount + 1 }
              : z
          )
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Action failed. Please retry.";
      setActionError(message);
      throw err; // Re-throw so the calling component can react (e.g. re-enable the button)
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <ParkingDataContext.Provider
      value={{
        zones,
        logs,
        isLoading,
        error,
        isSubmitting,
        actionError,
        isDemoEmptyMode,
        executeAction,
        refetch: fetchData,
        toggleDemoEmptyMode: () => setIsDemoEmptyMode((prev) => !prev),
      }}
    >
      {children}
    </ParkingDataContext.Provider>
  );
};
