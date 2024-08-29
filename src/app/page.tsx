'use client'

import DataTable from '../components/DataTable/DataTable'
import { useCarStore } from './../store/useCarStore'

const Home = () => {
  const allCarModifications = useCarStore((state) => state.all)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-purple-300">
          Car Modifications
        </h1>
        <DataTable modifications={allCarModifications} />
      </div>
    </div>
  )
}

export default Home
