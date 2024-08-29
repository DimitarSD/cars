import { StateCreator } from 'zustand';
import * as carServices from './../services/carServices';
import { executeWithRetries } from './../utils/retryUtils';

import { ExtendedBrandState, ModelState } from '../types/storeTypes/modelStoreProps';

export const createModelSlice: StateCreator<ExtendedBrandState, [], [],ModelState> = (set, get) => ({
  models: {},

  getBrandIdByModel: (searchCriteria: { id?: string; name?: string }): string | undefined => {
    const { models } = get();
    for (const brandId in models) {
      const foundModel = models[brandId].find(
        (model) =>
          (searchCriteria.id && model.id === searchCriteria.id) ||
          (searchCriteria.name && model.name === searchCriteria.name)
      );
      if (foundModel) {
        return brandId;
      }
    }
    return undefined;
  },

  getModelsByBrandId: (brandId: string) => {
    return get().models[brandId] || [];
  },

  createModel: async (brandId: string, name: string) => {
    try {
      const newModel = await carServices.createModel(brandId, name);
      if (newModel) {
        set((state) => ({
          models: {
            ...state.models,
            [brandId]: [...(state.models[brandId] || []), newModel],
          },
        }));
        return newModel;
      }
    } catch (error) {
      console.error('Failed to create model', error);
      return undefined;
    }
  },

  editModel: async (data: { id: string; name: string }) => {
    try {
      const brandId = get().getBrandIdByModel({ id: data.id });

      if (!brandId) {
        throw new Error('Model not found');
      }
  
      await carServices.editModel(data);
  
      set((state) => ({
        models: {
          ...state.models,
          [brandId]: state.models[brandId].map((model) =>
            model.id === data.id
              ? { ...model, name: data.name }
              : model
          ),
        },
      }));
    } catch (error) {
      console.error('Failed to edit model', error);
    }
  },

  deleteModel: async (id: string) => {
    try {
      const modifications = get().modifications[id] || [];
      const deleteModificationPromises = modifications.map((mod) => 
        executeWithRetries(() => get().deleteModification(mod.id))
      );

      const modificationResults = await Promise.allSettled(deleteModificationPromises);
      modificationResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`Successfully deleted modification`);
        } else {
          console.error(`Failed to delete modification: ${result.reason}`);
        }
      });
  
      await executeWithRetries(() => carServices.deleteModel(id));

      set((state) => {
        const updatedModels = { ...state.models };
        const updatedModifications = { ...state.modifications };
        const brandId = Object.keys(updatedModels).find(key =>
          updatedModels[key].some(model => model.id === id)
        );

        if (brandId) {
          updatedModels[brandId] = updatedModels[brandId].filter(model => model.id !== id);
          delete updatedModifications[id];

          return {
            models: updatedModels,
            modifications: updatedModifications,
          };
        }

        return state;
      });
  
      return true;
    } catch (error) {
      console.error('Failed to delete model and associated data', error);
      return false;
    }
  },
});