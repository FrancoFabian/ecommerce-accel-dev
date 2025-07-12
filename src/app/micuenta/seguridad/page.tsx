"use client"

import { HiArrowLeft, HiShieldCheck } from "react-icons/hi2"
import { useRouter } from "next/navigation"

export default function SeguridadPage() {
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
          <HiShieldCheck className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Seguridad</h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Seguridad y Doble Factor</h2>
            
            <div className="space-y-6">
              {/* Contraseña */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Contraseña</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Última actualización: hace 3 meses</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Segura</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Tu contraseña cumple con los requisitos de seguridad recomendados.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Cambiar contraseña
                </button>
              </div>

              {/* Autenticación de dos factores */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Autenticación de dos factores</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Añade una capa extra de seguridad</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Recomendado</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Protege tu cuenta con un código adicional que se envía a tu teléfono.
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Configurar 2FA
                </button>
              </div>

              {/* Dispositivos conectados */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Dispositivos Conectados</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">💻</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">MacBook Pro</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Conectado ahora</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm">Desconectar</button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 text-sm">📱</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">iPhone 13</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Conectado hace 2 horas</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-700 text-sm">Desconectar</button>
                  </div>
                </div>
              </div>

              {/* Actividad reciente */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Actividad Reciente</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">Inicio de sesión exitoso</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">MacBook Pro • Hace 30 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">Cambio de contraseña</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">iPhone 13 • Hace 3 meses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">Intento de inicio de sesión fallido</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">IP desconocida • Hace 1 semana</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuraciones adicionales */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Configuraciones Adicionales</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones de seguridad</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Recibe alertas de actividad sospechosa</p>
                    </div>
                    <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Sesiones automáticas</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Cerrar sesión después de 30 días</p>
                    </div>
                    <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                    </button>
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