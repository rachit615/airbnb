"use client";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import CategoryView from "./ListingCategory";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: User | null | undefined;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  description: string;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  roomCount,
  guestCount,
  bathroomCount,
  description,
  locationValue,
}) => {
  const { getCountryByValue } = useCountries();
  const coordinates = getCountryByValue(locationValue)?.latlng;
  return (
    <div className="flex flex-col col-span-4 gap-8  ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3 text-xl font-semibold ">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category?.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
    </div>
  );
};

export default ListingInfo;
