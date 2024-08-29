import React from 'react'
import { useRouter } from 'next/navigation'
import { useCarStore } from '../../store/useCarStore'
import { DataTableRowProps } from '../../types/componentsTypes/DataTableTypes/DataTableRowProps'

const DataTableRow = ({ modification }: DataTableRowProps) => {
  const router = useRouter()
  const setCurrentModification = useCarStore((state) => state.setCurrentModification)

  const handleEdit = () => {
    setCurrentModification(modification)
    router.push(`/edit/${modification.id}`)
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{modification.model.brand.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{modification.model.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{modification.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{modification.coupe}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{modification.horsePower}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{modification.weight}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button onClick={handleEdit} className="text-purple-400 hover:text-purple-300">
          Edit
        </button>
      </td>
    </tr>
  )
}

export default DataTableRow