import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

export interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
}

export const DatePicker = ({
  value,
  onChange,
  label = "Filter by date",
}: DatePickerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MuiDatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          size: isMobile ? "small" : "medium",
          sx: {
            minWidth: { xs: 160, md: 220 },
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
          },
        },
        field: { clearable: true },
      }}
    />
  );
};

DatePicker.displayName = "DatePicker";
