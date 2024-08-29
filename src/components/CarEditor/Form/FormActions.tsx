import React from 'react'
import FormButton from './FormButton'

import { FormActionsProps } from '../../../types/componentsTypes/CarEditorTypes/FormTypes/FormActionsProps'

const FormActions = ({
  carModification,
  loading,
  onClose,
}: FormActionsProps) => {
  return (
    <div className="flex justify-between mt-8">
      <FormButton
        type="submit"
        isLoading={loading}
        loadingText="Saving..."
        text={carModification ? 'Update Modification' : 'Create Modification'}
        variant="primary"
      />
      <FormButton
        type="button"
        onClick={onClose}
        text="Cancel"
        variant="danger"
        disabled={loading}
        isLoading={false}
        loadingText="Cancelling..."
      />
    </div>
  )
}

export default FormActions
