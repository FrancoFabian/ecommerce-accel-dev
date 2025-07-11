'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import SvgCompleteLogo from "../logo/completelogo";
import { NavLinksTwo } from "./NavLinksTwo";
import { UserMenu } from "./UserMenu";
import { NotificationsMenu } from "./NotificationsMenu";
import { OptionsUserMenu } from "./OptionsUserMenu";
import { MenuCartShopping } from "./MenuCartShopping";
import { SerchandcartMenu } from "./menumobile/SerchandcartMenu";
import { MenuSearch } from "./MenuSearch";
import { useAuth } from '@/lib/hooks/useAuth';

const links = [
    { name: "Inicio", href: "/", icon: undefined },
    { name: "Todo", href: "/productos", icon: undefined },
    { name: "Categorias", href: "/categorias", icon: undefined },
    { name: "Contacto", href: "/contacto", icon: undefined },
];

export const Navbar = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const openMenuRef = useRef<string | null>(null);
    const { status, user } = useAuth();
    const isAuthenticated = status === 'authenticated' && user;
   
    const notificationsRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const cartMenuRef = useRef<HTMLDivElement>(null);
    const searchMenuRef = useRef<HTMLDivElement>(null);
   
    const notificationsButtonRef = useRef<HTMLButtonElement>(null);
    const userMenuButtonRef = useRef<HTMLButtonElement>(null);
    const cartMenuButtonRef = useRef<HTMLButtonElement>(null);
    const searchMenuButtonRef = useRef<HTMLButtonElement>(null);

    const toggleSearchMenu = useCallback(() => {
        setOpenMenu((prevMenu) => (prevMenu === 'searchMenu' ? null : 'searchMenu'));
      }, []);
    
      const toggleUserMenu = useCallback(() => {
        // Solo permitir abrir el menú de usuario si está autenticado
        if (!isAuthenticated) return;
        setOpenMenu((prevMenu) => (prevMenu === 'userMenu' ? null : 'userMenu'));
      }, [isAuthenticated]);
    
      const toggleNotifications = useCallback(() => {
        // Solo permitir abrir las notificaciones si está autenticado
        if (!isAuthenticated) return;
        setOpenMenu((prevMenu) => (prevMenu === 'notifications' ? null : 'notifications'));
      }, [isAuthenticated]);
    
      const toggleCartMenu = useCallback(() => {
        setOpenMenu((prevMenu) => (prevMenu === 'cartMenu' ? null : 'cartMenu'));
      }, []);

      useEffect(() => {
        openMenuRef.current = openMenu;
      }, [openMenu]);
      
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as Node;
          if (
            openMenuRef.current &&
            !notificationsRef.current?.contains(target) &&
            !userMenuRef.current?.contains(target) &&
            !cartMenuRef.current?.contains(target) &&
            !searchMenuRef.current?.contains(target) &&

            !notificationsButtonRef.current?.contains(target) &&
            !userMenuButtonRef.current?.contains(target) &&
            !cartMenuButtonRef.current?.contains(target) &&
            !searchMenuButtonRef.current?.contains(target)
          ) {
            setOpenMenu(null);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <nav className="flex z-40 w-full h-auto items-center justify-center sticky top-0 inset-x-0 backdrop-blur-lg bg-white/70 lg:bg-transparent position-fixed">
            <header className="z-40 flex gap-4 w-full flex-row relative items-center justify-between h-[60px] max-w-[1024px] px-4 sm:px-6">
                {/* Logo */}
                <div className="flex items-center">
                {/* <MenuButton isOpen={openMenu === "menu"} toggleMenu={toggleMenu} ref={menuButtonRef} /> */}
                    <div className="flex w-4/5">
                        <SvgCompleteLogo className="w-full h-full" />
                    </div>
                </div>
                <ul className={`hidden sm:flex flex-row items-center gap-4 rounded-full bg-slate-100 px-4 py-2 ${openMenu === 'menu' ? 'block' : 'hidden'}`}>
                    {links.map(item => (
                        <NavLinksTwo key={item.name} {...item} />
                    ))}
                </ul>
                <UserMenu
                    toggleNotifications={toggleNotifications}
                    toggleMenuUser={toggleUserMenu}
                    toggleCartMenu={toggleCartMenu}
                    toggleSearchMenu={toggleSearchMenu}
                    notificationsButtonRef={notificationsButtonRef}
                    userMenuButtonRef={userMenuButtonRef}
                    cartMenuButtonRef={cartMenuButtonRef}
                    searchMenuButtonRef={searchMenuButtonRef}
                />
                <SerchandcartMenu/>
            </header>
            {/* Menú de notificaciones - solo mostrar si está autenticado */}
            {isAuthenticated && (
              <NotificationsMenu isVisible={openMenu === 'notifications'} ref={notificationsRef} />
            )}
            {/* Menú de opciones del usuario - solo mostrar si está autenticado */}
            {isAuthenticated && (
              <OptionsUserMenu isOpen={openMenu === 'userMenu'} ref={userMenuRef} />
            )}
            <MenuCartShopping isVisible={openMenu === 'cartMenu'} ref={cartMenuRef} />
            <MenuSearch isVisible={openMenu === 'searchMenu'} ref={searchMenuRef} />
            {/* Menú para dispositivos móviles */}
            {/*openMenu === 'menu' && <MobileNavLinks links={links} ref={menuRef} />*/}
        </nav>
    );
};