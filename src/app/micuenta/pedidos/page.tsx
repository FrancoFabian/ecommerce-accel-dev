"use client"

import { HiArrowLeft, HiCube } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function PedidosPage() {
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
          <HiCube className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Mis Pedidos</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Historial de Pedidos</h2>
            
            <div className="space-y-4">
              {/* Pedido de ejemplo */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Pedido #12345</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">15 de Enero, 2024</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Entregado</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>Total: $299.99</p>
                  <p>2 productos</p>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Pedido #12344</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">10 de Enero, 2024</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">En tránsito</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>Total: $149.99</p>
                  <p>1 producto</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 