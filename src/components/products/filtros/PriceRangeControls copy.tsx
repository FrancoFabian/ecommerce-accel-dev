


'use client';
import React, { useState } from 'react';

interface PriceRangeThumbsProps {
  thumbRefs: React.MutableRefObject<[HTMLDivElement | null, HTMLDivElement | null]>;
  values: [number, number];
  handleMouseDown: (index: number) => void;
  getPercentage: (value: number) => number;
  setValues: React.Dispatch<React.SetStateAction<[number, number]>>;
  min: number;
  max: number;
  step: number;
  handleMouseUp: () => void;
}

export const PriceRangeControls = ({
  thumbRefs,
  values,
  handleMouseDown,
  getPercentage,
  setValues,
  min,
  max,
  step,
  handleMouseUp,
}: PriceRangeThumbsProps) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleMouseDownLocal = (index: number) => {
    setDraggingIndex(index);
    handleMouseDown(index);
    document.body.classList.add('no-text-select');
    if (thumbRefs.current[index]) {
      thumbRefs.current[index]!.style.cursor = 'grabbing';
      const innerCircle =
        thumbRefs.current[index]!.querySelector('.inner-circle');
      if (innerCircle) {
        innerCircle.classList.add('scale-75');
      }
    }
  };

  const handleMouseUpLocal = () => {
    handleMouseUp();
    setDraggingIndex(null);
    thumbRefs.current.forEach((thumbRef) => {
      if (thumbRef) {
        thumbRef.style.cursor = 'grab';
        const innerCircle = thumbRef.querySelector('.inner-circle');
        if (innerCircle) {
          innerCircle.classList.remove('scale-75');
        }
      }
    });
  };
  return (
    <>
      {[0, 1].map((index) => (
        <div
          key={index}
          ref={(el) => {
            thumbRefs.current[index] = el;
          }}
          onMouseDown={() => handleMouseDownLocal(index)}
          onMouseUp={handleMouseUpLocal}
          // onTouchStart={(e) => handleTouchStart(index, e)}
          className="flex justify-center items-center w-5 h-5 rounded-full bg-white border-2 border-gray-900 top-1/2 cursor-grab data-[dragging=true]:cursor-grabbing"
          style={{
            position: 'absolute',
            left: `calc(${getPercentage(values[index])}% - 10px)`,
            transform: 'translateY(-50%)',
            touchAction: 'none',
            zIndex: draggingIndex === index ? 2 : 1, // Controlar el orden de renderizado
          }}
        >
          <div className="inner-circle w-3 h-3 rounded-full bg-primary transition-transform duration-200 ease-in-out" />
          <div
            style={{
              border: '0px',
              clip: 'rect(0px, 0px, 0px, 0px)',
              clipPath: 'inset(50%)',
              height: '1px',
              margin: '-1px',
              overflow: 'hidden',
              padding: '0px',
              position: 'absolute',
              width: '1px',
              whiteSpace: 'nowrap',
            }}
          >
            <input
              tabIndex={0}
              aria-labelledby={`react-aria-${index}`}
              min={min}
              max={max}
              step={step}
              aria-orientation="horizontal"
              aria-valuetext={`$${values[index]}.00`}
              type="range"
              value={values[index]}
              onChange={(e) => {
                const newValue = Math.round(Number(e.target.value) / step) * step;
                setValues((prevValues) => {
                  const newValues = [...prevValues] as [number, number];
                  newValues[index] = newValue;
                  return newValues;
                });
              }}
              style={{
                appearance: 'none',
                width: '100%',
                background: 'none',
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};