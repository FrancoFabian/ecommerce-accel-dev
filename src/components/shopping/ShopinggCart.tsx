'use client';
import { useState } from 'react';
import { CartItemMod } from "./CartItems/cartItemmod";
import { Quicksand } from "next/font/google";
import { Desglose } from "./CartItems/desglose";
import './CartItems/styles.css';

const quickSans = Quicksand({ subsets: ["latin"] });

interface Item {
    imageSrc: string;
    name: string;
    color: string;
    size: number;
    price: number;
    quantity: number;
}

export const ShopinggCart = () => {
    const items: Item[] = [
        {
            imageSrc: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/1.png',
            name: 'Zapatillas de entrenamiento',
            color: 'negro',
            size: 42,
            price: 49.99,
            quantity: 1,
        },
        {
            imageSrc: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/2.png',
            name: 'Zapatillas para correr',
            color: 'rojo',
            size: 41,
            price: 39.99,
            quantity: 2,
        },
        {
            imageSrc: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/3.png',
            name: 'Zapatillas de baloncesto',
            color: 'azul',
            size: 43,
            price: 59.99,
            quantity: 1,
        },
        {
            imageSrc: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/4.png',
            name: 'Sandalias de playa',
            color: 'amarillo',
            size: 40,
            price: 29.99,
            quantity: 3,
        },
    ];

    const [couponCode, setCouponCode] = useState('');

    const handleApplyCoupon = () => {
        // Lógica para aplicar el código de cupón
        console.log('Código de cupón aplicado:', couponCode);
    };

    return (
        <div className={`w-full  px-3
             dark:bg-gray-800 
            lg:flex-none ${quickSans.className}`}
        >
           
            <ul className="pr-2" >
                {items.map((item) => (
                    <CartItemMod key={item.imageSrc} {...item} />
                ))}
            </ul>

            <div className="mt-6 flex items-end gap-2">
                <div className="w-full flex flex-wrap">
                    <label className="w-full top-2 left-3 -translate-y-1/2 text-gray-700 text-sm dark:text-gray-400">
                        Código de cupón
                    </label>
                    <input
                        type="text"
                        placeholder="Introducir código"
                        className="w-full px-3 py-2 border bg-[#e7e9f4] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                </div>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
                    onClick={handleApplyCoupon}
                >
                    Aplicar
                </button>
            </div>

            <Desglose />
            <hr className="my-2 border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between">
                <dt className="text-sm font-semibold text-gray-700">Total</dt>
                <dd className="text-sm font-semibold text-gray-700">$172.96</dd>
            </div>
        </div>
    );
};
