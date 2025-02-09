"use client";

import React from "react";
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  disabledDates: Date[];
  disabled?: boolean;
  onSubmit: () => void;
}
const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  disabledDates,
  disabled,
  onSubmit,
}) => {
  console.log("tP", totalPrice);
  return (
    <div className="border-[1px] border-neutral-200 rounded-xl bg-white overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="font-semibold text-2xl  ">${price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        disabledDates={disabledDates}
        value={dateRange}
        onChange={(value: RangeKeyDict) => {
          onChangeDate(value.selection);
        }}
      />
      <hr />
      <div className="flex items-center justify-between p-4">
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
      <div>
        <Button label="Reserve" onClick={onSubmit} disabled={disabled} />
      </div>
    </div>
  );
};

export default ListingReservation;
