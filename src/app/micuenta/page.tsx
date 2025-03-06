
//'use client';

//import { useSearchParams } from 'next/navigation';
//import { Pagination } from '@/components/sidebar/Pagination';
import { MobileProfile } from '@/components/profile/MobileProfile';
import { OrderTracker, Order } from '@/components/tracking/OrderTracker';

export default function MyAccountPage() {
 // const searchParams = useSearchParams();
  //const currentPage = parseInt(searchParams.get('page') || '1', 10);
 //const totalPages = 5; // O el total obtenido de tu API o lógica de negocio
  const order: Order = {
    id: "12345",
    status: "Out for Delivery",
    date: "2025-02-11",
    total: 250.0,
    products: [
      { id: "1", name: "Producto A", quantity: 2, price: 50.0 },
      { id: "2", name: "Producto B", quantity: 1, price: 150.0 },
    ],
  };

  return (
    <div>
    <MobileProfile />
  </div>);
}
/*

  return (
    <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Mi Cuenta - Seguimiento de Pedido</h1>
    <OrderTracker order={order} />
  </div>);
*/