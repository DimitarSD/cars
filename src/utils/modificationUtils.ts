import { CarModification } from '../lib/_generated/graphql_sdk'

type Filters = {
  brand: string
  model: string
  name: string
}

export const filterModifications = (
  modifications: CarModification[],
  filters: Filters
) => {
  return modifications.filter(
    (mod) =>
      mod.model.brand.name
        .toLowerCase()
        .includes(filters.brand.toLowerCase()) &&
      mod.model.name.toLowerCase().includes(filters.model.toLowerCase()) &&
      mod.name.toLowerCase().includes(filters.name.toLowerCase())
  )
}

export const sortModifications = (
  modifications: CarModification[],
  sortColumn: keyof CarModification | '',
  sortDirection: 'asc' | 'desc'
) => {
  if (!sortColumn || (sortColumn !== 'horsePower' && sortColumn !== 'weight')) {
    return modifications
  }

  return [...modifications].sort((a, b) => {
    return sortDirection === 'asc'
      ? a[sortColumn] - b[sortColumn]
      : b[sortColumn] - a[sortColumn]
  })
}

export const filterAndSortModifications = (
  modifications: CarModification[],
  filters: Filters,
  sortColumn: keyof CarModification | '',
  sortDirection: 'asc' | 'desc'
) => {
  const filtered = filterModifications(modifications, filters)
  return sortModifications(filtered, sortColumn, sortDirection)
}
