// components/OrderTracker.tsx
"use client";

import React from "react";
import { OrderProgress, OrderStatus } from "./OrderProgress";

export type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  status: OrderStatus;
  date: string;
  total: number;
  products: Product[];
};

export const OrderTracker: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium">Order #{order.id}</p>
          <p className="text-sm text-gray-500">Placed on {order.date}</p>
        </div>
      </div>
      <div className="p-6 border-b border-gray-200">
        <OrderProgress status={order.status} />
      </div>
      <div className="p-6 border-b border-gray-200">
        <div className="space-y-4">
          {order.products.map((product) => (
            <div key={product.id} className="flex justify-between items-center">
              <span>{product.name}</span>
              <span>x{product.quantity}</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between w-full">
          <p className="font-medium">Total</p>
          <p className="font-bold">${order.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
