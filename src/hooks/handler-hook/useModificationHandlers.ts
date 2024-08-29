import { useCallback, useState } from 'react'
import { useCarStore } from '../../store/useCarStore'
import { CarCoupe, CarModificationData } from '../../lib/_generated/graphql_sdk'

export const useModificationHandlers = () => {
  const {
    createModification,
    editModification,
    deleteModification,
    getModificationById,
    getModificationsByModelId,
  } = useCarStore()

  const [localError, setLocalError] = useState<string | null>(null)

  const handleModificationChange = useCallback(
    (value: string, setFieldValue: (field: string, value: any) => void) => {
      setFieldValue('modificationId', value)
      if (value) {
        const selectedModification = getModificationById(value)
        if (selectedModification) {
          setFieldValue('coupe', selectedModification.coupe)
          setFieldValue(
            'horsePower',
            selectedModification.horsePower.toString()
          )
          setFieldValue('weight', selectedModification.weight.toString())
        }
      } else {
        setFieldValue('coupe', '')
        setFieldValue('horsePower', '')
        setFieldValue('weight', '')
      }
    },
    [getModificationById]
  )

  const handleCreateModification = useCallback(
    async (
      modelId: string,
      name: string,
      setFieldValue: (field: string, value: any) => void
    ) => {
      const newModification = await createModification(modelId, name)
      if (newModification) {
        setFieldValue('modificationId', newModification.id)
        setFieldValue('coupe', '')
        setFieldValue('horsePower', '')
        setFieldValue('weight', '')
      } else {
        setLocalError('Failed to create modification')
      }
    },
    [createModification]
  )

  const handleEditModification = useCallback(
    async (id: string, newName: string, newHorsePower?: number) => {
      await editModification({
        id,
        name: newName,
        horsePower: newHorsePower,
      } as CarModificationData)
    },
    [editModification]
  )

  const handleDeleteModification = useCallback(
    async (id: string, setFieldValue: (field: string, value: any) => void) => {
      const success = await deleteModification(id)
      if (success) {
        setFieldValue('modificationId', '')
        setFieldValue('coupe', '')
        setFieldValue('horsePower', '')
        setFieldValue('weight', '')
      } else {
        setLocalError('Failed to delete modification')
      }
    },
    [deleteModification]
  )

  const getModificationOptions = useCallback(
    (modelId: string) => {
      const modifications = getModificationsByModelId(modelId)
      return modifications
        ? modifications.map((modification) => ({
            value: modification.id,
            label: modification.name,
            horsePower: modification.horsePower,
          }))
        : []
    },
    [getModificationsByModelId]
  )

  return {
    handleModificationChange,
    handleCreateModification,
    handleEditModification,
    handleDeleteModification,
    getModificationOptions,
    localError,
  }
}
