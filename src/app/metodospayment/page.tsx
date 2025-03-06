'use client';
import React from 'react';
import { FormAllShoppingcar } from '@/components/shopping/CartItems/FormAllShoppingcar';
import { CardAdds } from '@/components/shopping/adds/CardAdds';


export default function PaymentPage() {
  const handleAddToCart = () => {
    console.log('Producto añadido a la cesta');
  };
  return (
    <main className='flex w-full lg:h-[93vh] sm:h-[82vh] gap-5 pr-0 lg:pr-4'>
      <div className='w-full lg:w-[44%] h-[85vh] md:h-[90vh] sm:h-[90vh] lg:h-full lg:overflow-hidden overflow-y-auto flex-none py-4'>
        <FormAllShoppingcar />
      </div>
      <CardAdds
        title="Nike Adapt BB 2.0"
        subtitle="El futuro del calzado está aquí."
        price="$399,99"
        imageUrl="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes.jpg"
        reviews={120}
        onAddToCart={handleAddToCart}
      />
    </main>

  );
}
