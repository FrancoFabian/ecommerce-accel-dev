

export const ProductCardSkeleton = () => {
  return (
    <div className="relative flex flex-col 
    w-64 lg:w-64 md:w-64 sm:w-72 
    h-[20rem] lg:h-[32rem] md:h-[32rem] sm:h-[32rem] max-w-full 
    gap-3 rounded-lg bg-white p-4 shadow-md animate-pulse">

      {/* Image skeleton */}
      <div className="relative w-full h-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
      </div>

      {/* Product information skeleton */}
      <div className="flex flex-col gap-2">
        {/* Brand skeleton */}
        <div className="h-4 bg-gray-200 rounded w-16"></div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Add to cart button skeleton */}
        <div className="mt-auto w-full h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};