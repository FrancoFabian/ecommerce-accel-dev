import Image from 'next/image';
import { useState } from 'react';
import { HiPlus } from 'react-icons/hi2';
interface ProductCardProps {
    title: string;
    subtitle: string;
    price: string;
    imageUrl: string;
    reviews: number;
    onAddToCart: () => void;
}

export const CardAdds: React.FC<ProductCardProps> = ({
    title,
    subtitle,
    price,
    imageUrl,
    reviews,
    onAddToCart,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative hidden w-full overflow-hidden rounded-medium shadow-small lg:block">
            {/* Gradientes superiores */}
            <div className="absolute top-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 z-10 h-32 w-full rounded-medium bg-gradient-to-b from-transparent to-black/80"></div>

            {/* Contenido superior */}
            <div className="absolute top-10 z-10 flex w-full items-start justify-between px-10">
                <h2 className="text-2xl font-medium text-white/70 [text-shadow:_0_2px_10px_rgb(0_0_0_/_20%)]">
                    {subtitle}
                </h2>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                className="text-white/80 iconify iconify--solar"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z"
                                ></path>
                            </svg>
                        ))}
                    </div>
                    <a
                        className="relative inline-flex items-center text-small underline hover:opacity-80 active:opacity-disabled transition-opacity underline-offset-4 text-white/60"
                        href="#"
                    >
                        {reviews} opiniones
                    </a>
                </div>
            </div>

            {/* Imagen */}
            <Image
                width={400}
                height={400}
                src={imageUrl}
                className={`shadow-black/5 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 absolute inset-0 z-0 h-full w-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                alt={subtitle}
                onLoad={() => setIsLoaded(true)}
            />

            {/* Contenido inferior */}
            <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between rounded-xl bg-gray-500/20 p-8 backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-medium text-white/90">{title}</h2>
                    <p className="text-white/80">{price}</p>
                </div>
                <button
                className="group relative inline-flex items-center justify-center
                px-4 py-2 text-white bg-transparent border-2 border-white 
                rounded-md hover:bg-white hover:text-black 
                transition-transform duration-200 ease-in-out"
                type="button"
                onClick={onAddToCart}
                >
                    <HiPlus className="mr-2" />
                    Añadir a la cesta
                </button>

            </div>
        </div>
    );
};
