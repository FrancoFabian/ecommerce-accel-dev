'use client'
import { useState } from "react";

interface FactorAuthentication{
  name: string;
  description: string;
}

export const FactorAuthentication = ({name, description}: FactorAuthentication) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = () => {
    setIsEnabled(!isEnabled);
  };
  

  return (
    <label
      className="relative touch-manipulation tap-highlight-transparent inline-flex 
      bg-gray-100 flex-row-reverse w-auto max-w-full items-center justify-between cursor-pointer 
      rounded-lg gap-2 p-4"
      data-selected={isEnabled}
     
    >
      <span
        style={{
          border: "0px",
          clip: "rect(0px, 0px, 0px, 0px)",
          clipPath: "inset(50%)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: "0px",
          position: "absolute",
          width: "1px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        <input
          aria-labelledby=":r0:"
          role="switch"
          type="checkbox"
          checked={isEnabled}
          onChange={handleToggle}
        />
      </span>
      <span
        aria-hidden="true"
        className={`px-1 relative inline-flex items-center justify-start
           flex-shrink-0 overflow-hidden bg-gray-300 rounded-full outline-none
            group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 
            group-data-[focus-visible=true]:ring-focus 
            group-data-[focus-visible=true]:ring-offset-2
             group-data-[focus-visible=true]:ring-offset-background ${
          isEnabled
            ? "group-data-[selected=true]:bg-primary group-data-[selected=true]:text-primary-foreground"
            : ""
        } w-12 h-7 mr-2 rtl:ml-2 rtl:mr-[unset] transition-background`}
      >
        <span
          className={`z-10 flex items-center justify-center bg-white shadow-lg rounded-full ${
            isEnabled ? "origin-right group-data-[selected=true]:ml-5" : ""
          } w-5 h-5 text-small transition-all ${
            isEnabled ? "group-data-[pressed=true]:w-6 group-data-[selected]:group-data-[pressed]:ml-4" : ""
          }`}
        ></span>
      </span>
      <span id=":r0:" className="relative text-foreground select-none text-medium">
        <div className="flex flex-col">
          <p className="text-medium font-semibold">{name}</p>
          <p className="text-small text-default-500">
           {description}
          </p>
        </div>
      </span>
    </label>
  );
};


