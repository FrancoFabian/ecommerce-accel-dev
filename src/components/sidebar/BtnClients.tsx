"use client";
import { ComponentProps, ElementType } from "react";
import { useLogout } from '@/lib/hooks/session/useLogout';
import {  HiArrowLeftOnRectangle,  HiQuestionMarkCircle} from 'react-icons/hi2';
type Icon = ElementType<ComponentProps<"svg">>;

const FOOTER_BUTTONS: { id: string; label: string; icon: Icon; onClick?: () => void }[] = [
    { id: "help_id", label: "Help & Information", icon: HiQuestionMarkCircle },
    { id: "log_out_id", label: "Log Out", icon: HiArrowLeftOnRectangle }, // onClick se asigna en el componente
  ];

export const BtnClients = () => {
  const handleLogout = useLogout();
  return (
    <>
    {FOOTER_BUTTONS.map(({ id, label, icon: Icon}) => (
    <button
      key={id}

      type="button"
      onClick={id === "log_out_id" ? handleLogout : undefined}
      className={`inline-flex group items-center px-4 h-10 text-sm gap-2 rounded-md w-full bg-transparent hover:bg-gray-100 justify-start text-gray-500 hover:text-gray-900`}
    >
      <Icon className="h-6 w-6" />
      {label}
    </button>
    ))}
    </>
  );
};

