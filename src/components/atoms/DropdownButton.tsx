import React from 'react';
import { DropdownButtonProps } from '../../types/componentsTypes/atomTypes/DropdownButtonProps'

const DropdownButton = ({ onClick, text, disabled }: DropdownButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-gray-700 relative w-full border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-gray-300 h-10"
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default DropdownButton