import { sdk } from '../lib/graphql-client'

export const deleteBrand = async (id: string): Promise<boolean> => {
  const result = await sdk.DeleteCarBrand({ id })
  return result.deleteCarBrand
}

export const deleteModel = async (id: string): Promise<boolean> => {
  const result = await sdk.DeleteCarModel({ id })
  return result.deleteCarModel
}

export const deleteModification = async (id: string): Promise<boolean> => {
  const result = await sdk.DeleteCarModification({ id })
  return result.deleteCarModification
}