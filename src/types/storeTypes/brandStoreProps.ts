import { CarBrand, CarModel, CarModification } from '../../lib/_generated/graphql_sdk'

export type BrandState = {
  brands: CarBrand[];
  createBrand: (name: string) => Promise<CarBrand | undefined>;
  editBrand: (data: { id: string; name: string }) => Promise<void>;
  deleteBrand: (id: string) => Promise<boolean>;
}

export type ExtendedBrandState = BrandState & {
  models: Record<string, CarModel[]>;
  modifications: Record<string, CarModification[]>;
  deleteModel: (id: string) => Promise<boolean>;
  deleteModification: (id: string) => Promise<boolean>;
}