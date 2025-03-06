'use client'
import { useState, useRef, useEffect } from 'react';
import { GoChevronRight } from 'react-icons/go';
import { AiOutlineCheck } from 'react-icons/ai';
interface Option {
    key: string;
    label: string;
  }
  
  interface DropdownProps {
    options: Option[];
    selectedKey: string;
    onSelect: (key: string) => void;
  }
  
  export const Dropdown = ({ options, selectedKey, onSelect }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const toggleDropdown = () => {
      setIsOpen((prev) => !prev);
    };
  
    const handleSelect = (key: string) => {
      onSelect(key);
      setIsOpen(false);
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
  
    const selectedOption = options.find((option) => option.key === selectedKey);
  
    return (
      <div className="relative inline-block w-[25%]" ref={dropdownRef}>
        <button
          data-slot="trigger"
          className="relative w-full inline-flex items-center justify-between shadow-sm outline-none tap-highlight-transparent border border-gray-300 hover:border-gray-400 h-10 rounded-full px-4 transition-colors"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          <div data-slot="innerWrapper" className="inline-flex items-center gap-1.5 w-full">
            <span
              data-slot="value"
              className="text-gray-500 font-normal w-full text-left text-small truncate"
            >
              {selectedOption?.label}
            </span>
          </div>
          <GoChevronRight
            className={`w-4 h-4 transition-transform duration-150 ${
              isOpen ? 'transform rotate-90' : ''
            }`}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <div
            data-slot="base"
            role="dialog"
            className="absolute mt-1 w-full rounded-lg bg-white shadow-lg z-10"
          >
            <div
              data-slot="content"
              className="overflow-y-auto max-h-64 w-full py-1"
              role="listbox"
            >
              <ul className="flex flex-col">
                {options.map((option) => (
                  <li
                    key={option.key}
                    role="option"
                    aria-selected={selectedKey === option.key}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedKey === option.key ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleSelect(option.key)}
                  >
                    <span>{option.label}</span>
                    {selectedKey === option.key && (
                      <AiOutlineCheck className="w-4 h-4 flex-shrink-0 text-current" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };


