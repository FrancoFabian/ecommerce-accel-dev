'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3, HiOutlineHome, HiOutlineUser } from "react-icons/hi2";
import { MdApps } from "react-icons/md";

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
  const pathname = usePathname(); // Obtiene la URL actual

  return (
    <div
      className="lg:hidden md:hidden sm:hidden flex border-t-2 border-gray-100 
    w-full h-fit bottom-0 bg-white py-2
    fixed z-50 justify-center items-center"
    >
      {links.map((link, index) => {
        const isActive = pathname === link.href; // Verifica si la URL actual coincide con el enlace

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
