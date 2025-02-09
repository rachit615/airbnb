"use client";
import Heading from "@/app/components/Heading";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useMemo } from "react";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  locationValue: string;
  currentUser: User | null | undefined;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  locationValue,
  currentUser,
}) => {
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="rounded-xl w-full h-[60vh] overflow-hidden relative">
        <Image
          src={imageSrc}
          fill
          alt="listing image"
          className="object-cover w-full"
        />
      </div>
    </>
  );
};

export default ListingHead;
