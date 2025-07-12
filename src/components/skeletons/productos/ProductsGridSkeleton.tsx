import { ProductCardSkeleton } from './ProductCardSkeleton';

interface ProductsGridSkeletonProps {
  count?: number;
}

export const ProductsGridSkeleton = ({ count = 8 }: ProductsGridSkeletonProps) => {
  return (
    <div
      className="px-2 pt-2 pb-20 grid 
                 grid-cols-2 gap-4 
                 sm:flex sm:flex-wrap sm:justify-center sm:items-center
                 md:grid-cols-3 
                 lg:grid-cols-4 lg:flex lg:justify-center lg:items-center lg:flex-wrap"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};