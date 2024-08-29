import React from 'react'
import { ErrorMessageProps } from '../types/componentsTypes/ErrorMessageProps'

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="text-center py-4 text-red-400">
      <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="mt-2 text-sm font-medium">Error</h3>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  )
}

export default ErrorMessage