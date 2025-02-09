"use client";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 cursor-pointer transition"
    >
      <AiOutlineHeart size={28} className="fill-white" />
      <AiFillHeart
        size={24}
        className={`${
          hasFavorite ? "fill-rose-500" : "fill-neutral-500/60"
        } absolute top-[2px] right-[2px] `}
      />
    </div>
  );
};

export default HeartButton;
