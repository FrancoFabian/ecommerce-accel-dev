"use client"

import { BtnClients } from './BtnClients';
import { HiChartPie, HiClipboardDocumentList, HiCog6Tooth, HiGift, HiHome, HiMagnifyingGlass, HiQuestionMarkCircle, HiReceiptPercent, HiUserGroup } from 'react-icons/hi2';
import { ElementType, ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Icon = ElementType<ComponentProps<"svg">>;

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: Icon;
  badge?: string | number;
}

interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}


const NAV_SECTIONS: NavSection[] = [
  {
    id: "overview_id",
    title: "Mi Cuenta",
    items: [
      { id: "home_id", label: "Inicio", href: "/micuenta", icon: HiHome },
      { id: "pedidos_id", label: "Mis Pedidos", href: "/micuenta/pedidos", icon: HiClipboardDocumentList },
      { id: "pagos_id", label: "Métodos de Pago", href: "/micuenta/pagos", icon: HiReceiptPercent },
      { id: "direcciones_id", label: "Mis Direcciones", href: "/micuenta/direcciones", icon: HiUserGroup },
      { id: "favoritos_id", label: "Mis Favoritos", href: "/micuenta/favoritos", icon: HiGift },
    ],
  },
  {
    id: "organization_id",
    title: "Actividad",
    items: [
      { id: "resenas_id", label: "Mis Reseñas", href: "/micuenta/resenas", icon: HiChartPie },
      { id: "preguntas_id", label: "Mis Preguntas", href: "/micuenta/preguntas", icon: HiQuestionMarkCircle },
      { id: "ayuda_id", label: "Centro de Ayuda", href: "/micuenta/ayuda", icon: HiCog6Tooth },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="h-[calc(100vh-60px)] flex flex-col bg-white dark:bg-gray-900">
      <div className="md:hidden sm:hidden lg:flex lg:relative hidden h-full w-72 flex-col border-r border-gray-300">
        {/* Header con búsqueda */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-4">
            <div className="group flex flex-col w-full relative justify-end px-1">
              <div className="flex flex-col h-full">
                <div
                  className="relative w-full inline-flex items-center shadow-sm px-3 gap-3 bg-gray-100 hover:bg-gray-200 h-10 rounded-md transition-colors duration-150 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white"
                  style={{ cursor: 'text' }}
                >
                  <div className="inline-flex w-full items-center h-full">
                    <HiMagnifyingGlass className="h-5 w-5 text-gray-500" />
                    <input
                      className="w-full font-normal bg-transparent outline-none placeholder:text-gray-500 text-sm pl-1.5 pr-1.5"
                      aria-label="search"
                      placeholder="Buscar..."
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navegación principal - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="w-full flex flex-col gap-1 p-1">
              <nav className="w-full flex flex-col gap-0.5 items-center" role="listbox" tabIndex={0}>
                {NAV_SECTIONS.map(({ id, title, items }) => (
                  <li key={id} className="w-full mb-4 list-none">
                    <span className="pl-1 text-xs text-gray-500 dark:text-gray-400 font-medium">{title}</span>
                    <ul className="pt-2 list-none space-y-1">
                      {items.map(({ id, label, href, icon: IconEl, badge }) => {
                        const isActive = pathname === href;
                        return (
                          <li key={id}>
                            <Link
                              href={href}
                              className={`flex group gap-3 items-center justify-between py-2 px-3 h-11 rounded-lg transition-colors ${
                                isActive 
                                  ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300' 
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                              }`}
                            >
                              <IconEl className={`h-5 w-5 ${
                                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200'
                              }`} />
                              <span className={`flex-1 truncate text-sm font-medium ${
                                isActive ? 'text-blue-900 dark:text-blue-300' : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-200'
                              }`}>
                                {label}
                              </span>
                              {badge && (
                                <div className="relative inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs">
                                  <span>{badge}</span>
                                </div>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul> 
                  </li>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Footer con botones de acción */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <BtnClients />
        </div>
      </div>
    </div>
  );
};
