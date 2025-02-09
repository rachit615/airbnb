"use client";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import React from "react";

import Select from "react-select";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  const { getAllCountries } = useCountries();
  console.log(getAllCountries());

  const formatOptionLabel = (option: any) => (
    <div className="flex flex-row gap-3">
      <div>{option.flag}</div>
      <div>
        {option.label},
        <span className="text-neutral-800 ml-1">{option.region}</span>
      </div>
    </div>
  );

  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={getAllCountries()}
        isClearable
        onChange={(value) => onChange(value as CountrySelectValue)}
        value={value}
        formatOptionLabel={formatOptionLabel}
        classNames={{
          control: () => "border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        // theme={(theme) => ({
        //   ...theme,
        //   borderRadius: 6,
        //   colors: {
        //     primary: "black",
        //     primary25: "#ffe4e6",
        //   },
        // })}
      />
    </div>
  );
};

export default CountrySelect;
