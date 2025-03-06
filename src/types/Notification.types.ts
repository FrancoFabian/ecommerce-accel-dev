// Acción asociada a una notificación
export interface NotificationAction {
    label: string;
    id: string;
  }
  
  // Mensaje dentro de la notificación
  export interface NotificationMessage {
    user: string;
    content: string;
  }
  
  // Notificación individual
  export interface NotificationItem {
    id:string
    type: string; // Tipo de notificación (e.g., "joinRequest", "message")
    avatar: string; // URL del avatar
    message: NotificationMessage; // Mensaje asociado a la notificación
    time: string; // Tiempo transcurrido desde la notificación
    status: string; // Estado de la notificación (e.g., "pending", "read", "accepted")
    actions: NotificationAction[]; // Acciones disponibles en la notificación
  }
  
  // Props para el componente Notifications
  export interface NotificationsProps {
    notification: NotificationItem[];
  }
  