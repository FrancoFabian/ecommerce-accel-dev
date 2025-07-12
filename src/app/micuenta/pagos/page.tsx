"use client"

import { HiArrowLeft, HiWallet } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function PagosPage() {
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
          <HiWallet className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Métodos de Pago</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Métodos de Pago y Facturación</h2>
            
            <div className="space-y-6">
              {/* Tarjetas guardadas */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Tarjetas Guardadas</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded"></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Visa terminada en 4242</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Expira 12/25</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm">Eliminar</button>
                    </div>
                  </div>
                </div>
                <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  + Agregar nueva tarjeta
                </button>
              </div>

              {/* Información de facturación */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Información de Facturación</h3>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Juan Pérez</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">Calle Principal 123</p>
                  <p className="text-gray-600 dark:text-gray-300">Ciudad, CP 12345</p>
                  <button className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Editar información
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 