import React, { useState } from "react";
import { DateRangePicker } from "rsuite";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";
import "rsuite/dist/rsuite.min.css";
import "./DatePicker.css"; 

interface RangeType<T> {
  label: string;
  value: [T, T] | ((value: T[]) => [T, T]);
  placement?: string;
  closeOverlay?: boolean;
  appearance?: string;
}

const predefinedRanges: RangeType<Date>[] = [
  { label: "Today", value: [new Date(), new Date()], placement: "left" },
  {
    label: "Yesterday",
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: "left",
  },
  {
    label: "This week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: "left",
  },
  {
    label: "Last week",
    value: [subDays(new Date(), 6), new Date()],
    placement: "left",
  },
  {
    label: "This month",
    value: [startOfMonth(new Date()), new Date()],
    placement: "left",
  },
  {
    label: "Last month",
    value: [
      startOfMonth(addMonths(new Date(), -1)),
      endOfMonth(addMonths(new Date(), -1)),
    ],
    placement: "left",
  },
  {
    label: "This year",
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: "left",
  },
  {
    label: "Last year",
    value: [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear(), 0, 0),
    ],
    placement: "left",
  },
  {
    label: "All time",
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: "left",
  },
];

const DateRangePickerComponent: React.FC = () => {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleChange = (value: [Date | null, Date | null]) => {
    setRange(value);
  };

  const renderValue = (date: [Date, Date]) => {
    if (!date[0] || !date[1]) return "Select Date Range";
    return `${format(date[0], 'MMM d')} - ${format(date[1], 'MMM d, yyyy')}`;
  };

  return (
    <DateRangePicker
      ranges={predefinedRanges}
      placeholder="Select Date Range"
      style={{ width: 200 }}
      onChange={handleChange}
      value={range}
      showHeader={false}
      renderValue={renderValue} // Custom render for the selected value
    />
  );
};

export default DateRangePickerComponent;
