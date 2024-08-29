import React from 'react';
import { Option } from '../../types/componentsTypes/CarEditorTypes/FieldsTypes/AdvancedSelectFieldProps';
import DropdownList from '../atoms/DropdownList';

interface DropdownMenuProps {
  searchTerm: string;
  label: string;
  filteredOptions: Option[];
  handleSelect: (option: Option) => void;
  handleCreateNew: () => void;
  setSearchTerm: (term: string) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  searchTerm,
  label,
  filteredOptions,
  handleSelect,
  handleCreateNew,
  setSearchTerm,
}) => {
  return (
    <div className="absolute z-10 mt-1 w-full bg-gray-700 shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      <input
        type="text"
        className="w-full px-3 py-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-t-md focus:outline-none sticky top-0"
        placeholder={`Search or create new ${label}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-y-auto max-h-[70vh]">
        {filteredOptions.length > 0 ? (
          <DropdownList options={filteredOptions} onSelect={handleSelect} />
        ) : searchTerm && (
          <div
            className="text-gray-300 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-600"
            onClick={handleCreateNew}
          >
            <span className="text-purple-400">Create new</span> &quot;{searchTerm}&quot;
          </div>
        )}
      </div>
    </div>
  );
};