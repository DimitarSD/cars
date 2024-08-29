import React from 'react';
import { useBrandHandlers } from '../../../hooks/handler-hook/useBrandHandlers';
import { useModelHandlers } from '../../../hooks/handler-hook/useModelHandlers';
import { useModificationHandlers } from '../../../hooks/handler-hook/useModificationHandlers';
import AdvancedSelectField from './AdvancedSelectField';
import { FormFieldsProps } from '../../../types/componentsTypes/CarEditorTypes/FieldsTypes/FormFieldsProps'

const FormFields = ({ values, setFieldValue }: FormFieldsProps) => {
  const { handleBrandChange, handleEditBrand, handleDeleteBrand, getBrandOptions, handleCreateBrand } = useBrandHandlers();
  const { handleModelChange, handleEditModel, handleDeleteModel, getModelOptions, handleCreateModel } = useModelHandlers();
  const { handleModificationChange, handleEditModification, handleDeleteModification, getModificationOptions, handleCreateModification } = useModificationHandlers();

  return (
    <>
      <AdvancedSelectField
        name="brandId"
        label="Brand"
        options={getBrandOptions()}
        onEdit={handleEditBrand}
        onDelete={(id) => handleDeleteBrand(id, setFieldValue)}
        onChange={(value) => handleBrandChange(value, setFieldValue)}
        onCreate={(name) => handleCreateBrand(name, setFieldValue)}
        setFieldValue={setFieldValue}
      />

      <AdvancedSelectField
        name="modelId"
        label="Model"
        options={getModelOptions(values.brandId)}
        onEdit={handleEditModel}
        onDelete={(id) => handleDeleteModel(id, setFieldValue)}
        onChange={(value) => handleModelChange(value, setFieldValue)}
        onCreate={(name) => handleCreateModel(values.brandId, name, setFieldValue)} 
        disabled={!values.brandId}
        setFieldValue={setFieldValue}
      />

      <AdvancedSelectField
        name="modificationId"
        label="Modification"
        options={getModificationOptions(values.modelId)}
        onEdit={handleEditModification}
        onDelete={(id) => handleDeleteModification(id, setFieldValue)}
        onChange={(value) => handleModificationChange(value, setFieldValue)}
        onCreate={(name) => handleCreateModification(values.modelId, name, setFieldValue)}
        disabled={!values.modelId}
        isModification={true}
        setFieldValue={setFieldValue}
      />
    </>
  );
};

export default FormFields