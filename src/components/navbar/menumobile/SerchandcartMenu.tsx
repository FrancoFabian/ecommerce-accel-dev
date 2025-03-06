import { SearchIcon } from "@/icons/SearchIcon"
import { ShoppingCartIcon } from "@/icons/ShoppingCartIcon"
import Link from "next/link"



export const SerchandcartMenu = () => {
    return (
        <ul className="flex bg-gray-100 rounded-full lg:hidden sm:hidden items-center gap-2 ml-auto">
            {/* Search Icon */}
            <li>
                <button
                    className="p-2 rounded-full hover:bg-gray-100 transition">
                    <SearchIcon className="w-7 h-7 text-slate-700" />
                </button>
            </li>

            <li>
                <button

                    className="p-2 rounded-full hover:bg-gray-100 transition relative"
                >
                    <Link

                        href="metodospayment"
                    >
                        <ShoppingCartIcon className="w-8 h-8 text-slate-700" />
                    </Link>
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                        5
                    </span>
                </button>
            </li>

        </ul>
    )
}
