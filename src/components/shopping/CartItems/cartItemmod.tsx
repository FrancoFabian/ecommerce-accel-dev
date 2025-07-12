import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";
import type { CartItem } from "@/store/features/cartSlice"; 
interface CartItemModProps extends CartItem {
  onRemove: () => void;
  onInc: () => void;
  onDec: () => void;
}
export const CartItemMod = ({ img_portada,
  titulo,
  // marca,
  precios,
  quantity,
  onRemove,
  // onInc,
  // onDec, 
}: CartItemModProps) => {
  return (
    <li className="flex items-center gap-x-4 border-b border-gray-200 py-2 last:border-b-0">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center">
        <Image
          width={56}  
          height={56}
          src={img_portada}
          alt={titulo}
          className="rounded-lg"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h4 className="text-xs font-semibold">{titulo}</h4>
        {/* <div className="flex items-center gap-3">
          <p className="text-[11px] text-gray-600">Color: <span className="font-semibold capitalize">{color}</span></p>
          <p className="text-[11px] text-gray-600">Talla: <span className="font-semibold">{size}</span></p>
        </div> */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">${precios.precio_1}</span>
          <span className="text-sm text-gray-500">x{quantity}</span>
        </div>
      </div>
      <button className="flex justify-center items-center h-7 w-7 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
      onClick={onRemove}
      >
        <HiMiniXMark size={20} />
      </button>
    </li>
  );
}
