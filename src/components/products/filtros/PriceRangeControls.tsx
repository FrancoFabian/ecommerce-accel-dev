
import {  useCallback,useEffect, useState } from "react";

interface PriceRangeControlsProps {
  thumbRefs: React.MutableRefObject<
    [HTMLDivElement | null, HTMLDivElement | null]
  >;
  values: [number, number];
  handleStart: (index: number) => void;
  handleEnd: () => void;
  getPercentage: (value: number) => number;
  setValues: React.Dispatch<React.SetStateAction<[number, number]>>;
  min: number;
  max: number;
  step: number;
}

export const PriceRangeControls: React.FC<PriceRangeControlsProps> = ({
  thumbRefs,
  values,
  handleStart,
  handleEnd,
  getPercentage,
  setValues,
  min,
  max,
  step,
}) => {
 const [thumbZIndices, setThumbZIndices] = useState([1, 2]); 
 const [draggingIndex, setDraggingIndex] = useState<number | null>(null); 

 useEffect(() => {
   if (draggingIndex !== null) {
     setThumbZIndices((prevZIndices) =>
       prevZIndices.map((zIndex, index) =>
         index === draggingIndex ? 2 : 1,
       ),
     );
   }
 }, [draggingIndex]);

 const handleStartLocal = useCallback((index: number) => {
  // console.log(`handleStartLocal thumb ${index}`);
   setDraggingIndex(index);
   handleStart(index);
 }, [handleStart]);

 const handleEndLocal = useCallback(() => {
   //console.log(`handleEndLocal`);
   setDraggingIndex(null);
   handleEnd();
 }, [handleEnd]);

 useEffect(() => {
   const thumbs = thumbRefs.current;
   thumbs.forEach((thumb, index) => {
     if (thumb) {
       thumb.addEventListener('touchstart', (e) => {
         e.preventDefault();
         handleStartLocal(index);
       }, { passive: false });
       thumb.addEventListener('touchend', (e) => {
         e.preventDefault();
         handleEndLocal();
       }, { passive: false });
     }
   });
   return () => {
     thumbs.forEach((thumb,index) => {
       if (thumb) {
         thumb.removeEventListener('touchstart', (e) => {
           e.preventDefault();
           handleStartLocal(index);
         });
         thumb.removeEventListener('touchend', (e) => {
           e.preventDefault();
           handleEndLocal();
         });
       }
     });
   };
 }, [thumbRefs, handleStartLocal, handleEndLocal]);

  return (
    <>
      {[0, 1].map((index) => (
        <div
          key={index}
          ref={(el: HTMLDivElement | null) => {
            thumbRefs.current[index] = el;
          }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary shadow-lg cursor-grab price-range-controls" 
          style={{
            left: `${getPercentage(values[index])}%`,
            zIndex: thumbZIndices[index], 
          }}
          onMouseDown={(/*e*/) => {
            //console.log(`onMouseDown thumb ${index}`); 
            handleStartLocal(index); 
          }}
          onMouseUp={() => {
            //console.log(`onMouseUp thumb ${index}`);
            handleEndLocal(); 
          }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={values[index]}
          aria-valuetext={`$${values[index]}`}
          tabIndex={0}
          onKeyDown={(e) => {
            const value = values[index];
            let newValue = value;

            switch (e.key) {
              case 'ArrowLeft':
              case 'ArrowDown':
                newValue = Math.max(value - step, min);
                break;
              case 'ArrowRight':
              case 'ArrowUp':
                newValue = Math.min(value + step, max);
                break;
              case 'Home':
                newValue = min;
                break;
              case 'End':
                newValue = max;
                break;
              default:
                return;
            }

            if (newValue !== value) {
              e.preventDefault();
              setValues((prev) => {
                const newValues = [...prev] as [number, number];
                newValues[index] = newValue;
                return newValues;
              });
            }
          }}
        >
          <div className="inner-circle w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200" />
        </div>
      ))}
    </>
  );
};








