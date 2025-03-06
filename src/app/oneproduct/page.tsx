import { EspecificacionProduct } from "@/components/products/oneproduct/EspecificationsProduct";
import { ProductDisplay } from "@/components/products/oneproduct/ProductDisplay";
import { Reviews } from "@/components/reviews/Reviews";

export default function NamePage() {
  return (
    <main className="w-[100vw] h-[90vh] flex justify-center flex-wrap pb-12 overflow-auto">
      <div className="w-full lg:w-[78%] relative flex 
      flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <ProductDisplay />
        <EspecificacionProduct />
      </div>
      <Reviews />
    </main>
  );
}

