import React from 'react'

const loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-amber-400" />
    </div>
  )
}

export default loading;