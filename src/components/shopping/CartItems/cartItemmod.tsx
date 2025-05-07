import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";
interface Item {
    imageSrc: string;
    name: string;
    color: string;
    size: number;
    price: number;
    quantity: number;
}
export const CartItemMod = ({ imageSrc, name, color, size, price, quantity }: Item) => {
  return (
    <li className="flex items-center gap-x-4 border-b border-gray-200 py-2 last:border-b-0">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <Image
          width={56}  
          height={56}
          src={imageSrc}
          alt={name}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h4 className="text-xs font-semibold">{name}</h4>
        <div className="flex items-center gap-3">
          <p className="text-[11px] text-gray-600">Color: <span className="font-semibold capitalize">{color}</span></p>
          <p className="text-[11px] text-gray-600">Talla: <span className="font-semibold">{size}</span></p>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">${price}</span>
          <span className="text-sm text-gray-500">x{quantity}</span>
        </div>
      </div>
      <button className="flex justify-center items-center h-7 w-7 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
        <HiMiniXMark size={20} />
      </button>
    </li>
  );
}
