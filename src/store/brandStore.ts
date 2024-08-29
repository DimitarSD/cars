import { StateCreator } from 'zustand'
import { CarModel, CarModification } from './../lib/_generated/graphql_sdk'
import * as carServices from './../services/carServices'
import { executeWithRetries } from './../utils/retryUtils'

import {
  ExtendedBrandState,
  BrandState,
} from '../types/storeTypes/brandStoreProps'

export const createBrandSlice: StateCreator<
  ExtendedBrandState,
  [],
  [],
  BrandState
> = (set, get) => ({
  brands: [],

  createBrand: async (name: string) => {
    try {
      const newBrand = await carServices.createBrand(name)
      if (newBrand) {
        set((state) => ({
          brands: [...state.brands, newBrand],
        }))
      }
      return newBrand
    } catch (error) {
      console.error('Failed to create brand', error)
      return undefined
    }
  },

  editBrand: async (data: { id: string; name: string }) => {
    try {
      await carServices.editBrand(data)
      set((state) => ({
        brands: state.brands.map((brand) =>
          brand.id === data.id ? { ...brand, name: data.name } : brand
        ),
      }))
    } catch (error) {
      console.error('Failed to edit brand', error)
    }
  },

  deleteBrand: async (id) => {
    try {
      const relatedModels = get().models[id] || []

      const deleteModificationPromises = relatedModels.flatMap((model) => {
        const modifications = get().modifications[model.id] || []
        return modifications.map((mod) =>
          executeWithRetries(() => get().deleteModification(mod.id))
        )
      })

      const modificationResults = await Promise.allSettled(
        deleteModificationPromises
      )
      modificationResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`Successfully deleted modification`)
        } else {
          console.error(`Failed to delete modification: ${result.reason}`)
        }
      })

      const deleteModelPromises = relatedModels.map((model) =>
        executeWithRetries(() => get().deleteModel(model.id))
      )

      const modelResults = await Promise.allSettled(deleteModelPromises)
      modelResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(
            `Successfully deleted model with ID: ${relatedModels[index].id}`
          )
        } else {
          console.error(
            `Failed to delete model with ID: ${relatedModels[index].id}`
          )
        }
      })

      await executeWithRetries(() => carServices.deleteBrand(id))

      set((state) => ({
        brands: state.brands.filter((brand) => brand.id !== id),
        models: Object.keys(state.models).reduce<Record<string, CarModel[]>>(
          (acc, key) => {
            if (key !== id.toString()) acc[key] = state.models[key]
            return acc
          },
          {}
        ),
        modifications: Object.keys(state.modifications).reduce<Record<string, CarModification[]>>((acc, key) => {
          if (!relatedModels.some((model) => model.id.toString() === key)) {
            acc[key] = state.modifications[key]
          }
          return acc
        }, {}),
      }))

      return true
    } catch (error) {
      console.error('Failed to delete brand and associated data', error)
      return false
    }
  },
})
