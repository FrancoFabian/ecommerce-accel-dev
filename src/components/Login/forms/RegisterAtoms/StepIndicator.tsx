"use client";
import { cn } from "@/lib/utils";
import CheckmarkIcon from "../../check/CheckmarkIcon";

interface StepIndicatorProps {
  currentStep: number;
  steps: { number: number; title: string; subtitle?: string }[];
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  const Circle = (active: boolean, done: boolean, n: number) => (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border-2 text-base font-semibold transition-colors",
        done
          ? "bg-gray-500/30 border-gray-400/20 text-gray-400/30"
          : active
          ? "border-gray-400 text-gray-400"
          : "border-gray-400/30 text-gray-400/30"
      )}
    >
      {done ? <CheckmarkIcon isChecked /> : n}
    </div>
  );

  return (
    <aside className="hidden lg:flex flex-col w-1/3 shrink-0 px-8 pt-10 rounded-xl bg-gradient-to-b from-stone-900 via-blue-950 to-sky-800">
      {steps.map((step, idx) => {
        const active = currentStep === step.number;
        const done = currentStep > step.number;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.number} className="flex">
            {/* ---- Columna con círculo + línea ---- */}
            <div className="flex flex-col items-center">
              {Circle(active, done, step.number)}

              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-2",
                    step.number < currentStep ? "bg-gray-400" : "bg-gray-400/30"
                  )}
                />
              )}
            </div>

            {/* ---- Texto ---- */}
            <div className="ml-4 mb-16">
              <p
                className={cn(
                  "font-semibold transition-colors",
                  active
                    ? "text-white"
                    : done
                    ? "text-gray-200"
                    : "text-gray-400"
                )}
              >
                {step.title}
              </p>

              {step.subtitle && (
                <p
                  className={cn(
                    "text-sm transition-colors",
                    active ? "text-gray-400" : "text-gray-500"
                  )}
                >
                  {step.subtitle}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </aside>
  );
};
