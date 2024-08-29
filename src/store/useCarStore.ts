import * as carServices from './../services/carServices'
import {
  CarModification,
  CarBrand,
  CarModel,
} from './../lib/_generated/graphql_sdk'

import { create } from 'zustand'
import { createBrandSlice } from './brandStore'
import { createModelSlice } from './modelStore'
import { createModificationSlice } from './modificationStore'

import { ModificationState } from '../types/storeTypes/modificationStoreProps'
import { BrandState } from '../types/storeTypes/brandStoreProps'
import { ModelState } from '../types/storeTypes/modelStoreProps'

type ExtendedBrandState = BrandState &
  Pick<ModelState, 'models' | 'deleteModel'> &
  Pick<ModificationState, 'modifications' | 'deleteModification'>

type ExtendedModelState = ModelState &
  Pick<ModificationState, 'modifications' | 'deleteModification'>

type CarState = BrandState &
  ModelState &
  ModificationState & {
    loading: boolean
    error: string | null
    fetchAllData: () => Promise<void>
    all: CarModification[]
  }

export const useCarStore = create<CarState>((set, get, store) => ({
  ...createBrandSlice(set, get as () => ExtendedBrandState, store),
  ...createModelSlice(set, get as () => ExtendedModelState, store),
  ...createModificationSlice(set, get, store),

  loading: false,
  error: null,
  all: [],

  fetchAllData: async () => {
    set({ loading: true, error: null })
    try {
      const allModifications = await carServices.getAllModifications()

      const newBrands: CarBrand[] = []
      const newModels: Record<string, CarModel[]> = {}
      const newModifications: Record<string, CarModification[]> = {}

      allModifications.forEach((mod) => {
        const { brand, id: modelId, name: modelName } = mod.model

        if (!newBrands.some((b) => b.id === brand.id)) {
          newBrands.push(brand)
        }

        if (!newModels[brand.id]) {
          newModels[brand.id] = []
        }
        if (!newModels[brand.id].some((m) => m.id === modelId)) {
          newModels[brand.id].push({ id: modelId, name: modelName, brand })
        }

        if (!newModifications[modelId]) {
          newModifications[modelId] = []
        }
        newModifications[modelId].push(mod)
      })

      set({
        brands: newBrands,
        models: newModels,
        modifications: newModifications,
        all: allModifications,
      })
    } catch (error) {
      set({ error: 'Failed to fetch all data' })
    } finally {
      set({ loading: false })
    }
  },
}))
