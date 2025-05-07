
import { CartItemMod } from "./CartItems/cartItemmod";
import { Quicksand } from "next/font/google";
import './CartItems/styles.css'
import { FaWhatsapp } from "react-icons/fa";

const quickSans = Quicksand({ subsets: ["latin"] });
interface Item {
    imageSrc: string;
    name: string;
    color: string;
    size: number;
    price: number;
    quantity: number;
}

export const Cart = () => {
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
            imageSrc: 'https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/4.png', // Reemplaza con una URL de imagen real
            name: 'Sandalias de playa',
            color: 'amarillo',
            size: 40,
            price: 29.99,
            quantity: 3,
        },
    ];

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
                    <CartItemMod key={item.imageSrc} {...item} />
                ))}
            </ul>
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between">
                <dt className="text-md font-semibold text-gray-700">Total</dt>
                <dd className="text-xl font-semibold text-gray-700">$172.96</dd>
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

