import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    description,
    title,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      category,
      roomCount,
      guestCount,
      bathroomCount,
      imageSrc,
      description,
      title,
      locationValue: location.value,
      userId: currentUser?.id,
      price: parseInt(price, 10),
    },
  });
  return NextResponse.json(listing);
}
