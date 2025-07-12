
//'use client';

//import { useSearchParams } from 'next/navigation';
//import { Pagination } from '@/components/sidebar/Pagination';
//import { MobileProfile } from '@/components/profile/MobileProfile';
//import { OrderTracker, Order } from '@/components/tracking/OrderTracker';

export default function MyAccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Bienvenido a tu Cuenta</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resumen de pedidos */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pedidos Recientes</h3>
              <p className="text-2xl font-bold text-blue-600">3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">En los últimos 30 días</p>
            </div>

            {/* Favoritos */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Productos Favoritos</h3>
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Guardados</p>
            </div>

            {/* Reseñas */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Mis Reseñas</h3>
              <p className="text-2xl font-bold text-yellow-600">5</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Publicadas</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Ver Mis Pedidos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Revisa el estado de tus compras recientes</p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Gestionar Direcciones</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Actualiza tus direcciones de envío</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*

  return (
    <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Mi Cuenta - Seguimiento de Pedido</h1>
    <OrderTracker order={order} />
  </div>);
*/