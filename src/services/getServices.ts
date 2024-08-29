import { sdk } from '../lib/graphql-client'
import { CarBrand, CarModel, CarModification } from '../lib/_generated/graphql_sdk'

export const getBrands = async (): Promise<CarBrand[]> => {
  const result = await sdk.GetBrands()
  return result.carBrands
}

export const getModelsByBrandId = async (brandId: string): Promise<CarModel[]> => {
  const result = await sdk.GetModels({ brandId })
  return result.carModels
}

export const getModificationsByModelId = async (modelId: string): Promise<CarModification[]> => {
  const result = await sdk.GetModifications({ modelId })
  return result.carModifications
}

export const getAllModifications = async (): Promise<CarModification[]> => {
  const result = await sdk.GetAllModifications()
  return result.allCarModifications
}