import { StateCreator } from 'zustand';
import { CarModification, CarModificationData  } from './../lib/_generated/graphql_sdk';
import * as carServices from './../services/carServices';
import { executeWithRetries } from './../utils/retryUtils';

import { ModificationState } from '../types/storeTypes/modificationStoreProps';

export const createModificationSlice: StateCreator<ModificationState> = (set, get) => ({
  modifications: {},
  currentModification: null,

  getModificationsByModelId: (modelId: string) => {
    return get().modifications[modelId] || [];
  },

  getModificationById: (id: string) => {
    const modifications = Object.values(get().modifications).flat();
    return modifications.find((mod) => mod.id === id);
  },

  createModification: async (modelId: string, modificationName: string) => {
    try {
      const newModification = await carServices.createModification(modelId, modificationName);
      if (newModification) {
        set((state) => ({
          modifications: {
            ...state.modifications,
            [modelId]: [...(state.modifications[modelId] || []), newModification],
          },
        }));
        return newModification;
      }
    } catch (error) {
      console.error('Failed to create modification', error);
      return undefined;
    }
  },

  editModification: async (data: CarModificationData) => {
    try {
      const updatedModification = await carServices.editModification(data);
      set((state) => {
        const modelId = Object.keys(state.modifications).find(key => 
          state.modifications[key].some(mod => mod.id === data.id)
        );
        
        if (!modelId) {
          console.error('Model not found for modification', data.id);
          return state;
        }

        return {
          modifications: {
            ...state.modifications,
            [modelId]: state.modifications[modelId].map((mod) =>
              mod.id === data.id ? { ...mod, ...updatedModification } : mod
            ),
          },
        };
      });
    } catch (error) {
      console.error('Failed to edit modification', error);
    }
  },

  deleteModification: async (id) => {
    try {
      await executeWithRetries(() => carServices.deleteModification(id));
      
      set((state) => ({
        modifications: Object.keys(state.modifications).reduce<Record<string, CarModification[]>>((acc, key) => {
          acc[key] = state.modifications[key].filter((mod) => mod.id !== id);
          return acc;
        }, {}),
      }));
  
      return true;
    } catch (error) {
      console.error('Failed to delete modification', error);
      return false;
    }
  },

  setCurrentModification: (modification: CarModification) => {
    set({ currentModification: modification });
  },
});