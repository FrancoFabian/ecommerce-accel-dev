'use client';

import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';

export const TwoFactorAuthInput= () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    pastedData.split('').forEach((char, index) => {
      if (index < 6 && !isNaN(Number(char))) {
        newCode[index] = char;
      }
    });
    setCode(newCode);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    console.log('Código enviado:', fullCode);
    // Lógica para enviar el código al servidor
  };

  return (
    <div className="w-full max-w-md mx-auto  bg-white   overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Verificación de dos factores</h2>
        <p className="text-center text-gray-600 mb-6">
          Ingresa el código de 6 dígitos enviado a tu correo electrónico
        </p>
        <div className="flex justify-between mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none"
            />
          ))}
        </div>
        <button 
          onClick={handleSubmit} 
          className={`w-full py-2 px-4 bg-slate-900 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 transition-colors ${
            code.some(digit => digit === '') ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={code.some(digit => digit === '')}
        >
          Verificar
        </button>
      </div>
    </div>
  );
};

export default TwoFactorAuthInput;

