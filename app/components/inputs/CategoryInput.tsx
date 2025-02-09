"use client";
import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col items-center p-4 cursor-pointer
       border-2 transition
       gap-3 rounded-xl hover:border-black
      ${selected ? "border-black" : "border-neutral-200"}
  `}
    >
      <Icon size={18} />
      {label}
    </div>
  );
};

export default CategoryInput;
