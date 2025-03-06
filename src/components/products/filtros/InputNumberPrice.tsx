
'use client'
import React, {useCallback} from 'react';
interface InputNumberPriceProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  maxRange: number;
}

export const InputNumberPrice = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  maxRange
}: InputNumberPriceProps) => {
  const handleMinPriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // If the value is only a "0", keep it that way
    if (value !== "0") {
      // Remove leading zeros, except for a single "0"
      value = value.replace(/^0+(?!$)/, '');
    }

    // Update the input value to reflect the change
    event.target.value = value;

    let newMinPrice = parseFloat(value) || 0;

    // Validación para evitar números negativos
    newMinPrice = Math.max(0, newMinPrice); 

    // Evita que minPrice supere maxPrice
    newMinPrice = Math.min(newMinPrice, maxPrice);

    onMinPriceChange(newMinPrice);
  }, [maxPrice, onMinPriceChange]);

  const handleMaxPriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // If the value is only a "0", keep it that way
    if (value !== "0") {
      // Remove leading zeros, except for a single "0"
      value = value.replace(/^0+(?!$)/, '');
    }

    // Update the input value to reflect the change
    event.target.value = value;

    let newMaxPrice = parseFloat(value) || 0;

    // Evita que maxPrice sea menor que minPrice
    newMaxPrice = Math.max(newMaxPrice, minPrice); // Iguala maxPrice a minPrice si se excede

    // Evita que maxPrice supere el rango máximo permitido
    newMaxPrice = Math.min(newMaxPrice, maxRange);

    onMaxPriceChange(newMaxPrice);
  }, [minPrice, onMaxPriceChange, maxRange]);

  return (
    <div className="flex items-center">
      <div className="group flex flex-col w-full group relative justify-endis-filled">
        <div data-slot="main-wrapper" className="h-full flex flex-col">
          <div data-slot="input-wrapper" 
          className="relative w-full inline-flex tap-highlight-transparent flex-row 
          items-center shadow-sm px-3 gap-3 bg-gray-100 hover:bg-gray-200 
          h-10 min-h-10 rounded-lg focus-within:bg-gray-200 transition-background
           motion-reduce:transition-none !duration-150 is-filled" style={{ cursor: 'text' }}>
            <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
              <p className="text-gray-400" style={{ verticalAlign: 'inherit' }}>$</p>
              <input
                data-slot="input"
                data-filled="true"
                data-filled-within="true"
                data-has-start-content="true"
                className="w-full font-normal bg-transparent 
                focus:outline-none !outline-none placeholder:text-foreground-500 
                ps-1.5 pe-1.5 file:cursor-pointer file:bg-transparent 
                file:border-0 autofill:bg-transparent bg-clip-text text-sm is-filled"
                aria-label="Precio mínimo"
                type="text"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="shrink-0 bg-divider border-none h-divider mx-2 w-2" role="separator" />
      <div className="group flex flex-col data-[hidden=true]:hidden w-full group relative justify-end data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)] is-filled" data-slot="base" data-filled="true" data-filled-within="true" data-has-value="true">
        <div data-slot="main-wrapper" className="h-full flex flex-col">
          <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-gray-100 hover:bg-gray-200 h-10 min-h-10 rounded-lg focus-within:bg-gray-200 transition-background motion-reduce:transition-none !duration-150 is-filled" style={{ cursor: 'text' }}>
            <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border">
              <p className="text-gray-400" style={{ verticalAlign: 'inherit' }}>$</p>
              <input
                data-slot="input"
                data-filled="true"
                data-filled-within="true"
                data-has-start-content="true"
                className="w-full font-normal bg-transparent focus:outline-none !outline-none placeholder:text-foreground-500 ps-1.5 pe-1.5 file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text text-sm is-filled"
                aria-label="Precio máximo"
                type="text"
                value={maxPrice}
               onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
