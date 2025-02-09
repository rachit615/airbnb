"use client";

import React, { useCallback } from "react";
import { BsGlobe } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();

  const toggleMenuList = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const handleOnRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    // open rent modal
    rentModal.onOpen();
  }, [currentUser]);

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-2">
        <div
          onClick={handleOnRent}
          className="rounded-full text-sm font-semibold hover:bg-neutral-100 py-2 px-4 cursor-pointer hidden md:block"
        >
          Airbnb your home
        </div>
        <div className="rounded-full font-semibold hover:bg-neutral-100 transition cursor-pointer py-2 px-3 hidden md:block">
          <BsGlobe size={18} />
        </div>
        <div
          onClick={() => {
            toggleMenuList();
          }}
          className="flex flex-row items-center justify-between gap-3 cursor-pointer py-2 px-3 border-[1px] border-neutral-200 rounded-full hover:shadow-md "
        >
          <AiOutlineMenu />
          <div className="hidden md:block ">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute overflow-hidden rounded-xl shadow-md bg-white w-[40vw] md:w-3/4 top-14 right-0  ">
          {currentUser ? (
            <>
              <MenuItem
                label="My trips"
                value="mytrips"
                onClick={() => {
                  router.push("/trips");
                }}
              />

              <MenuItem
                label="My favourites"
                value="favourites"
                onClick={() => {}}
              />
              <MenuItem
                label="My reservations"
                value="reservations"
                onClick={() => {}}
              />
              <MenuItem
                label="Airbnb your home"
                value="airbnb_your_home"
                onClick={() => {}}
              />
              <hr />
              <MenuItem
                label="Logout"
                value="logout"
                onClick={() => {
                  signOut({ callbackUrl: "/", redirect: true });
                }}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="Login"
                value="login"
                onClick={loginModal.onOpen}
              />
              <MenuItem
                label="Sign up"
                value="signup"
                onClick={registerModal.onOpen}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
