'use client';
import { useState, useEffect } from "react";
import CheckmarkIcon from "./CheckmarkIcon";

interface CheckProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Check = ({ id, checked = false, onCheckedChange }: CheckProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked); // sincroniza el estado interno si viene desde fuera
  }, [checked]);

  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  return (
    <label
      htmlFor={id}
      className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2 py-4"
    >
      <span className="sr-only">
        <input
          id={id}
          aria-label="Agree to terms"
          aria-required="true"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </span>

      <span
        aria-hidden="true"
        className={`relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden 
        before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-gray-300 
        after:content-[''] after:absolute after:inset-0 after:scale-100 after:opacity-0 after:origin-center 
        ${isChecked ? 'after:scale-100 after:opacity-100' : ''}
        group-hover:before:bg-gray-100 outline-none group-focus-visible:z-10 group-focus-visible:ring-2 group-focus-visible:ring-blue-500 
        group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-white after:bg-[#111827] 
        w-4 h-4 mr-2 rounded-md before:rounded-md after:rounded-md before:transition-colors transition-transform after:transition-transform-opacity 
        after:duration-200`}
      >
        <CheckmarkIcon isChecked={isChecked} />
      </span>
    </label>
  );
};
