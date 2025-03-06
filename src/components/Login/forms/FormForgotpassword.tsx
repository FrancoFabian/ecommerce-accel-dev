'use client';
import { ChangeEvent, useState } from 'react';

export const FormForgotpassword = () => {
    const [email, setEmail] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <form className="w-full">
            <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                    <label 
                        className="text-sm font-bold leading-none cursor-pointer opacity-70" 
                        htmlFor="email">
                        Correo electrónico
                    </label>
                    <input 
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 
                        text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                        disabled:cursor-not-allowed disabled:opacity-50"
                        id="email" 
                        placeholder="tu@ejemplo.com" 
                        required 
                        type="email" 
                        value={email} 
                        onChange={handleInputChange} 
                    />
                </div>
            </div>
            <div className="flex items-center p-6 pt-0">
                <button 
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                    text-sm font-medium transition-colors 
                    disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-white hover:bg-slate-800 h-10 px-4 py-2 w-full"
                    type="submit">
                    Enviar Instrucciones
                </button>
            </div>
        </form>
    );
};
