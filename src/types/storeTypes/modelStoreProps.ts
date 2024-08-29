import { CarModel, CarModification } from '../../lib/_generated/graphql_sdk'

export type ModelState = {
  models: Record<string, CarModel[]>;
  getModelsByBrandId: (brandId: string) => CarModel[];
  createModel: (brandId: string, name: string) => Promise<CarModel | undefined>;
  editModel: (data: { id: string; name: string }) => Promise<void>;
  deleteModel: (id: string) => Promise<boolean>;
  getBrandIdByModel: (searchCriteria: { id?: string; name?: string }) => string | undefined;
}

export type ExtendedBrandState = ModelState & {
  modifications: Record<string, CarModification[]>;
  deleteModification: (id: string) => Promise<boolean>;
}