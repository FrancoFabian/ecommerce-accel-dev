// components/OrderProgress.tsx
"use client";

import React from "react";
import { HiCheck } from "react-icons/hi2";


export type OrderStatus = "Processing" | "Shipped" | "Out for Delivery" | "Delivered";

interface OrderProgressProps {
  status: OrderStatus;
}

export const OrderProgress: React.FC<OrderProgressProps> = ({ status }) => {
  const stages: OrderStatus[] = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
  const currentStageIndex = stages.indexOf(status);

  return (
    <div className="w-full">
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Línea de fondo */}
        <div className="hidden md:block absolute top-4 left-0 w-full h-1 bg-gray-200 z-0" />
        <div className="md:hidden absolute top-0 left-4 w-1 h-full bg-gray-200 z-0" />

        {/* Línea de progreso */}
        <div
          className="hidden md:block absolute top-4 left-0 h-1 bg-blue-600 z-10 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
        />
        <div
          className="md:hidden absolute top-0 left-4 w-1 bg-blue-600 z-10 transition-all duration-500 ease-in-out"
          style={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
        />

        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center mb-8 md:mb-0 z-20">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mb-20 ${
                index <= currentStageIndex ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"
              }`}
            >
              {index <= currentStageIndex && <HiCheck className="w-5 h-5 text-white" />}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${index <= currentStageIndex ? "text-blue-600" : "text-gray-500"}`}>
                {stage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


