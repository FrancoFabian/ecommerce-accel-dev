'use client';
import { useState, useEffect } from "react";
import { PasswordSvg } from "./PasswordSvg";
import { NoVisiblePass } from "./NoVisblePass";

interface InputProps {
  id?: string;
  nameInput: string;
  type: string;
  placeholder: string;
  isPassword?: boolean;
  onChange: (value: string) => void;
  value?: string;
  enablePasswordStrength?: boolean;
  compareToPassword?: string; // Used for confirmation input
}

export const InputForPassword = ({
  id,
  nameInput,
  type,
  placeholder,
  isPassword = false,
  onChange,
  value = "",
  enablePasswordStrength = false,
  compareToPassword,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (enablePasswordStrength && isPassword) {
      // Calculate password strength
      if (value.length === 0) {
        setPasswordStrength("");
      } else if (value.length < 8) {
        setPasswordStrength("débil");
      } else if (value.length < 12) {
        setPasswordStrength("media");
      } else {
        setPasswordStrength("fuerte");
      }
    }

    if (compareToPassword !== undefined) {
      setPasswordsMatch(value === compareToPassword || compareToPassword.length === 0);
    }
  }, [value, enablePasswordStrength, compareToPassword, isPassword]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "débil":
        return "bg-red-500";
      case "media":
        return "bg-yellow-500";
      case "fuerte":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getPasswordStrengthWidth = () => {
    switch (passwordStrength) {
      case "débil":
        return "w-1/3";
      case "media":
        return "w-2/3";
      case "fuerte":
        return "w-full";
      default:
        return "w-0";
    }
  };

  return (
    <div className="relative w-full flex flex-col py-2  
    sm:py-0 md:py-0 lg:py-0 2xl:py-2">
    <label
      htmlFor={id}
      className="w-[300px] absolute text-lg z-10 text-gray-700 -left-4 translate-y-1 
      sm:translate-y-0 md:translate-y-0 2xl:translate-y-1
                 scale-75 pointer-events-none flex"
    >
      {nameInput}
      <span className="text-pink-500 ml-1">*</span>
    </label>

    {/* Contenedor principal del input */}
    <div className="relative w-full">
      <input
        id={id}
        type={isPassword && showPassword ? "text" : type}
        name={nameInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={isPassword ? "on" : "off"}
        required
        className={`w-full px-5 pt-4 border-[2px] h-16 md:h-12 sm:h-12 lg:h-12 2xl:h-16 bg-transparent border-gray-300 
                    rounded-lg text-lg lg:text-[0.999rem] md:text-[0.999rem] sm:text-[0.999rem] 2xl:text-lg
                     focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-500`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 text-2xl transform -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? (
            <NoVisiblePass className="text-gray-400" />
          ) : (
            <PasswordSvg className="text-gray-400" />
          )}
        </button>
      )}
    </div>

    {/* Indicador de fortaleza de contraseña */}
    {enablePasswordStrength && passwordStrength && (
      <div className="w-full mt-2">
        <div className="flex justify-between mb-1">
          
          <span
            className={`text-sm font-medium ${
              passwordStrength === "débil"
                ? "text-red-500"
                : passwordStrength === "media"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {passwordStrength}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()} ${getPasswordStrengthWidth()}`}
          ></div>
        </div>
      </div>
    )}

    {/* Advertencia: Las contraseñas no coinciden */}
    {compareToPassword !== undefined && !passwordsMatch && (
      <p className="text-danger text-sm  mt-3">Las contraseñas no coinciden</p>
    )}
  </div>
  );
};
