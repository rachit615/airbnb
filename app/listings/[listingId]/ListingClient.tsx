"use client";
import { Range } from "react-date-range";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/Navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval, setDate } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  const loginModal = useLoginModal();
  const router = useRouter();

  // disabled dates for cutting dates in calendar
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange); // specify the type of dateRange as <Range>

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initialDateRange);
        //redirect to /trips
        router.push("/trips");
        router.refresh();
      })
      .catch(() => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, totalPrice, dateRange, loginModal, listing?.id, router]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            id={listing.id}
            currentUser={currentUser}
            locationValue={listing.locationValue}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={currentUser}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing?.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                disabledDates={disabledDates}
                disabled={isLoading}
                onChangeDate={(value) => {
                  setDateRange(value);
                }}
                onSubmit={onCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
