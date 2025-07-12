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
    const { isLoading, isChecking, isHydrated, isAuthenticated } = useAuth();

    // Estado checking: mantener última UI conocida, solo mostrar opacity sutil
    const checkingClass = isChecking ? 'opacity-90 transition-opacity' : '';

    // ✅ STRUCTURE CONSISTENTE: Siempre renderizar la misma estructura base
    return (
        <div className={`relative ${checkingClass}`}>
            <ul className="hidden sm:flex items-center gap-2 ml-auto">
                {/* Search Icon - siempre visible */}
                <li>
                    <button 
                        ref={searchMenuButtonRef}
                        onClick={toggleSearchMenu}
                        className="p-2 rounded-full hover:bg-gray-100 transition">
                        <SearchIcon className="w-4 h-4" color={isHydrated ? "#020202" : "gray"} />
                    </button>
                </li>

                {/* Cart Icon - siempre visible */}
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

                {/* ✅ CONDITIONAL CONTENT: Misma estructura, diferente contenido */}
                {!isHydrated || isLoading ? (
                    // Estado de carga - mantener estructura
                    <li className="w-[50px] h-[50px] rounded-full bg-gray-200 animate-pulse"></li>
                ) : isAuthenticated ? (
                    // Usuario autenticado - mostrar notificaciones y avatar
                    <>
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
                    </>
                ) : (
                    // Usuario no autenticado - mostrar botones de auth
                    <>
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
                    </>
                )}
            </ul>
        </div>
    );
}