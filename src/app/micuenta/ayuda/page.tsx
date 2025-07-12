"use client"

import { HiArrowLeft, HiInformationCircle } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function AyudaPage() {
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
          <HiInformationCircle className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Centro de Ayuda</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Centro de Ayuda</h2>
            
            <div className="space-y-6">
              {/* Categorías de ayuda */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pedidos y Envíos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Información sobre el estado de tus pedidos, envíos y devoluciones.
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver más →</span>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pagos y Facturación</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Métodos de pago, facturas y problemas con transacciones.
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver más →</span>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Cuenta y Seguridad</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Gestión de cuenta, contraseñas y configuración de seguridad.
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver más →</span>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Productos y Garantías</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Información sobre productos, garantías y soporte técnico.
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver más →</span>
                </div>
              </div>

              {/* Preguntas frecuentes */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preguntas Frecuentes</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      ¿Cómo puedo rastrear mi pedido?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Puedes rastrear tu pedido desde la sección &quot;Mis Pedidos&quot; en tu cuenta, 
                      donde encontrarás el número de seguimiento y el estado actual.
                    </p>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      ¿Cuáles son los métodos de pago aceptados?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Aceptamos tarjetas de crédito/débito, PayPal, transferencias bancarias 
                      y pagos en efectivo al momento de la entrega.
                    </p>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      ¿Cuál es la política de devoluciones?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Ofrecemos 30 días para devoluciones en productos nuevos y sin usar. 
                      Los productos deben estar en su empaque original.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">¿Necesitas más ayuda?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Nuestro equipo de soporte está disponible para ayudarte.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Contactar Soporte
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Chat en Vivo
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