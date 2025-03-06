'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { GaleriaProduct } from './GaleriaProduct';

export const ProductDisplay = () => {
  const [selectedImage, setSelectedImage] = useState(
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/5.jpeg'
  );

  return (
    <div className="relative flex-none w-full">
      {/* Popular Badge */}
      <div className="max-w-fit inline-flex items-center bg-slate-200 justify-between px-2 text-medium rounded-full absolute left-3 top-3 z-20 h-10 gap-1 bg-background/60 pl-3 pr-2 shadow-medium backdrop-blur-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="max-h-[80%] w-5 h-5 text-yellow-500"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z"
          />
        </svg>
        <span className="flex-1 font-normal px-2 pl-1">Popular</span>
      </div>

      {/* Contenedor con height dinámico y responsivo */}
      <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh]">
        <Image
          src={selectedImage}
          alt="Nike Air Max 270"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
          priority
          style={{ objectFit: 'fill' }} // ✅ Para que la imagen cubra todo el espacio sin distorsión
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Thumbnail Gallery */}
      <GaleriaProduct onSelectImage={(src: string) => setSelectedImage(src)} />
    </div>
  );
};
