'use client'

import React, { useState, useMemo } from 'react'
import { CarModification } from '../../lib/_generated/graphql_sdk'
import { filterAndSortModifications } from '../../utils/modificationUtils'
import DataTableHeader from './DataTableHeader'
import DataTableRow from './DataTableRow'
import { useCarStore } from './../../store/useCarStore'
import LoadingSpinner from '../LoadingSpinner'
import ErrorMessage from '../ErrorMessage'

import { DataTableProps } from '../../types/componentsTypes/DataTableTypes/DataTableProps'

const DataTable = ({ modifications }: DataTableProps) => {
  const loading = useCarStore((state) => state.loading)
  const error = useCarStore((state) => state.error)

  const [filters, setFilters] = useState({ brand: '', model: '', name: '' })
  const [sortColumn, setSortColumn] = useState<keyof CarModification | ''>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: keyof CarModification) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedModifications = useMemo(() => {
    return filterAndSortModifications(
      modifications,
      filters,
      sortColumn,
      sortDirection
    )
  }, [modifications, filters, sortColumn, sortDirection])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <DataTableHeader
                  filters={filters}
                  setFilters={setFilters}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                />
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {filteredAndSortedModifications.map((modification) => (
                  <DataTableRow
                    key={modification.id}
                    modification={modification}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTable
