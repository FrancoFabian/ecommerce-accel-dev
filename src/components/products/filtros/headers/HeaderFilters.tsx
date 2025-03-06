'use client';
import { useState, useRef, useEffect, JSX } from 'react';
import { HiChevronDown } from 'react-icons/hi2';
import '../styles.css';
import { ContentFilterprice } from '../ContentFilterprice';
import { ColorSelector } from '../../oneproduct/minicomponents/ColorSelector';

const filterLabels = ['Pricing Range', 'Color', 'Size', 'Rating', 'Category'] as const;
type FilterLabel = (typeof filterLabels)[number];

// Diccionario de componentes de filtro
const filterComponents: Record<FilterLabel, () => JSX.Element> = {
  'Pricing Range': () => <ContentFilterprice />,
  'Color': () => <ColorSelector />,
  'Size': () => <ContentFilterprice />,
  'Rating': () => <ContentFilterprice />,
  'Category': () => <ContentFilterprice />,
};

export const HeaderFilters = () => {
  const [activeFilter, setActiveFilter] = useState<FilterLabel | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRefs = useRef<Record<FilterLabel, HTMLButtonElement | null>>({
    'Pricing Range': null,
    'Color': null,
    'Size': null,
    'Rating': null,
    'Category': null,
  });

  const handleFilterClick = (label: FilterLabel) => {
    setActiveFilter((prev) => (prev === label ? null : label));
    const button = buttonRefs.current[label];
    if (button) {
      const rect = button.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8, // Ajuste para estar justo debajo del botón
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        activeFilter &&
        position &&
        !(event.target as HTMLElement).closest('.filter-dropdown')
      ) {
        setActiveFilter(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [activeFilter, position]);

  return (
    <header className="relative z-20 flex flex-col gap-2 rounded-md bg-default-50 px-4 pb-3 pt-2 md:pt-3">
      <div className="flex items-center gap-1 md:hidden md:gap-2">
        <h2 className="text-lg font-medium">Productos</h2>
        <span className="text-sm text-default-400">(1240)</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-row gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <h2 className="text-md font-medium">Productos</h2>
            <span className="text-sm text-default-400">(1240)</span>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-start gap-2 md:justify-end -ml-2 md:ml-0">
          {filterLabels.map((label) => (
            <button
              key={label}
              ref={(el) => { buttonRefs.current[label] = el; }}
              className={`group relative inline-flex items-center justify-center px-4 h-10 min-w-20 text-sm gap-2 rounded-md border border-default-200 text-default-500 transition-opacity hover:opacity-80 ${activeFilter === label ? 'bg-gray-200' : ''}`}
              onClick={() => handleFilterClick(label)}
              type="button"
              aria-expanded={activeFilter === label}
            >
              {label}
              <HiChevronDown
                className={`w-4 h-4 ml-1 transition-transform duration-150 ${activeFilter === label ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          ))}

          <div className="relative flex items-center max-w-fit w-full">
            <select className="absolute inset-0 opacity-0" aria-hidden="true">
              <option value="most_popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price_low_to_high">Price: Low to High</option>
              <option value="price_high_to_low">Price: High to Low</option>
              <option value="top_rated">Top Rated</option>
            </select>
            <button
              className="relative inline-flex items-center px-3 h-10 rounded-md border border-default-200 shadow-sm text-sm w-full"
              type="button"
              aria-label="Sort by"
              aria-haspopup="listbox"
              aria-expanded="false"
            >
              <span className="text-default-500 truncate w-[112px]">Most Popular</span>
              <HiChevronDown className="w-4 h-4 ml-1 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>

      {activeFilter && position && (
        <div
          className="filter-dropdown absolute z-50 transition-opacity duration-300 ease-in-out bg-white shadow-lg rounded-lg p-4"
          style={{
            top: position.top,
            left: position.left,
            width: '300px', // Ajusta el ancho según sea necesario
          }}
        >
          {filterComponents[activeFilter]()}
        </div>
      )}
    </header>
  );
};
