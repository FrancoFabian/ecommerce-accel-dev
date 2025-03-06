'use client';
import { useState, CSSProperties } from 'react';

interface ColorOption {
  value: string;
  backgroundColor: string;
}

export const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#808080');

  const colors: ColorOption[] = [
    { value: '#808080', backgroundColor: 'rgb(128, 128, 128)' },
    { value: '#ffffff', backgroundColor: 'rgb(255, 255, 255)' },
    { value: '#222222', backgroundColor: 'rgb(34, 34, 34)' },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div
      className="flex flex-row flex-wrap gap-2"
      role="presentation"
      data-orientation="horizontal"
    >
      {colors.map((color) => (
        <label
          key={color.value}
          className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer p-2 -m-2"
        >
          <input
            type="radio"
            value={color.value}
            checked={selectedColor === color.value}
            onChange={() => handleColorSelect(color.value)}
            name="color-selector"
            className="hidden"
          />
          <span
            className={`pointer-events-none h-8 w-8 rounded-full border border-black border-opacity-10 transition-transform ${
              selectedColor === color.value ? 'ring-2 ring-offset-2 ring-offset-content1' : ''
            }`}
            style={
              {
                backgroundColor: color.backgroundColor,
                ...(selectedColor === color.value && { boxShadow: '20 20 20 2px hsl(black)' }),
              } as CSSProperties
            }
          ></span>
        </label>
      ))}
    </div>
  );
};
