import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { totalPrice, startDate, endDate, listingId } = body;

  // checks

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          // here we have updated the listing by creating new reservation entry in reservations[]
          userId: currentUser.id,
          startDate: startDate,
          endDate: endDate,
          totalPrice: totalPrice,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
