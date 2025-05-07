"use client";

// import { useState } from "react";
// import { useFormik } from "formik";
// import * as z from "zod";
// import { toFormikValidationSchema } from "zod-formik-adapter";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";

// // Componentes UI (ajusta según tu estructura de proyecto)
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {cn} from "@/lib/utils";

interface StepIndicatorProps {
    currentStep: number;
    steps: { number: number; title: string }[];
  }
  
  export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
    return (
      <div className="w-full mb-8">
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
  
            return (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    isActive
                      ? "bg-gray-600 text-white"
                      : isCompleted
                      ? "bg-gray-400 text-white"
                      : "bg-gray-200 text-black"
                  )}
                >
                  {step.number}
                </div>
                <span
                  className="absolute top-10 text-xs font-medium text-gray-500 whitespace-nowrap"
                  style={{
                    transform: `translateX(-50%)`,
                    left: `${(index * 100) / (steps.length - 1)}%`,
                  }}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
          <div className="absolute top-4 left-0 right-0 h-[2px] -translate-y-1/2 bg-gray-200">
            <div
              className="absolute h-full bg-gray-500 transition-all duration-300"
              style={{
                width: `${((currentStep - 1) * 100) / (steps.length - 1)}%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  