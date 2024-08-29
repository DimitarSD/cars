import { useCallback, useState } from 'react'
import { useCarStore } from './../../store/useCarStore'

export const useBrandHandlers = () => {
  const { createBrand, editBrand, deleteBrand, brands } = useCarStore()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleBrandChange = useCallback(
    (value: string, setFieldValue: (field: string, value: any) => void) => {
      setFieldValue('brandId', value)
      setFieldValue('modelId', '')
      setFieldValue('modificationId', '')
      setFieldValue('coupe', '')
      setFieldValue('horsePower', '')
      setFieldValue('weight', '')
    },
    []
  )

  const handleCreateBrand = useCallback(
    async (
      name: string,
      setFieldValue: (field: string, value: any) => void
    ) => {
      const newBrand = await createBrand(name)
      if (newBrand) {
        setFieldValue('brandId', newBrand.id)
      } else {
        setLocalError('Failed to create brand')
      }
    },
    [createBrand]
  )

  const handleEditBrand = useCallback(
    async (id: string, newName: string) => {
      console.log('handleEditBrand', id, newName)
      await editBrand({ id, name: newName })
    },
    [editBrand]
  )

  const handleDeleteBrand = useCallback(
    async (id: string, setFieldValue: (field: string, value: any) => void) => {
      const success = await deleteBrand(id)
      if (success) {
        handleBrandChange('', setFieldValue)
      } else {
        setLocalError('Failed to delete brand')
      }
    },
    [deleteBrand, handleBrandChange]
  )

  const getBrandOptions = useCallback(() => {
    return brands.map((brand) => ({
      value: brand.id,
      label: brand.name,
    }))
  }, [brands])

  return {
    handleBrandChange,
    handleCreateBrand,
    handleEditBrand,
    handleDeleteBrand,
    getBrandOptions,
    localError,
  }
}
