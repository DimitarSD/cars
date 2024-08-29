import React from 'react';
import { EditButtonProps } from '../../types/componentsTypes/atomTypes/EditButtonProps'

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
    >
      <span className="sr-only">Edit or Delete</span>
      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    </button>
  );
};

export default EditButton
