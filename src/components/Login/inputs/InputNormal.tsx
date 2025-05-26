'use client';
import React, { ChangeEvent, useState } from "react";
import { PasswordSvg } from "./PasswordSvg";
import { NoVisiblePass } from "./NoVisblePass";

interface InputProps {
    nameInput: string;
    name: string;
    type: string;
    placeholder: string;
    isPassword?: boolean;
    onChange: (value:string)=>void;
    value?:string;
    label?:boolean
    Icon?:React.FC<React.SVGProps<SVGSVGElement>>
}

export const InputNormal = ({ nameInput, name, type, placeholder, isPassword = false ,onChange,value,label = true, Icon = undefined}:InputProps) => {
 
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative w-full h-20 md:h-12 sm:h-12 lg:h-12 2xl:h-20
         inline-flex flex-col tap-highlight-transparent justify-center gap-0 py-2 sm:py-0 md:py-0 lg:py-0 2xl:py-2">
            {label && <label
                htmlFor={name}
                className="w-[300px] absolute text-lg z-10 text-gray-700 -left-4 -translate-y-3
                 scale-75 pointer-events-none flex items-center"
            >
                {nameInput}
                <span className="text-pink-500 ml-1">*</span>
            </label>}

            {!isPassword ? (
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    className={`w-full px-5 ${label ? 'pt-4':'pt-0'} border-[2px] h-28 bg-transparent border-gray-300 
                    rounded-lg text-lg lg:text-[0.999rem] md:text-[0.999rem] sm:text-[0.999rem] 2xl:text-lg focus:outline-none focus:ring-2 
                    focus:ring-transparent focus:border-gray-500`}
                />
            ) : (
                <input
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoComplete="on"
                    required
                    className="w-full px-5 pt-4 border-[2px] h-28 bg-transparent border-gray-300 
                    rounded-lg text-lg lg:text-[0.999rem] md:text-[0.999rem] sm:text-[0.999rem] 2xl:text-lg focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500"
                />
            )}

            {isPassword && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 text-2xl transform -translate-y-1/2 cursor-pointer text-gray-600"
                >
                    {showPassword
                        ? <NoVisiblePass className="text-gray-400" />
                        : <PasswordSvg className="text-gray-400" />
                    }
                </button>
            )}

            {Icon && (
                <button
                    type="button"
                    className="absolute right-4 top-1/2 text-2xl transform -translate-y-1/2 text-gray-600"
                >
                    <Icon className="w-8 h-8 text-gray-300" />
                </button>
            )}
        </div>
    );
};
