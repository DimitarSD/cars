import { CarModification } from '../../../lib/_generated/graphql_sdk'

export type DataTableHeaderProps = {
  filters: {
    brand: string
    model: string
    name: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      brand: string
      model: string
      name: string
    }>
  >
  sortColumn: keyof CarModification | ''
  sortDirection: 'asc' | 'desc'
  handleSort: (column: keyof CarModification) => void
}