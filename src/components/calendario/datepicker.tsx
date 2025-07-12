// components/DatePicker.tsx
'use client'

import { useState, useRef, useEffect, ChangeEvent } from 'react'
import { format, parse } from 'date-fns'
import { Calendar } from '@/components/calendario/calendar'

interface DatePickerProps {
  value?: Date
  onChange: (date: Date) => void
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const mRef = useRef<HTMLInputElement>(null)
  const dRef = useRef<HTMLInputElement>(null)
  const yRef = useRef<HTMLInputElement>(null)
  const [openCalendar, setOpenCalendar] = useState(false)

  // Estados individuales de segmentos
  const [month, setMonth] = useState(value ? format(value, 'MM') : '')
  const [day, setDay] = useState(value ? format(value, 'dd') : '')
  const [year, setYear] = useState(value ? format(value, 'yyyy') : '')

  // Sincronizar si `value` cambia externamente
  useEffect(() => {
    if (value) {
      setMonth(format(value, 'MM'))
      setDay(format(value, 'dd'))
      setYear(format(value, 'yyyy'))
    }
  }, [value])

  // Close calendar al click fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenCalendar(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Intentar parsear fecha completa al cambiar cualquier parte
  const tryEmit = (m: string, d: string, y: string) => {
    if (m.length === 2 && d.length === 2 && y.length === 4) {
      const parsed = parse(`${m}/${d}/${y}`, 'MM/dd/yyyy', new Date())
      if (!isNaN(parsed.getTime())) onChange(parsed)
    }
  }

  const handleSegment = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
    max: number,
    nextRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    let v = e.target.value.replace(/\D/g, '') // solo dígitos
    if (v.length > max) v = v.slice(0, max)
    setter(v)
    if (v.length === max && nextRef?.current) {
      nextRef.current.focus()
    }
    // emitir nuevo valor
    const m = e.target === mRef.current ? v : month
    const d = e.target === dRef.current ? v : day
    const y = e.target === yRef.current ? v : year
    tryEmit(m, d, y)
  }

  return (
    <div
      ref={ref}
      className="relative inline-flex flex-col gap-y-1.5 w-full max-w-[190px]"
    >
      <div className="relative inline-flex items-center w-full px-5 border-2 border-gray-300 bg-transparent rounded-lg h-16 md:h-12 sm:h-12 lg:h-12 2xl:h-16 text-lg lg:text-[0.999rem] md:text-[0.999rem] sm:text-[0.999rem] 2xl:text-lg focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-transparent transition">
        {/* Mes */}
        <input
          ref={mRef}
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={month}
          placeholder="MM"
          onChange={e => handleSegment(e, setMonth, 2, dRef)}
          className="w-6 text-sm text-center tabular-nums outline-none"
        />
        <span className="px-1 text-gray-300 select-none">/</span>

        {/* Día */}
        <input
          ref={dRef}
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={day}
          placeholder="DD"
          onChange={e => handleSegment(e, setDay, 2, yRef)}
          className="w-6 text-sm text-center tabular-nums outline-none"
        />
        <span className="px-1 text-gray-300 select-none">/</span>

        {/* Año */}
        <input
          ref={yRef}
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={year}
          placeholder="YYYY"
          onChange={e => handleSegment(e, setYear, 4)}
          className="w-8 text-sm text-center tabular-nums outline-none"
        />

        {/* Botón calendario */}
        <button
          type="button"
          className="ml-2 p-1 hover:bg-gray-200 rounded-full"
          onClick={() => setOpenCalendar(v => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </button>
      </div>

      {openCalendar && (
        <div className="absolute z-20 mt-1">
          <Calendar
            visibleMonths={1}
            calendarWidth={280}
            locale="es-ES"
            onDateChange={d => {
              onChange(d)
              setOpenCalendar(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
