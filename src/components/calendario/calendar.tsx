// components/Calendar.tsx
"use client";
import { useState, useMemo } from "react";

interface CalendarProps {
  /** Cuántos meses mostrar (por defecto 1) */
  visibleMonths?: number;
  /** Ancho de cada mes en px (por defecto 256) */
  calendarWidth?: number;
  /** Locale para formatear mes y año (por defecto 'en-US') */
  locale?: string;
  /** Callback al seleccionar fecha */
  onDateChange?: (date: Date) => void;
}

export const Calendar = ({
  visibleMonths = 1,
  calendarWidth = 256,
  locale = "en-US",
  onDateChange = () => {},
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePrev = () =>
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const handleNext = () =>
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  /** Genera un array de meses con sus celdas (42 días: 6 filas × 7 columnas) */
  const months = useMemo(() => {
    return Array.from({ length: visibleMonths }, (_, i) => {
      const base = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + i,
        1
      );
      const year = base.getFullYear();
      const month = base.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const startDay = new Date(year, month, 1).getDay();
      const daysInPrevMonth = new Date(year, month, 0).getDate();

      const cells = Array.from({ length: 42 }, (_, idx) => {
        let date: Date;
        let outside = false;
        const offset = idx - startDay;
        if (offset < 0) {
          // días del mes anterior
          date = new Date(year, month - 1, daysInPrevMonth + offset + 1);
          outside = true;
        } else if (offset >= daysInMonth) {
          // días del mes siguiente
          date = new Date(year, month + 1, offset - daysInMonth + 1);
          outside = true;
        } else {
          // días del mes actual
          date = new Date(year, month, offset + 1);
        }
        return { date, outside };
      });

      return { base, cells };
    });
  }, [currentMonth, visibleMonths]);

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div
      role="application"
      aria-label="Calendar"
      className="relative inline-block overflow-x-auto overflow-y-hidden rounded-lg bg-white shadow-lg"
      style={{ width: `${calendarWidth * visibleMonths}px` }}
    >
      {/* Header: navegación */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <button
          type="button" 
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-gray-200 "
          aria-label="Previous month"
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 16 16"
            className="w-4 h-4 stroke-current text-gray-600 "
          >
            <path
              d="M10 3.3L6 8l4 4.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </button>
        <h2 className="text-sm font-medium text-gray-600">
          {currentMonth.toLocaleString(locale, {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          type="button" 
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Next month"
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 16 16"
            className="w-4 h-4 stroke-current text-gray-600"
          >
            <path
              d="M6 3.3l4 4.7-4 4.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </button>
      </div>

      {/* Celdas de mes(s) */}
      <div className="flex">
        {months.map(({ base, cells }, mi) => (
          <div
            key={mi}
            className="w-full"
            style={{ width: `${calendarWidth}px` }}
          >
            {/* Días de la semana */}
            <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500">
              {["S", "D", "L", "M", "M", "J", "V"].map((d, idx) => (
                <div key={idx} className="py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 text-center text-sm">
              {cells.map(({ date, outside }, idx) => {
                const isSelected =
                  selectedDate?.toDateString() === date.toDateString();
                const isToday =
                  new Date().toDateString() === date.toDateString();
                return (
                  <button
                    type="button" 
                    key={idx}
                    onClick={() => !outside && handleSelect(date)}
                    disabled={outside}
                    className={[
                      "w-8 h-8 mx-auto my-1 flex items-center justify-center rounded-full transition",
                      outside
                        ? "text-gray-300 cursor-default"
                        : "hover:bg-blue-50",
                      isSelected ? "bg-blue-500 text-white" : "",
                      isToday ? "border border-blue-500" : "",
                    ].join(" ")}
                    aria-label={date.toDateString()}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
