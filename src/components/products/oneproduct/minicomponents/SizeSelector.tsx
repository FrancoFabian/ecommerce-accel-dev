'use client';
import { useState } from 'react';

interface SizeOption {
  value: string;
  label: string;
}

export const SizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState<string>('39');

  const sizes: SizeOption[] = [
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '48', label: '48' },
    { value: '50', label: '50' },
  ];

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div
      className="flex flex-row flex-wrap gap-2"
      role="presentation"
      data-orientation="horizontal"
    >
      {sizes.map((size) => (
        <label
          key={size.value}
          className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer p-2 -m-2"
        >
          <input
            type="radio"
            value={size.value}
            checked={selectedSize === size.value}
            onChange={() => handleSizeSelect(size.value)}
            name="size-selector"
            className="hidden"
          />
          <div
            className={`max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-2 h-8 rounded-md ${
              selectedSize === size.value ? 'bg-primary text-white' : 'bg-default/40 text-default-400'
            } relative text-foreground select-none text-large transition-colors`}
          >
            <span className="flex-1 font-normal px-2 !text-small">
              {size.label}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
};