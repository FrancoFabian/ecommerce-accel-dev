'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3, HiOutlineHome, HiOutlineUser } from "react-icons/hi2";
import { MdApps } from "react-icons/md";
import { useAuth } from '@/lib/hooks/useAuth';
import Image from "next/image";

const links = [
  {
    name: "Inicio",
    href: "/",
    icon: HiOutlineHome,
  },
  {
    name: "Categorias",
    href: "/categorias",
    icon: MdApps,
  },
  {
    name: "Mi cuenta",
    href: "/micuenta",
    icon: HiOutlineUser,
  },
  {
    name: "Menu",
    href: "/menu",
    icon: HiBars3,
  },
];

export const NavMobile = () => {
  const pathname = usePathname();
  const { isHydrated, isAuthenticated } = useAuth();

  return (
    <div
      className="lg:hidden md:hidden sm:hidden flex border-t-2 border-gray-100     
     w-full h-fit bottom-0 bg-white py-2
    fixed z-50 justify-center items-center"
    >
      {links.map((link, index) => {
        const isActive = pathname === link.href;

        // Renderizar el icono de "Mi cuenta" de manera especial
        if (link.name === "Mi cuenta") {
          return (
            <Link
              key={index}
              href={link.href}
              className={`w-1/4 font-semibold flex flex-col items-center justify-center text-sm ${
                isActive ? "text-primary" : "text-slate-500"
              }`}
            >
              {!isHydrated ? (
                // ✅ Estado de carga durante hidratación
                <div className="mt-1 w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
              ) : isAuthenticated ? (
                // Mostrar foto del usuario si está autenticado
                <div className="mt-1">
                  <Image
                    src="https://i.pravatar.cc/150?u=a04258114e29526708c"
                    alt="User Avatar"
                    width={24}
                    height={24}
                    className={`w-6 h-6 rounded-full object-cover ${
                      isActive ? "ring-2 ring-primary" : ""
                    }`}
                  />
                </div>
              ) : (
                // Mostrar icono por defecto si no está autenticado
                <link.icon
                  className={`h-6 w-6 mt-1 ${
                    isActive ? "text-primary" : "text-slate-500"
                  }`}
                />
              )}
              {link.name}
            </Link>
          );
        }

        // Renderizar otros enlaces normalmente
        return (
          <Link
            key={index}
            href={link.href}
            className={`w-1/4 font-semibold flex flex-col items-center justify-center text-sm ${
              isActive ? "text-primary" : "text-slate-500"
            }`}
          >
            <link.icon
              className={`h-6 w-6 mt-1 ${
                isActive ? "text-primary" : "text-slate-500"
              }`}
            />
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};