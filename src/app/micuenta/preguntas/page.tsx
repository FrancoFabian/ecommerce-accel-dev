"use client"

import { HiArrowLeft, HiQuestionMarkCircle } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function PreguntasPage() {
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
          <HiQuestionMarkCircle className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Mis Preguntas</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mis Preguntas</h2>
            
            <div className="space-y-6">
              {/* Pregunta 1 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-200 rounded-lg"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Cámara de Seguridad HD</h3>
                      <span className="text-sm text-green-600 dark:text-green-400">Respondida</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Hace 3 días</span>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Pregunta:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    ¿Esta cámara funciona con WiFi 5GHz o solo 2.4GHz?
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Respuesta:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Esta cámara es compatible con WiFi 2.4GHz y 5GHz. Te recomendamos usar 2.4GHz para mayor estabilidad y alcance.
                  </p>
                </div>
              </div>

              {/* Pregunta 2 */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-200 rounded-lg"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Sensor de Movimiento</h3>
                      <span className="text-sm text-yellow-600 dark:text-yellow-400">Pendiente</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Hace 1 día</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Pregunta:</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    ¿Cuál es la duración de la batería en modo de detección continua?
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                ¿Tienes alguna pregunta sobre nuestros productos?
              </p>
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                Hacer nueva pregunta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 