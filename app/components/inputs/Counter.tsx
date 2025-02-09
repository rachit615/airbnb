import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subTitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onSubtract = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subTitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onSubtract}
          className="flex items-center justify-center cursor-pointer hover:opacity-80 transition rounded-full border-[1px] border-neutral-400 p-1 w-10 h-10 "
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="flex items-center justify-center cursor-pointer hover:opacity-80 transition rounded-full border-[1px] border-neutral-400 p-1 w-10 h-10"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
