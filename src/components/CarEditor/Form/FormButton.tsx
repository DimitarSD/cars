import React from 'react'
import { FormButtonProps } from '../../../types/componentsTypes/CarEditorTypes/FormTypes/FormButtonProps'

const FormButton = ({
  type,
  onClick,
  isLoading,
  loadingText,
  text,
  variant,
  disabled
}: FormButtonProps) => {
  const baseClasses = "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-500",
    danger: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:ring-red-500"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {isLoading ? loadingText : text}
    </button>
  )
}

export default FormButton