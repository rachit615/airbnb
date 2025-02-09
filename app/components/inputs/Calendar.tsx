"use client";
import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}
const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      rangeColors={["#262626"]}
      disabledDates={disabledDates}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
    />
  );
};

export default Calendar;
