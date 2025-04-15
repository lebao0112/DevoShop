export default function ProductCardSkeleton() {
  return (
    <div className="min-h-[480px] animate-pulse bg-white border border-gray-300 p-4 rounded-lg">
      <div className="w-full h-48 bg-gray-300 rounded"></div>
      <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-2/3"></div>
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/3"></div>
      <div className="mt-6 flex space-x-2">
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
