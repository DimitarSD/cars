'use client'

import './globals.css'
import { useEffect } from 'react';
import { useCarStore } from './../store/useCarStore'


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const fetchAllData = useCarStore((state) => state.fetchAllData);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout