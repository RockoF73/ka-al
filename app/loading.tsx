export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-space-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

