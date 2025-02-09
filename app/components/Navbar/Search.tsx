import React from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  return (
    <div className=" md:w-auto py-2 ml-20 w-full rounded-full  hover:shadow-md shadow-sm transition cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm px-6 font-semibold">Anywhere</div>
        <div className="text-sm px-6 font-semibold border-x-[1px] ">
          Anyweek
        </div>
        <div className="text-sm pl-6 pr-2 flex flex-row items-center gap-3">
          <div className="text-sm text-gray-600">Add guests</div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
