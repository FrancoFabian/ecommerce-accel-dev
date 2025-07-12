"use client";
import { forwardRef, memo } from "react";
import { useLogout } from "@/lib/hooks/session/useLogout";

const menuItems = [
  { id: "profile", text: "johndoe@example.com" },
  { id: "my_orders", text: "Mis pedidos" },
  { id: "mi_paymetodes", text: "Datos de envío, pago y facturación" },
  { id: "mis_pedidos", text: "Mis pedidos" },
  { id: "analytics", text: "Mis favoritos" },
  { id: "my_reviwes", text: "Mis reseñas" },
  { id: "my_questions", text: "Mis preguntas" },
  { id: "help_and_feedback", text: "Ayuda" },
  { id: "logout", text: "Cerrar sesión" },
];

type OptionsUserMenuProps = {
  isOpen: boolean;
};

export const OptionsUserMenu = memo(
  forwardRef<HTMLDivElement, OptionsUserMenuProps>(({ isOpen }, ref) => {
    const handleLogout = useLogout();

    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          zIndex: 39,
          maxHeight: "561px",
        }}
        className={`hidden lg:flex sm:flex transition-all duration-200 transform top-[70px] left-[25%] 2xl:left-[66%] lg:left-[68%] md:left-[65%] sm:left-[56%]
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div
          style={{
            opacity: 1,
            transform: "scale(1)",
            transformOrigin: "100% 0% 0px",
          }}
        >
          <div
            data-slot="base"
            data-open="true"
            data-placement="bottom-end"
            role="dialog"
            className="z-0 relative bg-transparent before:content-[''] before:hidden before:z-[-1] before:absolute before:rotate-45 before:w-2.5 before:h-2.5 before:rounded-sm"
            style={{ outline: "none" }}
          >
            <div
              data-slot="content"
              data-open="true"
              data-placement="bottom-end"
              className="z-10 inline-flex flex-col items-center
               justify-center subpixel-antialiased outline-none
                box-border text-small bg-white rounded-lg
                 shadow-medium w-full p-1 min-w-[200px]"
            >
              <div className="w-full relative flex flex-col gap-1 p-1" aria-label="Profile Actions">
                <ul className="w-full flex flex-col gap-0.5 outline-none" aria-label="Profile Actions">
                  {menuItems.map((item) => (
                    <li
                      key={item.id}
                      role="menuitem"
                      data-key={item.id}
                      className={`flex flex-wrap group items-center justify-between 
                        relative px-2 py-1.5 w-full box-border rounded-lg cursor-pointer tap-highlight-transparent outline-none ${
                        item.id === "logout"
                          ? "hover:bg-[#ff000047] hover:text-[#c8197f]"
                          : "hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                      onClick={item.id === "logout" ? handleLogout : undefined}
                    >
                      <span className="flex-1 text-small font-normal truncate">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })
);
