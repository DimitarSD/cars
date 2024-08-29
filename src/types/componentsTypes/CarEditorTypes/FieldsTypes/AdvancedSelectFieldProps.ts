export type Option = {
  value: string;
  label: string;
  horsePower?: number;
}

export type AdvancedSelectFieldProps = {
  name: string;
  label: string;
  options: Option[];
  onEdit: (id: string, newName: string, newHorsePower?: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onChange?: (value: string) => void;
  onCreate?: (name: string, setFieldValue: (field: string, value: any) => void) => Promise<void>;
  setFieldValue: (field: string, value: any) => void;
  disabled?: boolean;
  isModification?: boolean;
}
