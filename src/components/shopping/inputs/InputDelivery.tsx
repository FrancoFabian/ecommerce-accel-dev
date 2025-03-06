'use client';
import React, { useState } from 'react';

interface InputDeliveryProps {
  name: string;
  label: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  floatLabel?: boolean;
  theme?: 'light' | 'dark';
  required?: boolean;
}

export const InputDelivery = ({
  name,
  label,
  value,
  type,
  placeholder,
  onChange,
  floatLabel = true,
  theme = 'light',
  required = true,
}: InputDeliveryProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const isDarkMode = theme === 'dark';

  // Determina si la etiqueta debe flotar
  const shouldFloatLabel = floatLabel && (isFocused || value);

  return (
    <div
      className={`group flex flex-col w-full relative ${
        floatLabel ? '' : 'mb-3'
      }`}
      data-slot="base"
    >
      {/* Etiqueta cuando floatLabel es falso */}
      {!floatLabel && (
        <label
          data-slot="label"
          className={`block text-sm font-medium mb-1 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div data-slot="main-wrapper" className="h-full flex flex-col">
        <div
          data-slot="input-wrapper"
          className={`relative w-full inline-flex flex-row items-center shadow-sm px-3 gap-3 border-2 h-10 min-h-10 rounded-xl transition duration-150 cursor-text
            ${isDarkMode ? 'border-gray-300' : 'border-gray-300'}
            ${
              isFocused
                ? isDarkMode
                  ? 'border-white'
                  : 'border-slate-800'
                : 'hover:border-gray-400'
            }
          `}
        >
          {/* Etiqueta flotante cuando floatLabel es verdadero */}
          {floatLabel && (
            <label
              data-slot="label"
              className={`absolute pointer-events-none origin-top-left subpixel-antialiased block will-change-auto duration-200 ease-out transition-all
                left-3 max-w-full text-ellipsis overflow-hidden
                ${
                  shouldFloatLabel
                    ? 'top-[-0.75rem] text-xs'
                    : 'top-2 text-sm'
                }
                ${isDarkMode ? 'text-white' : 'text-black'}
              `}
              id={`${name}-label`}
              htmlFor={name}
            >
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          <div
            data-slot="inner-wrapper"
            className="inline-flex w-full items-center h-full box-border"
          >
            <input
              data-slot="input"
              className={`w-full font-normal bg-transparent outline-none text-sm
                ${isDarkMode ? 'text-white' : 'text-gray-800'}
                placeholder:${isDarkMode ? 'text-gray-500' : 'text-gray-500'}
                focus:outline-none
              `}
              aria-label={label}
              aria-required={required}
              placeholder={floatLabel ? '' : placeholder}
              id={name}
              name={name}
              aria-labelledby={`${name} ${name}-label`}
              type={type}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};
