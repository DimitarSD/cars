import React from 'react'
import { TableHeaderCellProps } from '../../types/componentsTypes/DataTableTypes/TableHeaderCellProps'

const TableHeaderCell = ({
  label,
  onClick,
  children,
}: TableHeaderCellProps) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider min-w-[165px] ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    {label}
    {children}
  </th>
)

export default TableHeaderCell
