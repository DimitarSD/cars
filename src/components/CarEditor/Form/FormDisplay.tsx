import React from 'react'

import { FormDisplayProps } from '../../../types/componentsTypes/CarEditorTypes/FormTypes/FormDisplayProps'

const FormDisplay = ({ values }: FormDisplayProps) => {
  if (!values.modificationId) return null

  return (
    <>
      <div className="text-gray-300">
        <span className="font-medium">Coupe:</span> {values.coupe}
      </div>
      <div className="text-gray-300">
        <span className="font-medium">Horse Power:</span> {values.horsePower}
      </div>
      <div className="text-gray-300">
        <span className="font-medium">Weight:</span> {values.weight}
      </div>
    </>
  )
}

export default FormDisplay
