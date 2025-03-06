'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PriceRangeControls } from './PriceRangeControls';
import './styles.css';
import { InputNumberPrice } from './InputNumberPrice';
import { PriceRangeHistogram } from './PriceRangeHistogram';

const MemorizedPriceRangeControls = React.memo(PriceRangeControls);
const MemorizedInputNumberPrice = React.memo(InputNumberPrice);
const MemorizedPriceRangeHistogram = React.memo(PriceRangeHistogram);

interface PriceRangeProps {
  min: number;
  max: number;
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  step?: number;
  barHeights: number[];
}

export const PriceRange = ({
  min,
  max,
  defaultValue = [min, max],
  /*onChange,*/
  step = 1,
  barHeights,
}: PriceRangeProps) => {
  const [values, setValues] = useState<[number, number]>(() => {
    const [defaultMin, defaultMax] = defaultValue;
    return [
      Math.max(min, Math.min(max, defaultMin)),
      Math.min(max, Math.max(min, defaultMax)),
    ];
  });
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<[HTMLDivElement | null, HTMLDivElement | null]>([
    null,
    null,
  ]);

  const handleStart = useCallback((index: number) => {
    setActiveDragIndex(index);
    document.body.classList.add('no-text-select');
    if (thumbRefs.current[index]) {
      thumbRefs.current[index]!.style.cursor = 'grabbing';
      const innerCircle = thumbRefs.current[index]!.querySelector('.inner-circle');
      if (innerCircle instanceof HTMLElement) {
        innerCircle.classList.add('scale-75');
      }
    }
  }, []); 

  const handleEnd = useCallback(() => {
    setActiveDragIndex(null);
    document.body.classList.remove('no-text-select');
    thumbRefs.current.forEach((thumbRef) => {
      if (thumbRef) {
        thumbRef.style.cursor = 'grab';
        const innerCircle = thumbRef.querySelector('.inner-circle');
        if (innerCircle instanceof HTMLElement) {
          innerCircle.classList.remove('scale-75');
        }
      }
    });
  }, []); 

  const handleMove = useCallback(
    (clientX: number) => {
      if (activeDragIndex === null || !rangeRef.current) return;

      const rect = rangeRef.current.getBoundingClientRect();
      let position = clientX - rect.left;
      position = Math.max(0, Math.min(rect.width, position));
      const percentage = position / rect.width;

      const rawNewValue = min + percentage * (max - min);
      const newValue = Math.round(rawNewValue / step) * step;

      setValues((prevValues) => {
        const newValues = [...prevValues] as [number, number];
        let limitedNewValue = newValue;

        if (activeDragIndex === 0) {
          limitedNewValue = Math.min(newValue, prevValues[1]);
        } else {
          limitedNewValue = Math.max(newValue, prevValues[0]);
        }

        newValues[activeDragIndex] = limitedNewValue;

        return newValues;
      });
    },
    [activeDragIndex, min, max, step]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => handleMove(event.clientX),
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      handleMove(touch.clientX);
    },
    [handleMove]
  );

  useEffect(() => {
    const handleMouseUpDocument = (event: MouseEvent) => {
      if (event.button !== 0) return;
      handleEnd();
    };

    const handleTouchEndDocument = () => handleEnd();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUpDocument);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEndDocument);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUpDocument);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEndDocument);
    };
  }, [handleMouseMove, handleEnd, handleTouchMove]);

  const getPercentage = useCallback((value: number) => {
    return ((value - min) / (max - min)) * 100;
  }, [min, max]);

  const getBarIndex = useCallback((value: number) => {
    return Math.floor(((value - min) / (max - min)) * barHeights.length);
  }, [min, max, barHeights.length]);

  return (
    <>
      <div className="flex flex-col bg-white mb-2 gap-1" ref={rangeRef}>
        <MemorizedPriceRangeHistogram
          barHeights={barHeights}
          values={values}
          getBarIndex={getBarIndex}
        />
        <div
          className="flex flex-col w-full gap-1"
          role="group"
          aria-label="Pricing Filter"
        >
          <div className="relative flex gap-2 items-center">
            <div
              className="flex w-full relative rounded-full bg-gray-400/50 border-x-transparent h-1 my-[calc((theme(spacing.5)-theme(spacing.1))/2)] border-x-[calc(theme(spacing.5)/2)]"
              style={{ position: 'relative', touchAction: 'none' }}
            >
              <div
                className="h-full absolute bg-primary"
                style={{
                  left: `${getPercentage(values[0])}%`,
                  right: `${100 - getPercentage(values[1])}%`,
                }}
              />
              <MemorizedPriceRangeControls
                thumbRefs={thumbRefs}
                values={values}
                handleStart={handleStart}
                handleEnd={handleEnd}
                getPercentage={getPercentage}
                setValues={setValues}
                min={min}
                max={max}
                step={step}
              />
            </div>
          </div>
        </div>
      </div>
      <MemorizedInputNumberPrice
        minPrice={values[0]}
        maxPrice={values[1]}
        onMinPriceChange={(newMin) => setValues([newMin, values[1]])}
        onMaxPriceChange={(newMax) => setValues([values[0], newMax])}
        maxRange={max}
      />
    </>
  );
};

