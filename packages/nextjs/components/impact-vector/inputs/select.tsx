import React from "react";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}
export const SelectInput = ({ value, name, placeholder, onChange, options }: IProps) => {
  return (
    <select
      className="select max-w-[180px] select-info select-bordered bg-secondary focus:outline-none border border-neutral hover:border-gray-400 rounded-xl text-neutral-500"
      name={name}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    >
      {options.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
