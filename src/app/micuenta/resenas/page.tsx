"use client"

import { HiArrowLeft, HiStar } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function ResenasPage() {
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
          <HiStar className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Mis Reseñas</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mis Reseñas</h2>
            
            <div className="space-y-6">
              {/* Reseña 1 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-200 rounded-lg"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Cámara de Seguridad HD</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <HiStar key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Hace 2 días</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Excelente cámara, la calidad de imagen es muy buena y la instalación fue sencilla. 
                  La aplicación funciona perfectamente y las notificaciones llegan al instante.
                </p>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Editar</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Eliminar</button>
                </div>
              </div>

              {/* Reseña 2 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-200 rounded-lg"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Sensor de Movimiento</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4].map((star) => (
                          <HiStar key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        <HiStar className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Hace 1 semana</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Buen sensor, detecta movimiento correctamente. La instalación fue fácil, 
                  aunque la batería se agota un poco rápido. En general estoy satisfecho.
                </p>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Editar</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Eliminar</button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                ¿Has comprado productos recientemente? ¡Comparte tu experiencia!
              </p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Escribir nueva reseña
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 