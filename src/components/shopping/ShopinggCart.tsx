'use client';
import { useState } from 'react';
import { CartItemMod } from "./CartItems/cartItemmod";
import { Quicksand } from "next/font/google";
import { Desglose } from "./CartItems/desglose";
import './CartItems/styles.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    selectCartItems,
    selectCartTotal,
    selectCartCount,
    decrement,
    addOrIncrement,
    remove,
  } from '@/store/features/cartSlice';

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
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    
    
    const items = useAppSelector(selectCartItems);  
    const [couponCode, setCouponCode] = useState('');

    const handleApplyCoupon = () => {
        // Lógica para aplicar el código de cupón
        console.log('Código de cupón aplicado:', couponCode);
    };
    const handleRemove = (productId: string) => {
        setActionLoading(productId);
        setTimeout(() => {
          dispatch(remove(productId));
          setActionLoading(null);
        }, 150);
    };
    
    const handleIncrement = (item: any) => {
        setActionLoading(item.producto_id);
        setTimeout(() => {
          dispatch(addOrIncrement(item));
          setActionLoading(null);
        }, 100);
    };

    const handleDecrement = (productId: string) => {
        setActionLoading(productId);
        setTimeout(() => {
          dispatch(decrement(productId));
          setActionLoading(null);
        }, 100);
    };

    return (
        <div className={`w-full  px-3
            lg:flex-none ${quickSans.className}`}
        >
           
            <ul className="pr-2" >
                {items.map((item) => (
                    <CartItemMod 
                    key={item.producto_id}
                    {...item}
                    onRemove={() => handleRemove(item.producto_id)}
                    onInc={() => handleIncrement(item)}
                    onDec={() => handleDecrement(item.producto_id)}
                    isLoading={actionLoading === item.producto_id}
                    maxQuantity={50}
                    />
                ))}
            </ul>

            <div className="mt-6 flex items-end gap-2">
                <div className="w-full flex flex-wrap">
                    <label className="w-full top-2 left-3 -translate-y-1/2 text-gray-700 text-sm">
                        Código de cupón
                    </label>
                    <input
                        type="text"
                        placeholder="Introducir código"
                        className="w-full px-3 py-2 border bg-inputfound border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                </div>
                <button
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md cursor-pointer"
                    onClick={handleApplyCoupon}
                >
                    Aplicar
                </button>
            </div>

            <Desglose />
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between">
                <dt className="text-sm font-semibold text-gray-700">Total</dt>
                <dd className="text-sm font-semibold text-gray-700">$172.96</dd>
            </div>
        </div>
    );
};
