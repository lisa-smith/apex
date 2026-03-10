import { useState, useEffect, useCallback } from "react";
import { getZoneById, getVehiclesByZone } from "../api/endpoint";
import type { Zone, Vehicle } from "../types/domain";

interface UseZoneDetailResult {
  zone: Zone | null;
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useZoneDetail = (zoneId: string): UseZoneDetailResult => {
  const [zone, setZone] = useState<Zone | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedZone, fetchedVehicles] = await Promise.all([
        getZoneById(zoneId),
        getVehiclesByZone(zoneId),
      ]);
      setZone(fetchedZone);
      setVehicles(fetchedVehicles);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load zone data."
      );
    } finally {
      setIsLoading(false);
    }
  }, [zoneId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { zone, vehicles, isLoading, error, refetch: fetchData };
};
