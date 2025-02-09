"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { User } from "@prisma/client";
import Categories from "./Categories";

interface NavBarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm border-b-[1px] ">
      <div className="py-4  ">
        <Container>
          <div className="flex flex-row gap-3 md: gap-0 items-center justify-between">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
