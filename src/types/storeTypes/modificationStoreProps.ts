import { CarModification, CarModificationData } from '../../lib/_generated/graphql_sdk'

export type ModificationState = {
  modifications: Record<string, CarModification[]>;
  currentModification: CarModification | null;
  getModificationsByModelId: (modelId: string) => CarModification[];
  getModificationById: (id: string) => CarModification | undefined;
  createModification: (modelId: string, modificationName: string) => Promise<CarModification | undefined>;
  editModification: (data: CarModificationData) => Promise<void>;
  deleteModification: (id: string) => Promise<boolean>;
  setCurrentModification: (modification: CarModification) => void;
}

