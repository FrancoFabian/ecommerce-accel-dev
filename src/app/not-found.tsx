"use client"

import Link from "next/link"
import { HiHome, HiArrowLeft, HiMagnifyingGlass } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Ilustración 404 */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <HiMagnifyingGlass className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje principal */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ¡Página no encontrada!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Puedes volver al inicio o buscar en nuestros productos.
        </p>

        {/* Botones de acción */}
        <div className="space-y-4">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5" />
            Volver atrás
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <HiHome className="w-5 h-5" />
            Ir al inicio
          </Link>

          <Link
            href="/productos"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <HiMagnifyingGlass className="w-5 h-5" />
            Ver productos
          </Link>
        </div>

        {/* Información adicional */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            ¿Necesitas ayuda? Contacta con nuestro soporte:
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600 dark:text-gray-300">
              📧 Email: soporte@grupoaccel.com
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              📞 Teléfono: (55) 1234-5678
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 