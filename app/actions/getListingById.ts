import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  const { listingId } = params;
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return null;
    }
    // i have to return not like this
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
