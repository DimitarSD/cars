import { sdk } from '../lib/graphql-client'
import { CarBrand, CarModel, CarModification, CarBrandData, CarModelData, CarModificationData } from '../lib/_generated/graphql_sdk'

export const editBrand = async (data: CarBrandData): Promise<CarBrand> => {
  const result = await sdk.EditCarBrand({ data })
  return result.editCarBrand
}

export const editModel = async (data: CarModelData): Promise<CarModel> => {
  const result = await sdk.EditCarModel({ data })
  return result.editCarModel
}

export const editModification = async (data: CarModificationData): Promise<CarModification> => {
  const result = await sdk.EditCarModification({ data })
  return result.editCarModification
}