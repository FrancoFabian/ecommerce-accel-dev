"use client";
import { ComponentProps, ElementType } from "react";
import { useLogout } from '@/lib/hooks/session/useLogout';
import { HiArrowLeftOnRectangle, HiQuestionMarkCircle } from 'react-icons/hi2';

type Icon = ElementType<ComponentProps<"svg">>;

const FOOTER_BUTTONS: { id: string; label: string; icon: Icon; onClick?: () => void }[] = [
  { id: "help_id", label: "Ayuda e Información", icon: HiQuestionMarkCircle },
  { id: "log_out_id", label: "Cerrar Sesión", icon: HiArrowLeftOnRectangle },
];

export const BtnClients = () => {
  const handleLogout = useLogout();

  const handleButtonClick = (id: string) => {
    if (id === "log_out_id") {
      handleLogout();
    } else if (id === "help_id") {
      // Navegar a la página de ayuda
      window.location.href = '/micuenta/ayuda';
    }
  };

  return (
    <div className="space-y-2">
      {FOOTER_BUTTONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleButtonClick(id)}
          className={`inline-flex group items-center px-3 py-2 text-sm gap-3 rounded-lg w-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 justify-start text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors ${
            id === "log_out_id" ? "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" : ""
          }`}
        >
          <Icon className={`h-5 w-5 ${
            id === "log_out_id" ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
          }`} />
          <span className="font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

