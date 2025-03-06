'use client';

import React from 'react';
import Image from 'next/image';
import { NotificationItem } from '@/types/Notification.types';

interface NotificationProps {
  notification: NotificationItem;
  onActionClick: (actionId: string) => void; // Se maneja dentro del cliente
}

export const Notification = ({ notification, onActionClick }: NotificationProps) => {
  const { avatar, message, time, actions } = notification;

  return (
    <div className="flex gap-3 border-b border-divider px-6 py-4 bg-primary-50/50">
      <div className="relative flex-none">
        <div className="relative inline-flex shrink-0">
          <span className="flex relative justify-center items-center w-10 h-10 bg-default text-default-foreground rounded-full">
          <Image src={avatar} alt="avatar" className="object-cover w-full h-full rounded-full" width={40} height={40} />
         
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-foreground">
          <strong className="font-medium">{message.user}</strong> {message.content}
        </p>
        <time className="text-xs text-gray-500">{time}</time>
        <div className="flex gap-2 pt-2">
          {actions.map((action) => (
            <button
              key={action.id}
              className="z-0 group relative inline-flex items-center justify-center 
              px-3 min-w-16 h-8 text-tiny rounded-md bg-gray-100 text-default-foreground hover:bg-primary 
              hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              onClick={() => onActionClick(action.id)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

