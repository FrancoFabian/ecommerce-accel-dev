'use client';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectCartItems,
  selectCartTotal,
  decrement,
  addOrIncrement,
  remove,
} from '@/store/features/cartSlice';
import { CartItemMod } from "./CartItems/cartItemmod";
import { Quicksand } from "next/font/google";
import './CartItems/styles.css'
import { FaWhatsapp } from "react-icons/fa";

const quickSans = Quicksand({ subsets: ["latin"] });


export const Cart = () => {
      const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

    return (
        <div className={`w-full h-auto rounded-md bg-white py-6 px-3
        shadow-lg 
        lg:flex-none ${quickSans.className}`}
        >
            <h2 className="font-semibold  text-gray-600 text-md pb-3">Su pedido</h2>
            <hr className=" border-gray-200 top-4" />
            <div
                className="w-[92.8%] h-[40px]"
                style={{ 
                    position: 'absolute',
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.678) 100%)',
                }}
            >
                {/* Contenido del div */}
            </div>
            <ul className="pr-2 overflow-y-auto" style={{ maxHeight: '15.5rem' }}>
                {items.map((item) => (
                     <CartItemMod
            key={item.producto_id}
            {...item}
            onRemove={() => dispatch(remove(item.producto_id))}
            onInc={() => dispatch(addOrIncrement(item))}
            onDec={() => dispatch(decrement(item.producto_id))}
          />
                ))}
            </ul>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between">
                <dt className="text-md font-semibold text-gray-700">Total</dt>
                <dd className="text-xl font-semibold text-gray-700">${total.toFixed(2)}</dd>
            </div>
            <button className="mt-4 w-full px-6 py-3 bg-blue-600 hover:bg-bluell-500 font-semibold text-white rounded-xl">
                Continuar compra
            </button>
            <button className="mt-4 w-full px-6 py-2 bg-gray-100 hover:bg-teal-500/30 hover:text-teal-700 text-gray-400 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
    Cotizar por WhatsApp 
    <FaWhatsapp className="text-3xl" />
</button>

        </div>
    );
}

