'use client';
import { useState } from 'react';
import Image from 'next/image';

interface GaleriaProductProps {
  onSelectImage: (src: string) => void;
}

export const GaleriaProduct: React.FC<GaleriaProductProps> = ({ onSelectImage }) => {
  const images = [
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/2.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/3.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/4.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/5.jpeg',
    'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/6.jpeg',
  ];

  const [selectedIndex, setSelectedIndex] = useState(4);

  return (
    <div className="overflow-x-auto -mx-2 -mb-4 mt-4 flex w-full max-w-full gap-4 px-2 pb-4 pt-2">
      {images.map((src, index) => (
        <button
          key={index}
          onClick={() => {
            onSelectImage(src);
            setSelectedIndex(index);
          }}
          className={`relative h-24 w-24 flex-none cursor-pointer rounded-md ring-offset-background transition-shadow ${
            selectedIndex === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''
          }`}
        >
          <Image
            src={src}
            alt={`Product Image ${index + 1}`}
            width={96} // Tamaño fijo para evitar problemas con `fill`
            height={96}
            style={{ width: 'auto', height: 'auto', objectFit: 'cover' }}
            className="rounded-lg"
          />
        </button>
      ))}
    </div>
  );
};
