"use client"

import { HiArrowLeft, HiMapPin } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function DireccionesPage() {
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
          <HiMapPin className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Mis Direcciones</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Direcciones de Envío</h2>
            
            <div className="space-y-4">
              {/* Dirección principal */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Casa</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dirección principal</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Principal</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <p>Juan Pérez</p>
                  <p>Calle Principal 123</p>
                  <p>Colonia Centro</p>
                  <p>Ciudad de México, CDMX 12345</p>
                  <p>Tel: (55) 1234-5678</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Editar</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Eliminar</button>
                </div>
              </div>

              {/* Dirección secundaria */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Oficina</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dirección de trabajo</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <p>Juan Pérez</p>
                  <p>Av. Reforma 456</p>
                  <p>Piso 10, Oficina 1001</p>
                  <p>Ciudad de México, CDMX 06500</p>
                  <p>Tel: (55) 9876-5432</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Editar</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Eliminar</button>
                </div>
              </div>
            </div>

            <button className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              + Agregar nueva dirección
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 