'use client';

import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import './styles.css';

interface Props {
  images: string[];
  autoPlay?: boolean;
  showButtons?: boolean;
}

export const SliderImages = ({ images, autoPlay = false, showButtons = true }:Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);

  const selectNewImage = React.useCallback((next = true) => {
    setIsLoaded(false);
    setTimeout(() => {
      setSelectedIndex((prevIndex) => {
        const condition = next ? prevIndex < images.length - 1 : prevIndex > 0;
        return next ? (condition ? prevIndex + 1 : 0) : condition ? prevIndex - 1 : images.length - 1;
      });
    }, 500);
  }, [images.length]);

  const previousImage = () => selectNewImage(false);
  const nextImage = React.useCallback(() => selectNewImage(true), [selectNewImage]);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        nextImage();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, nextImage]);

  return (
    <div className="max-w-[95vw] lg:h-[50vh] sm:h-[45vh] h-[25vh] mx-auto overflow-hidden relative">
      <Image
        src={images[selectedIndex]}
        alt="Slider Image"
        className={`anime-transition ${isLoaded ? 'loaded' : ''} w-full h-full rounded-[20px]`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        onLoadingComplete={() => setIsLoaded(true)}
      />
      {showButtons && (
        <>
          <button
            onClick={previousImage}
            className="absolute top-1/2 left-1 transform -translate-y-1/2 p-2 bg-[#00000053] rounded-full shadow-lg"
          >
            <HiChevronLeft className="w-6 h-6 text-gray-200" />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-[#00000053] rounded-full shadow-lg"
          >
            <HiChevronRight className="w-6 h-6 text-gray-200" />
          </button>
        </>
      )}
    </div>
  );
};
