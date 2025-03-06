import { ReactNode } from "react";

interface BtnSubmitProps {
  name: string;
  type: "submit" | "reset" | "button" | undefined;
  onClicked?: () => void;
  className?: string;
  icon?: ReactNode; // Icono opcional (ReactNode puede representar cualquier componente JSX)
}

export const BtnSubmit = ({ name, type, onClicked, icon, className }: BtnSubmitProps) => {
  return (
    <button
      type={type}
      onClick={onClicked}
      className={className}
    >
      {icon && <span className="mr-2">{icon}</span>} {/* Renderiza el icono si existe */}
      {name}
    </button>
  );
};
