"use client";
import React from "react";

interface MenuItemProps {
  label: string;
  value: string;
  onClick: () => void;
}

const MenuItem = ({ label, value, onClick }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="hover:bg-neutral-100 px-4 py-2 cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MenuItem;
