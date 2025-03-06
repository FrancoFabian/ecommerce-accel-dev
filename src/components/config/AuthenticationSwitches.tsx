'use client';
import { useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";

interface FactorAuthentication {
    name: string;
    description: string;
  }
  
  export const AuthenticationSwitches = ({ name, description }: FactorAuthentication) => {
    const [isEnabled, setIsEnabled] = useState(false);
  
    const handleToggle = () => {
      setIsEnabled(!isEnabled);
    };
  
    return (
      <div
        className="touch-auto tap-highlight-transparent inline-flex 
        bg-gray-100 flex-row-reverse w-full lg:w-[48%] sm:w-[48%] items-center 
        transition-all duration-700 ease-in-out
        lg:h-[120px] sm:h-[150px]
        justify-between cursor-pointer
        rounded-lg gap-2 p-4"
      >
        <ToggleSwitch isEnabled={isEnabled} onToggle={handleToggle} />
        <div className="relative text-foreground select-none text-md">
          <div className="flex flex-col">
            <p className="text-gray-600 font-semibold">{name}</p>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    );
  };
  