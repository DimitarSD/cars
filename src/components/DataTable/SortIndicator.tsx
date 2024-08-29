import React from 'react'
import { SortIndicatorProps } from '../../types/componentsTypes/DataTableTypes/SortIndicatorProps'

const SortIndicator = <T,>({
  currentSortColumn,
  column,
  sortDirection,
}: SortIndicatorProps<T>): React.ReactElement => {
  if (currentSortColumn !== column) {
    return <span className="ml-1 text-gray-400">↕</span>
  }
  return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
}

export default SortIndicator
