import { Option } from '../CarEditorTypes/FieldsTypes/AdvancedSelectFieldProps'

export type DropdownListProps = {
  options: Option[];
  onSelect: (option: Option) => void;
}