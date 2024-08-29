import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="text-center py-4 text-gray-300">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      <p className="mt-2">Loading...</p>
    </div>
  )
}

export default LoadingSpinner