export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-white" />
    </div>
  )
}