'use client';

import { ProductCardProps } from '@/types/product';
import { useAppDispatch } from '@/store/hooks';
import { addOrIncrement } from '@/store/features/cartSlice'; 
import { FavoriteBtn } from './FavoriteBtn';
// import { StarsQualification } from './starsQualification';
import Image from 'next/image';


export const ProductCard = (props: ProductCardProps) => {
    // Encontrar el precio más alto entre todos los precios disponibles
     const dispatch = useAppDispatch();
     const {titulo, img_portada, precios, existencia, marca, modelo, categorias } =
    props;
    const highestPrice = Math.max(
        precios.precio_1,
        precios.precio_especial,
        precios.precio_descuento,
        precios.precio_lista,
        ...Object.values(precios.volumen)
    );

    return (
        <div className="relative flex flex-col 
        w-64 lg:w-64 md:w-64 sm:w-72 
        h-[20rem] lg:h-[32rem] md:h-[32rem] sm:h-[32rem] max-w-full 
        gap-3 rounded-lg bg-white p-4 shadow-md">
            <FavoriteBtn />

            {/* Image container */}
            <div className="relative w-full h-40 overflow-hidden rounded-md">
                <Image
                    src={img_portada || "/placeholder.png"}
                    alt={titulo}
                    className="cursor-pointer transition-transform duration-300 hover:scale-110"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                />
            </div>

            {/* Product information */}
            <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-emerald-500">{marca}</span>
                    <div className="flex items-center gap-2">
                        <div className="hidden lg:flex md:flex sm:flex items-center gap-1">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100">
                                <span className="text-[10px] font-medium text-blue-700">+</span>
                            </div>
                            <span className="text-xs font-medium text-gray-600">{existencia.nuevo}</span>
                        </div>
                    </div>
                </div>

                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">{titulo}</h3>

                <div className="hidden lg:flex md:flex: sm:flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">Modelo: {modelo}</p>
                </div>

                <div className="hidden lg:flex lg:flex-wrap sm:flex sm:flex-wrap md:flex md:flex-wrap gap-1">
                    {categorias && categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <span
                                key={categoria.id}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600"
                            >
                                {categoria.nombre}
                            </span>
                        ))
                    ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            Sin categoría
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold text-blue-600">${highestPrice.toFixed(2)}</p>
                    <p className="hidden lg:flex md:flex sm:flex text-xs bg-primary/20 w-fit p-1 rounded-md text-blue-800">I.V.A. Incluido</p>
                </div>

                {/* Add to cart button */}
                <button className="mt-2 w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-md
         hover:bg-blue-700 transition-colors duration-300"
         onClick={() => dispatch(addOrIncrement(props))}
         >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

