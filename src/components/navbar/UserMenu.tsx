'use client';
import { useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/features/cartSlice';
import { NotificationIcon } from "@/icons/NotificationIcon";
import { SearchIcon } from "@/icons/SearchIcon";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi2";
import { useAuth } from '@/lib/hooks/useAuth';
import Link from 'next/link';

type UserMenuProps = {
    toggleNotifications: () => void;
    toggleMenuUser: () => void;
    toggleCartMenu: () => void;
    toggleSearchMenu: () => void;
    notificationsButtonRef: React.RefObject<HTMLButtonElement | null>;
    userMenuButtonRef: React.RefObject<HTMLButtonElement | null>;
    cartMenuButtonRef: React.RefObject<HTMLButtonElement | null>;
    searchMenuButtonRef: React.RefObject<HTMLButtonElement | null>;
};

export const UserMenu = ({
    toggleNotifications,
    toggleMenuUser,
    toggleCartMenu,
    toggleSearchMenu,
    notificationsButtonRef,
    userMenuButtonRef,
    cartMenuButtonRef,
    searchMenuButtonRef,
}: UserMenuProps) => {
    const cartCount = useAppSelector(selectCartCount);
    const { status, user, isLoading, isChecking } = useAuth();

    // Loading inicial (máximo 500ms)
    if (isLoading) {
        return (
            <ul className="hidden lg:flex sm:flex items-center gap-2 ml-auto">
                <li>
                    <button 
                        ref={searchMenuButtonRef}
                        onClick={toggleSearchMenu}
                        className="p-2 rounded-full hover:bg-gray-100 transition">
                        <SearchIcon className="w-4 h-4" color="gray" />
                    </button>
                </li>
                <li>
                    <button
                        ref={cartMenuButtonRef}
                        onClick={toggleCartMenu}
                        className="p-2 rounded-full hover:bg-gray-100 transition relative"
                    >
                        <HiShoppingCart className="w-6 h-6" color="black" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </li>
                <li className="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse"></li>
            </ul>
        );
    }

    // Estado checking: mantener última UI conocida, solo mostrar opacity sutil
    const checkingClass = isChecking ? 'opacity-90 transition-opacity' : '';

    if (status === 'authenticated' && user) {
        return (
            <div className={`relative ${checkingClass}`}>
                {/* LAYOUT AUTENTICADO: gap normal, iconos compactos */}
                <ul className="hidden lg:flex sm:flex items-center gap-2 ml-auto">
                    {/* Search Icon */}
                    <li>
                        <button 
                            ref={searchMenuButtonRef}
                            onClick={toggleSearchMenu}
                            className="p-2 rounded-full hover:bg-gray-100 transition">
                            <SearchIcon className="w-4 h-4" color="gray" />
                        </button>
                    </li>

                    <li>
                        <button
                            ref={cartMenuButtonRef}
                            onClick={toggleCartMenu}
                            className="p-2 rounded-full hover:bg-gray-100 transition relative"
                        >
                            <HiShoppingCart className="w-6 h-6" color="black" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </li>

                    {/* Mostrar notificaciones solo si está autenticado */}
                    <li>
                        <button
                            ref={notificationsButtonRef}
                            onClick={toggleNotifications}
                            className="p-2 rounded-full hover:bg-gray-100 transition relative"
                        >
                            <NotificationIcon className="w-6 h-6" color="gray" />
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                                5
                            </span>
                        </button>
                    </li>

                    {/* Mostrar avatar del usuario solo si está autenticado */}
                    <li>
                        <button 
                            ref={userMenuButtonRef}
                            onClick={toggleMenuUser}
                            className="p-2 w-[50px] h-[50px] rounded-full hover:bg-gray-100 transition">
                            <Image
                                src="https://i.pravatar.cc/150?u=a04258114e29526708c"
                                alt="User Avatar"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    // LAYOUT NO AUTENTICADO: Solo mostrar botones de auth en DESKTOP (lg)
    return (
        <div className={checkingClass}>
            {/* 
                DESDE 640px HACIA ARRIBA: Search + Cart + Botones de Auth
                - hidden sm:flex = oculto por defecto, visible desde sm (640px+)
                - En móvil (639px y menos) NO aparecen los botones de auth
            */}
            <ul className="hidden sm:flex items-center gap-1 ml-auto">
                {/* Search Icon */}
                <li>
                    <button 
                        ref={searchMenuButtonRef}
                        onClick={toggleSearchMenu}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition">
                        <SearchIcon className="w-4 h-4" color="gray" />
                    </button>
                </li>

                {/* Cart Icon */}
                <li>
                    <button
                        ref={cartMenuButtonRef}
                        onClick={toggleCartMenu}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition relative"
                    >
                        <HiShoppingCart className="w-5 h-5" color="black" />
                        {cartCount > 0 && (
                            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </li>

                {/* BOTONES DE AUTH - Solo en Desktop */}
                <li>
                    <Link 
                        href="/login"
                        className="px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-gray-100 rounded-md transition whitespace-nowrap"
                    >
                        Iniciar sesión
                    </Link>
                </li>
                
                <li>
                    <Link 
                        href="/signup"
                        className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition whitespace-nowrap"
                    >
                        Registrarse
                    </Link>
                </li>
            </ul>

            {/* 
                MÓVIL (639px y menos): Solo Search + Cart
                - flex sm:hidden = visible por defecto, oculto desde sm (640px+)
                - NO hay botones de auth en estas dimensiones
            */}
            <ul className="flex sm:hidden items-center gap-2 ml-auto">
                {/* Search Icon */}
                <li>
                    <button 
                        ref={searchMenuButtonRef}
                        onClick={toggleSearchMenu}
                        className="p-2 rounded-full hover:bg-gray-100 transition">
                        <SearchIcon className="w-4 h-4" color="gray" />
                    </button>
                </li>

                {/* Cart Icon */}
                <li>
                    <button
                        ref={cartMenuButtonRef}
                        onClick={toggleCartMenu}
                        className="p-2 rounded-full hover:bg-gray-100 transition relative"
                    >
                        <HiShoppingCart className="w-6 h-6" color="black" />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </li>
                {/* 
                    NO HAY BOTONES DE AUTH AQUÍ
                    El usuario tendrá que ir al menú móvil o acceder desde otra forma
                */}
            </ul>
        </div>
    );
}