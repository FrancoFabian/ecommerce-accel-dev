

export const ProductCardSkeleton = () => {
  return (
    <div className="relative flex flex-col 
    w-64 lg:w-64 md:w-64 sm:w-72 
    min-w-[256px] min-h-[20rem] lg:min-h-[32rem] md:min-h-[32rem] sm:min-h-[32rem]
    h-[20rem] lg:h-[32rem] md:h-[32rem] sm:h-[32rem] max-w-full 
    gap-3 rounded-lg bg-white p-4 shadow-md animate-pulse">

      {/* Image skeleton - tamaño fijo */}
      <div className="relative w-full h-40 lg:h-60 md:h-60 sm:h-60 min-h-[160px] lg:min-h-[240px] md:min-h-[240px] sm:min-h-[240px]
        bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
      </div>

      {/* Product information skeleton - tamaño fijo */}
      <div className="flex flex-col gap-2 flex-1">
        {/* Brand skeleton - tamaño fijo */}
        <div className="h-4 bg-gray-200 rounded w-16 min-w-[64px] min-h-[16px] flex-shrink-0"></div>

        {/* Title skeleton - tamaño fijo */}
        <div className="space-y-2 flex-shrink-0">
          <div className="h-4 bg-gray-200 rounded w-full min-h-[16px]"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 min-h-[16px]"></div>
        </div>

        {/* Add to cart button skeleton - tamaño fijo */}
        <div className="mt-auto w-full h-10 min-h-[40px] bg-gray-200 rounded-md flex-shrink-0"></div>
      </div>
    </div>
  );
};