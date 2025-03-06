'use client';
import { useState } from "react";
import CheckmarkIcon from "./CheckmarkIcon";
import Link from "next/link";

export const TermsCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="">
      <label

        className="group relative max-w-fit inline-flex items-center justify-start 
   cursor-pointer tap-highlight-transparent p-2 -m-2 py-4">
        <span className="sr-only">
          <input

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
      <span className="relative text-gray-700 select-none text-[12px] transition-colors">
        Estoy de acuerdo con los&nbsp;
        <Link
          className="relative inline-flex items-center tap-highlight-transparent outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-500 
     focus-visible:outline-offset-2  text-blue-500 no-underline hover:opacity-80 transition-opacity"
          href="#"
          role="link"
        >
          Terminos
        </Link>
        &nbsp;y la&nbsp;
        <Link
          className="relative inline-flex items-center tap-highlight-transparent outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-blue-500 
     focus-visible:outline-offset-2  text-blue-500 no-underline hover:opacity-80 transition-opacity"
          href="#"
          role="link"
        >
          Politica de Privacidad
        </Link>
      </span>
    </div>

  );
};
