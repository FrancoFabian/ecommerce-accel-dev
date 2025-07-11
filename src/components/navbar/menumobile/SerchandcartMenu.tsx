'use client';
import { SearchIcon } from "@/icons/SearchIcon"
import { ShoppingCartIcon } from "@/icons/ShoppingCartIcon"
import Link from "next/link"
import { useAuth } from '@/lib/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';
import { selectCartCount } from '@/store/features/cartSlice';

export const SerchandcartMenu = () => {
    const { status, user, isLoading, isChecking } = useAuth();
    const cartCount = useAppSelector(selectCartCount);

    // Loading inicial (máximo 500ms)
    if (isLoading) {
      return (
        <ul className="flex bg-gray-100 rounded-full lg:hidden sm:hidden items-center gap-2 ml-auto">
          <li>
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <SearchIcon className="w-7 h-7 text-slate-700" />
            </button>
          </li>
          <li>
            <button className="p-2 rounded-full hover:bg-gray-100 transition relative">
              <ShoppingCartIcon className="w-8 h-8 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </li>
          <li className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></li>
        </ul>
      );
    }

    // Estado checking: mantener última UI conocida, solo mostrar opacity sutil
    const checkingClass = isChecking ? 'opacity-90 transition-opacity' : '';

    // Si está autenticado, no mostrar botones de login/registro
    if (status === 'authenticated' && user) {
      return (
        <div className={`relative ${checkingClass}`}>
          <ul className="flex bg-gray-100 rounded-full lg:hidden sm:hidden items-center gap-2 ml-auto">
            {/* Search Icon */}
            <li>
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <SearchIcon className="w-7 h-7 text-slate-700" />
              </button>
            </li>

            <li>
              <button className="p-2 rounded-full hover:bg-gray-100 transition relative">
                <Link href="metodospayment">
                  <ShoppingCartIcon className="w-8 h-8 text-slate-700" />
                </Link>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      );
    }

    // Si NO está autenticado, mostrar botones de login y registro
    return (
        <div className={checkingClass}>
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
                      <Link href="metodospayment">
                          <ShoppingCartIcon className="w-8 h-8 text-slate-700" />
                      </Link>
                      {cartCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                  </button>
              </li>

              {/* Mostrar botones de login y registro si no está autenticado */}
              {/* <li>
                <Link 
                  href="/login"
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-md transition"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link 
                  href="/signup"
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
                >
                  Registrarse
                </Link>
              </li> */}
          </ul>
        </div>
    )
}
