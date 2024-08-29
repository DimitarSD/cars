import { CarCoupe } from '../lib/_generated/graphql_sdk'

export type CarFormValues = {
  brandId: string;
  modelId: string;
  modificationId: string;
  coupe: CarCoupe | string;
  horsePower: string;
  weight: string;
}

export const initialCarFormValues: CarFormValues = {
  brandId: '',
  modelId: '',
  modificationId: '',
  coupe: '',
  horsePower: '',
  weight: '',
}