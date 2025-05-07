'use client'
import { useState, useRef, useEffect, useCallback } from 'react';

interface UsePriceRangeProps {
  min: number;
  max: number;
  defaultValue: [number, number];
  onChange: (value: [number, number]) => void;
  step: number;
}

export const usePriceRange = ({
  min,
  max,
  defaultValue,
  onChange,
  step,
}: UsePriceRangeProps) => {
  const [values, setValues] = useState<[number, number]>(() => {
    const [defaultMin, defaultMax] = defaultValue;
    return [
      Math.max(min, Math.min(max, defaultMin)),
      Math.min(max, Math.max(min, defaultMax)),
    ];
  });
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<[HTMLDivElement | null, HTMLDivElement | null]>([null, null]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  const handleMouseDown = (index: number) => {
    setActiveDragIndex(index);
    if (thumbRefs.current[index]) {
      thumbRefs.current[index]!.style.cursor = 'grabbing';
      const innerCircle = thumbRefs.current[index]!.querySelector('.inner-circle');
      if (innerCircle) {
        innerCircle.classList.add('scale-75');
      }
    }
  };

  const handleMouseUp = useCallback(() => {
    setActiveDragIndex(null);
    thumbRefs.current.forEach(thumbRef => {
      if (thumbRef) {
        thumbRef.style.cursor = 'grab';
        const innerCircle = thumbRef.querySelector('.inner-circle');
        if (innerCircle) {
          innerCircle.classList.remove('scale-75');
        }
      }
    });
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (activeDragIndex === null || !rangeRef.current) return;

    const rect = rangeRef.current.getBoundingClientRect();
    let position = event.clientX - rect.left;
    position = Math.max(0, Math.min(rect.width, position));
    const percentage = position / rect.width;

    const rawNewValue = min + (percentage * (max - min));
    const newValue = Math.round(rawNewValue / step) * step;

    setValues((prevValues) => {
      const newValues = [...prevValues] as [number, number];
      newValues[activeDragIndex] = newValue;
      if (activeDragIndex === 0) {
        return [newValues[0], Math.max(newValues[0], newValues[1])];
      } else {
        return [Math.min(newValues[0], newValues[1]), newValues[1]];
      }
    });
  }, [activeDragIndex, min, max, step]);

  useEffect(() => {
    const handleMouseUpDocument = (event: MouseEvent) => {
      if (event.button !== 0) return;
      handleMouseUp();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUpDocument);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpDocument);
    };
  }, [handleMouseMove, handleMouseUp]);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getBarIndex = (value: number) => {
    return Math.floor(((value - min) / (max - min)) * 100);
  };

  return {
    values,
    rangeRef,
    containerRef,
    handleMouseDown,
    getPercentage,
    getBarIndex,
  };
};