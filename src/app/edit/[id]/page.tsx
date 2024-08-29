'use client'

import { useRouter } from 'next/navigation'
import { useCarStore } from '../../../store/useCarStore'
import CarForm from '../../../components/CarEditor/Form/CarForm'
import LoadingSpinner from '../../../components/LoadingSpinner'

const EditCarPage = () => {
  const router = useRouter()

  const currentModification = useCarStore((state) => state.currentModification)

  const handleClose = () => {
    router.back()
  }

  if (!currentModification) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-300">Car Editor</h1>
        <CarForm carModification={currentModification} onClose={handleClose} />
      </div>
    </div>
  )
}

export default EditCarPage
