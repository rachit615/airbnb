import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds;
    return list?.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        let successMessage;
        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          successMessage = "removed from favorites";
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          successMessage = "added into favorites";
        }
        await request();
        router.refresh();

        toast.success(`${successMessage}`);
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, loginModal, hasFavorite, listingId, router]
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
};
export default useFavorite;
