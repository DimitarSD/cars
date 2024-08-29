import React from 'react'

import { EditDeletePopupProps } from '../../types/componentsTypes/CarEditorTypes/EditDeletePopupProps'

const EditDeletePopup = ({
  label,
  name,
  editValue,
  setEditValue,
  isModification,
  editHorsePower,
  setEditHorsePower,
  onClose,
  onEdit,
  onDelete,
}: EditDeletePopupProps) => {
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-medium text-gray-200">
        Edit or Delete {label}
      </h3>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )

  const renderNameInput = () => (
    <div className="mb-4">
      <label
        htmlFor={`edit-${name}`}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label} Name
      </label>
      <input
        id={`edit-${name}`}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2"
        placeholder={`Enter ${label} name`}
      />
    </div>
  )

  const renderHorsePowerInput = () => (
    <div className="mb-4">
      <label
        htmlFor={`edit-${name}-horsepower`}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        Horse Power
      </label>
      <input
        id={`edit-${name}-horsepower`}
        type="number"
        value={editHorsePower}
        onChange={(e) => setEditHorsePower(e.target.value)}
        className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2"
        placeholder="Enter horse power"
      />
    </div>
  )

  const renderActions = () => (
    <div className="flex justify-end space-x-3">
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Update {label}
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete {label}
      </button>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-[480px]">
        {renderHeader()}
        {renderNameInput()}
        {isModification && renderHorsePowerInput()}
        {renderActions()}
      </div>
    </div>
  )
}

export default EditDeletePopup
