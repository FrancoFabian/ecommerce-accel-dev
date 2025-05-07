// components/notifications/Notifications.tsx

'use client';

import { useState } from 'react';
import { NotificationItem } from '@/types/Notification.types';
import { Notification } from './Notification';
import { TabList } from './TabList';
import { NoNotifications } from './NoNotifications';
import './Notifications.css';

export const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'orderConfirmation',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: 'Tu pedido #12345 ha sido confirmado.' },
      time: 'Justo ahora',
      status: 'unread',
      actions: [{ label: 'Ver Pedido', id: 'viewOrder' }],
    },
    {
      id: '2',
      type: 'orderShipped',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: 'Tu pedido #12345 ha sido enviado.' },
      time: 'Hace 2 horas',
      status: 'unread',
      actions: [{ label: 'Rastrear Paquete', id: 'trackPackage' }],
    },
    {
      id: '3',
      type: 'orderDelivered',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: 'Tu pedido #12345 ha sido entregado.' },
      time: 'Ayer',
      status: 'read',
      actions: [{ label: 'Dejar Reseña', id: 'leaveReview' }],
    },
    {
      id: '4',
      type: 'promotion',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: '¡Oferta relámpago! Hasta 50% de descuento en artículos seleccionados.' },
      time: 'Hace 3 días',
      status: 'unread',
      actions: [{ label: 'Comprar Ahora', id: 'shopNow' }],
    },
    {
      id: '5',
      type: 'wishlistReminder',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: '¡Un artículo en tu wishlist está en oferta!' },
      time: 'Hace 5 días',
      status: 'unread',
      actions: [{ label: 'Ver Wishlist', id: 'viewWishlist' }],
    },
    {
      id: '6',
      type: 'supportReply',
      avatar: 'https://support.company.com/avatar.png',
      message: { user: 'Equipo de Soporte', content: 'Hemos respondido a tu consulta.' },
      time: 'Hace 1 hora',
      status: 'unread',
      actions: [{ label: 'Ver Mensaje', id: 'viewMessage' }],
    },
    {
      id: '7',
      type: 'returnProcessed',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: 'Tu devolución del pedido #12345 ha sido procesada.' },
      time: 'Ayer',
      status: 'read',
      actions: [{ label: 'Ver Detalles', id: 'viewDetails' }],
    },
    {
      id: '8',
      type: 'returnProcessed',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: 'Tu devolución del pedido #12345 ha sido procesada.' },
      time: 'Ayer',
      status: 'read',
      actions: [{ label: 'Ver Detalles', id: 'viewDetails' }],
    },
    {
      id: '9',
      type: 'returnProcessed',
      avatar: 'https://company.com/logo.png',
      message: { user: 'Tienda XYZ', content: 'Tu devolución del pedido #12345 ha sido procesada.' },
      time: 'Ayer',
      status: 'read',
      actions: [{ label: 'Ver Detalles', id: 'viewDetails' }],
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { key: 'all', label: 'Todo', count: notifications.length },
    { key: 'unread', label: 'No leído', count: notifications.filter(n => n.status === 'unread').length },
    { key: 'read', label: 'Leído', count: notifications.filter(n => n.status === 'read').length },
  ];

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(n => n.status === activeTab);

  const handleActionClick = (actionId: string) => {
    switch (actionId) { 
      case 'viewOrder':
        alert('Visualizando pedido...');
        break;
      case 'trackPackage':
        alert('Rastreando paquete...');
        break;
      case 'leaveReview':
        alert('Redirigiendo a reseñas...');
        break;
      case 'shopNow':
        alert('Redirigiendo a la tienda...');
        break;
      case 'viewWishlist':
        alert('Mostrando wishlist...');
        break;
      case 'viewMessage':
        alert('Abriendo mensaje de soporte...');
        break;
      case 'viewDetails':
        alert('Mostrando detalles de la devolución...');
        break;
      default:
        alert('Acción no reconocida.');
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        status: 'read',
      }))
    );
  };

  return (
    <div className="flex flex-col relative h-auto text-foreground box-border overflow-hidden bg-content1 outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 rounded-large transition-transform-background motion-reduce:transition-none w-full shadow-none">
      <div className="p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col px-0 pb-0">
        <div className="flex w-full items-center justify-between px-5 py-2">
          <div className="inline-flex items-center gap-1">
            <h4 className="inline-block align-middle text-large font-semibold">Notificaciones</h4>
            <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap 
            px-1 h-6 text-tiny rounded-full bg-gray-100 text-gray-600">
              <span className="flex-1 text-inherit font-normal px-1">{notifications.length}</span>
            </div>
          </div>
          <button
            className="z-0 group relative inline-flex items-center 
            justify-center px-3 h-8 text-small rounded-full bg-transparent hover:bg-primary/20 text-primary"
            type="button"
            onClick={markAllAsRead}
          >
            Marcar todo como leído
          </button>
        </div>
        <div className="inline-flex w-full">
          <TabList tabs={tabs} onTabChange={handleTabChange} />
        </div>
      </div>
      <div className="relative flex flex-auto overflow-y-auto overflow-x-hidden flex-col h-[70vh] w-full gap-0 p-0">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <Notification key={item.id} notification={item} onActionClick={handleActionClick} />
          ))
        ) : (
          <NoNotifications />
        )}
      </div>
    </div>
  );
};
