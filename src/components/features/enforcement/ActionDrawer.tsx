import { type Vehicle } from "../../../types/domain";
import { useParkingData } from "../../../hooks/useParkingData";
import { BaseDrawer } from "../../ui/BaseDrawer";
import { VehicleActionForm } from "./components/VehicleActionForm";

interface ActionDrawerProps {
  open: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  zoneName: string;
  onSuccess: (message: string) => void;
}

export const ActionDrawer = ({
  open,
  onClose,
  vehicle,
  zoneName,
  onSuccess,
}: ActionDrawerProps) => {
  const { isSubmitting } = useParkingData();

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <BaseDrawer
      open={open}
      onClose={handleClose}
      title={vehicle.licensePlate}
      subtitle={`${zoneName} · ${vehicle.state}`}
      disabled={isSubmitting}
    >
      <VehicleActionForm
        vehicle={vehicle}
        onSuccess={onSuccess}
        onRequestClose={handleClose}
      />
    </BaseDrawer>
  );
};
