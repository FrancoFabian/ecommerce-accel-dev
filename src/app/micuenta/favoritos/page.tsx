"use client"

import { HiArrowLeft, HiHeart } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function FavoritosPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header móvil */}
      <div className="lg:hidden flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.push('/micuenta')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <HiArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex items-center gap-2">
          <HiHeart className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Mis Favoritos</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Productos Favoritos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Producto favorito 1 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-200 rounded-lg"></div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Cámara de Seguridad HD</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Resolución 1080p, visión nocturna</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">$299.99</span>
                  <button className="text-red-600 hover:text-red-700">
                    <HiHeart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Agregar al carrito
                </button>
              </div>

              {/* Producto favorito 2 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-200 rounded-lg"></div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Sensor de Movimiento</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Alcance 12m, inalámbrico</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">$89.99</span>
                  <button className="text-red-600 hover:text-red-700">
                    <HiHeart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Agregar al carrito
                </button>
              </div>

              {/* Producto favorito 3 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <div className="w-16 h-16 bg-purple-200 rounded-lg"></div>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Control de Acceso</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Huella digital, RFID</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">$199.99</span>
                  <button className="text-red-600 hover:text-red-700">
                    <HiHeart className="w-5 h-5 fill-current" />
                  </button>
                </div>
                <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 