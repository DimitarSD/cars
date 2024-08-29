import React from 'react'
import { CarModification } from '../../lib/_generated/graphql_sdk'
import SortIndicator from './SortIndicator'
import FilterInput from '../Input/FilterInput'
import TableHeaderCell from './TableHeaderCell'

import { DataTableHeaderProps } from '../../types/componentsTypes/DataTableTypes/DataTableHeaderProps'

const DataTableHeader = ({
  filters,
  setFilters,
  sortColumn,
  sortDirection,
  handleSort,
}: DataTableHeaderProps) => {
  return (
    <tr>
      <TableHeaderCell label="Brand">
        <FilterInput
          placeholder="Filter brand"
          value={filters.brand}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, brand: value }))
          }
        />
      </TableHeaderCell>
      <TableHeaderCell label="Model">
        <FilterInput
          placeholder="Filter model"
          value={filters.model}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, model: value }))
          }
        />
      </TableHeaderCell>
      <TableHeaderCell label="Name">
        <FilterInput
          placeholder="Filter name"
          value={filters.name}
          onChange={(value) => setFilters((prev) => ({ ...prev, name: value }))}
        />
      </TableHeaderCell>
      <TableHeaderCell label="Coupe" />
      <TableHeaderCell
        label="Horse Power"
        onClick={() => handleSort('horsePower')}
      >
        <SortIndicator<CarModification>
          currentSortColumn={sortColumn}
          column="horsePower"
          sortDirection={sortDirection}
        />
      </TableHeaderCell>
      <TableHeaderCell label="Weight" onClick={() => handleSort('weight')}>
        <SortIndicator<CarModification>
          currentSortColumn={sortColumn}
          column="weight"
          sortDirection={sortDirection}
        />
      </TableHeaderCell>
      <TableHeaderCell label="Actions" />
    </tr>
  )
}

export default DataTableHeader
