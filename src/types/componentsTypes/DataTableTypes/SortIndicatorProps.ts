export type SortIndicatorProps<T> = {
  currentSortColumn: keyof T | ''
  column: keyof T
  sortDirection: 'asc' | 'desc'
}