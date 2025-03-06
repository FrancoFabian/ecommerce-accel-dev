import { StarsQualification } from "../starsQualification";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { BtnHeart } from "./svg/BtnHeart";
import { ColorSelector } from "./minicomponents/ColorSelector";
import { SizeSelector } from "./minicomponents/SizeSelector";
import { ProductDetails } from "./minicomponents/ProductDetails";

export const EspecificacionProduct = () => {
    return (
        <div className="flex flex-col p-10">
            {/* Product Title */}
            <h1 className="text-2xl font-bold tracking-tight">Nike Air Max 270</h1>

            {/* Product Information */}
            <h2 className="sr-only">Product information</h2>

            {/* Rating */}
            <div className="my-2 flex items-center gap-2">
                {/* Aquí va el componente de calificación con SVG estrellas */}
                <StarsQualification rating={4} gaps="gap-2" />
                <p className="text-small text-default-400">669 reviews</p>
            </div>
            {/* Price */}
            <p className="text-xl font-medium tracking-tight">$80.97</p>

            {/* Product Description */}
            <div className="mt-4">
                <p className="sr-only">Product description</p>
                <p className="line-clamp-3 text-medium text-default-500">
                    The Nike Air Max 270 delivers an even more adaptive fit than before.
                    Stretch material in the upper moves with your foot, while the tri-star
                    outsole pattern adjusts to your every step for a ride that delivers
                    support and flexibility where you need it.
                </p>
            </div>

            {/* Color Selector */}
            <div className="relative flex flex-col gap-2 ml-1 mt-6" role="radiogroup" aria-orientation="horizontal">
                <ColorSelector />
            </div>


            {/* Free Shipping Info */}
            <div className="mt-6 flex flex-col gap-1">
                <div className="mb-4 flex items-center gap-2 text-default-700">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--carbon" width="24" height="24" viewBox="0 0 32 32">
                        <path fill="currentColor" d="M4 16h12v2H4zm-2-5h10v2H2z"></path>
                        <path fill="currentColor" d="m29.919 16.606l-3-7A1 1 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A4 4 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a1 1 0 0 0-.081-.394M9 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2m14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2 2 0 0 1-2 2m5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z"></path>
                    </svg>
                    <p className="text-small font-medium">Free shipping and 30 days return</p>
                </div>
            </div>

            {/* Size Selector */}
            <div className="relative flex flex-col gap-1" aria-label="Select size" role="radiogroup" aria-orientation="horizontal">
                <SizeSelector />
            </div>
             <ProductDetails />

            {/* Action Buttons */}
            <div className="mt-2 flex gap-2">
                {/* Add to Cart Button */}
                <button className="z-0 group relative inline-flex items-center justify-center box-border select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none px-6 min-w-24 h-12 gap-3 rounded-lg w-full transition-transform-colors-opacity bg-primary hover:bg-primary/80 text-white text-medium font-medium">
                    <HiMiniShoppingCart className="w-5 h-5" />
                    Añadir al carrito
                </button>

                {/* Wishlist Button */}
                <BtnHeart />
            </div>
        </div>
    );
};