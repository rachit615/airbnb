"use client";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface TripsClientProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState("");

  const router = useRouter();
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where are you going"
      />
      <div
        className="mt-1 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2
       lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-8 "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation?.listing}
            reservation={reservation}
            onAction={onCancel}
            actionLabel="Cancel"
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
