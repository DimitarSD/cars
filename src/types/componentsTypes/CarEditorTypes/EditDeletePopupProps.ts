export type EditDeletePopupProps = {
  label: string;
  name: string;
  editValue: string;
  setEditValue: (value: string) => void;
  isModification: boolean;
  editHorsePower: string;
  setEditHorsePower: (value: string) => void;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}