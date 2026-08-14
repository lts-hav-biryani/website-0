import React from 'react'

const loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>

        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-amber-400"></div>
      </div>
    </div>
  )
}

export default loading;