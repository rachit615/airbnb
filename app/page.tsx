import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings();
  return (
    <ClientOnly>
      <Container>
        <div
          className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6
        gap-8
        "
        >
          {listings?.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
}
