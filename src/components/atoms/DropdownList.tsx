import React from 'react';
import { DropdownListProps } from '../../types/componentsTypes/atomTypes/DropdownListProps'

const DropdownList = ({ options, onSelect }: DropdownListProps) => {
  return (
    <ul className="absolute z-10 mt-1 w-full bg-gray-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
      {options.map((option) => (
        <li
          key={option.value}
          className="text-gray-300 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-600"
          onClick={() => onSelect(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList