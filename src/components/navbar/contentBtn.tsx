'use client'
import { useState } from 'react';
import { HiMiniShoppingBag } from "react-icons/hi2"
import { Cart } from '../shopping/storeCartmod';

export const ContentBtn = () => {
    const [showCart, setShowCart] = useState(false); // Estado para controlar la visibilidad del carrito

    const toggleCart = () => {
        setShowCart(!showCart);
    };
    return (
        <div className="flex justify-center items-center w-1/4 space-x-2">
            <button className="text-lg px-2 py-2 rounded-[8px] text-gray-900 border border-solid border-[#101219] font-medium transition-colors duration-200">
                Acceso
            </button>
            <button className="text-lg px-2 py-2 rounded-[8px] text-gray-900 border border-solid border-[#101219] font-medium transition-colors duration-200">
                Contacto
            </button>
            <button className="text-lg px-2 py-2 rounded-[8px] text-white bg-gray-900  font-medium transition-colors duration-200">
                Inscribirse
            </button>
            <button
                className="text-lg px-2 py-2 rounded-[8px] cursor-pointer font-medium transition-colors duration-200"
                onClick={toggleCart}
            >
                <HiMiniShoppingBag size={30} />
                <div className="flex justify-center items-center absolute translate-y-[-40px] translate-x-[20px] w-5 h-5 bg-red-700 rounded-full text-white">1</div>
            </button>

            {showCart && <Cart />} {/* Mostrar el componente Cart si showCart es true */}


        </div>
    )
}
