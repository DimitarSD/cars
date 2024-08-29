import { useCallback } from 'react'
import { useCarStore } from './../../store/useCarStore'

export const useModelHandlers = () => {
  const {
    createModel,
    editModel,
    deleteModel,
    models,
  } = useCarStore()

  const handleModelChange = useCallback(
    (value: string, setFieldValue: (field: string, value: any) => void) => {
      setFieldValue('modelId', value)
      setFieldValue('modificationId', '')
      setFieldValue('coupe', '')
      setFieldValue('horsePower', '')
      setFieldValue('weight', '')
    },
    []
  )

  const handleCreateModel = useCallback(
    async (
      brandId: string,
      name: string,
      setFieldValue: (field: string, value: any) => void
    ) => {
      const newModel = await createModel(brandId, name)
      if (newModel) {
        setFieldValue('modelId', newModel.id)
      } else {
        console.error('Failed to create model')
      }
    },
    [createModel]
  )

  const handleEditModel = useCallback(
    async (id: string, newName: string) => {
      await editModel({ id, name: newName })
    },
    [editModel]
  )

  const handleDeleteModel = useCallback(
    async (id: string, setFieldValue: (field: string, value: any) => void) => {
      const success = await deleteModel(id)
      if (success) {
        handleModelChange('', setFieldValue)
      } else {
        console.error('Failed to delete model')
      }
    },
    [deleteModel, handleModelChange]
  )

  const getModelOptions = useCallback(
    (brandId: string) => {
      const brandModels = models[Number(brandId)] || []

      return brandModels.map((model) => ({
        value: model.id,
        label: model.name,
      }))
    },
    [models]
  )

  return {
    handleModelChange,
    handleCreateModel,
    handleEditModel,
    handleDeleteModel,
    getModelOptions,
  }
}
