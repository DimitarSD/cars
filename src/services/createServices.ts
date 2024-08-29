import { sdk } from '../lib/graphql-client'
import { CarBrand, CarModel, CarModification } from '../lib/_generated/graphql_sdk'

export const createBrand = async (name: string): Promise<CarBrand> => {
  const result = await sdk.CreateCarBrand({ name })
  return result.createCarBrand
}

export const createModel = async (brandId: string, name: string): Promise<CarModel> => {
  const result = await sdk.CreateCarModel({ brandId, name })
  return result.createCarModel
}

export const createModification = async (
  modelId: string,
  modificationName: string
): Promise<CarModification> => {
  const result = await sdk.CreateCarModification({
    modelId,
    name: modificationName,
  })
  return result.createCarModification
}