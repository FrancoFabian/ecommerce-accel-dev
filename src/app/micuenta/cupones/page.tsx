"use client"

import { HiArrowLeft, HiTag } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function CuponesPage() {
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
          <HiTag className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Cupones y Promociones</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cupones y Promociones</h2>
            
            <div className="space-y-6">
              {/* Cupones activos */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Cupones Activos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-green-200 dark:border-green-700 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-200">DESCUENTO20</h4>
                        <p className="text-sm text-green-600 dark:text-green-300">20% de descuento</p>
                      </div>
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Válido</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                      Mínimo de compra: $100. Válido hasta el 31 de diciembre, 2024.
                    </p>
                    <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                      Usar Cupón
                    </button>
                  </div>

                  <div className="border-2 border-blue-200 dark:border-blue-700 rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">ENVIOGRATIS</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-300">Envío gratis</p>
                      </div>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Válido</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                      En compras superiores a $50. Válido hasta el 15 de enero, 2024.
                    </p>
                    <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                      Usar Cupón
                    </button>
                  </div>
                </div>
              </div>

              {/* Promociones especiales */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Promociones Especiales</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 dark:text-red-400 font-bold">BF</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Black Friday</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Hasta 50% de descuento</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Aprovecha los mejores descuentos en tecnología de seguridad. 
                      Válido del 24 al 30 de noviembre.
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Ver productos →
                    </button>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400 font-bold">2x1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">2x1 en Sensores</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Lleva 2 por el precio de 1</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Promoción especial en sensores de movimiento y puertas. 
                      Válido hasta agotar existencias.
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Ver productos →
                    </button>
                  </div>
                </div>
              </div>

              {/* Historial de cupones */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Historial de Cupones</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">DESCUENTO10</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Usado el 15 de noviembre</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">-$25.00</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">PRIMERACOMPRA</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Usado el 10 de octubre</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">-$15.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 