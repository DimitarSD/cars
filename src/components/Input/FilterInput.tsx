import React from 'react'
import { FilterInputProps } from '../../types/componentsTypes/InputType/FilterInputProps'

const FilterInput = ({
  placeholder,
  value,
  onChange,
}: FilterInputProps) => (
  <input
    type="text"
    className="block w-full mt-1 text-sm bg-gray-700 border-gray-600 rounded-md text-white focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 px-3 py-2"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
)

export default FilterInput