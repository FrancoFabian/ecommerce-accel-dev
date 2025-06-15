import { ReactNode } from "react";

interface BtnSubmitProps {
  name: string;
  type: "submit" | "reset" | "button";
  onClicked?: () => void;
  className?: string;
  icon?: ReactNode; // Icono opcional (ReactNode puede representar cualquier componente JSX)
  disabled?:boolean
}

export const BtnSubmit = ({ name, type = "button", onClicked, icon, className, disabled = false }: BtnSubmitProps) => {
  return (
    <button
      type={type}
      onClick={onClicked}
      className={className}
      disabled = {disabled}
    >
      {icon && <span className="mr-2">{icon}</span>} {/* Renderiza el icono si existe */}
      {name}
    </button>
  );
};
