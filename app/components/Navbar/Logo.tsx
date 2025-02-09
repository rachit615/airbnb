"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <div onClick={handleLogoClick}>
      <Image
        alt="logo"
        className=" hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/images/logo.png"
      />
    </div>
  );
};

export default Logo;
