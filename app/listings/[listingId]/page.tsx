import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/Heading";
import React from "react";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <div
          className="flex items-center justify-center h-[60vh]
        flex-col "
        >
          <Heading
            title="No exact matches"
            subtitle="Try changing or removing some of your filters."
          />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        reservations={reservations}
        listing={listing}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
