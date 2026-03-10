import { useContext } from "react";
import {
  ParkingDataContext,
  type ParkingDataContextValue,
} from "../context/ParkingDataContext";

export const useParkingData = (): ParkingDataContextValue => {
  const ctx = useContext(ParkingDataContext);
  if (!ctx) {
    throw new Error("useParkingData must be used within a ParkingDataProvider");
  }
  return ctx;
};
