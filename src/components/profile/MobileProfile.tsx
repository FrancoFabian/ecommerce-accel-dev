"use client"

import { DarkIcon } from "@/icons/DarkIcon"
import { LightIcon } from "@/icons/LightIcon"
import { useState } from "react"
import {
  HiCube,
  HiHeart,
  HiStar,
  HiWallet,
  HiOutlineUser,
  HiQuestionMarkCircle,
  HiInformationCircle,
  HiArrowLeftOnRectangle,
  HiMapPin,
  HiTag,
  HiShieldCheck,
} from "react-icons/hi2"

export const MobileProfile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div
      className={`xl:hidden lg:hidden h-[80vh] w-[100vw] ${
          isDarkMode ? "dark" : ""
        }`}
      style={{
        background: isDarkMode
          ? "linear-gradient(236deg, rgba(2,28,155,1) 0%, #22ca55 65%)"
          : "linear-gradient(236deg, #0a7cff 0%, #30029b 65%)",
      }}
    >
      {/* Contenedor principal */}
      <div className="relative z-10">
        {/* Header con ajustes */}
        <div className="flex justify-end pt-6 pr-6">
          {/* Botón para togglear Modo Oscuro */}
          <button onClick={toggleDarkMode} className="text-white">
            {
                
                !isDarkMode ?<DarkIcon className="w-6" />  : <LightIcon className="w-6" />
            }
            
          </button>
        </div>

        {/* Sección de perfil */}
        <div className="flex flex-col items-center mb-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center">
              <HiOutlineUser className="w-12 h-12 text-gray-400" />
            </div>
            <div className="absolute bottom-0 right-0 bg-yellow-400 p-1 rounded-full">
              <HiStar className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-white text-md font-semibold mt-4">John Mcdonald</h2>
          <p className="text-white/80 text-sm">Pro Member</p>
          <button className="mt-4 px-6 py-2 bg-black/20 dark:bg-white/10 rounded-full text-white text-sm">
            Edit Profile
          </button>
        </div>

        {/* Tarjeta principal */}
        <div className="overflow-hidden relative">
            <div className="h-screen rounded-t-[40px] bg-white dark:bg-gray-900 
            shadow-xl p-6 absolute top-12 left-0 w-full z-10">

            </div>
            <div className="h-[50vh] px-6 pb-6 pt-14 relative z-20 overflow-y-auto">
            {/* Grid Menu */}
                <div className="grid grid-cols-2 gap-3 translate-y-[-3rem]">
                    {[
                    { icon: <HiCube className="w-6 h-6" />, label: "Mis pedidos" },
                    { icon: <HiWallet className="w-6 h-6" />, label: "Metodo de pago y facturación" },
                    { icon: <HiHeart className="w-6 h-6" />, label: "Mis favoritos" },
                    { icon: <HiStar className="w-6 h-6" />, label: "Mis reseñas" },
                    { icon: <HiQuestionMarkCircle className="w-6 h-6" />, label: "Mis preguntas" },
                    { icon: <HiInformationCircle className="w-6 h-6" />, label: "Ayuda" },
                    { icon: <HiMapPin className="w-6 h-6" />, label: "Mis Direcciones" },
                    { icon: <HiTag className="w-6 h-6" />, label: "Cupones y promociones" },
                    { icon: <HiShieldCheck className="w-6 h-6" />, label: "Seguridad y doble factor" },
                    { icon: <HiArrowLeftOnRectangle className="w-6 h-6" />, label: "Cerrar sesión" },
                    
                    
                    ].map((item, index) => (
                    <button
                        key={index}
                        className="flex flex-col items-center p-4 bg-gray-50 
                        dark:bg-gray-800 rounded-2xl space-y-2 dark:hover:text-emerald-500 
                        text-gray-500 dark:text-gray-200 dark:font-medium
                        transition-colors hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <div>
                        {item.icon}
                        </div>
                        <span className="text-sm">
                        {item.label}
                        </span>
                    </button>
                    ))}
                </div>
            </div>
        </div>
        
      </div>
    </div>
  )
}
