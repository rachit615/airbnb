"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { Listing, Reservation, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import useCountries from "@/app/hooks/useCountries";
import format from "date-fns/format";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  actionLabel,
  actionId = "", // assign empty value so that it's not get undefined
  disabled,
  currentUser,
}) => {
  const router = useRouter();
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (reservation) {
      const start = new Date(reservation.startDate); // need to check here later on for error
      const end = new Date(reservation.endDate);
      return `${format(start, "PP")} - ${format(end, "PP")}`;
    }
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="relative aspect-square w-full rounded-xl overflow-hidden">
          <Image
            fill
            src={data.imageSrc}
            style={{ objectFit: "cover" }}
            className="w-full h-full object-cover "
            alt="image"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg ">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price} </div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            label={actionLabel}
            onClick={handleCancel}
            disabled={disabled}
            small
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
