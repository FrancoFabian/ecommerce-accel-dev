import { useState } from "react";
import { StarsSvg } from "../products/StarsSvg";
interface Props {
    initialRating?: number; // Calificación inicial
    maxValue?: number; // Máximo número de estrellas
    gaps?: string; // Clases para los márgenes
    onChange?: (rating: number) => void; // Callback para notificar cambios en la calificación
  }
  
  export const InteractiveStarsQualification: React.FC<Props> = ({
    initialRating = 0,
    maxValue = 5,
    gaps = "",
    onChange,
  }) => {
    const [rating, setRating] = useState<number>(initialRating);
  
    const handleStarClick = (index: number) => {
      const newRating = index + 1; // Estrellas empiezan en 1
      setRating(newRating);
      if (onChange) onChange(newRating);
    };
  
    const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
      const touchX = e.touches[0].clientX;
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const relativeX = touchX - rect.left;
      const starWidth = rect.width / maxValue;
      const newRating = Math.ceil(relativeX / starWidth);
      setRating(newRating);
      if (onChange) onChange(newRating);
    };
  
    return (
      <div
        className={`flex ${gaps} cursor-pointer`}
        onTouchStart={handleTouch} // Soporte táctil
        onTouchMove={handleTouch} // Cambios dinámicos al mover el dedo
      >
        {Array.from({ length: maxValue }, (_, index) => (
          <div
            key={index}
            className="relative"
            onClick={() => handleStarClick(index)} // Soporte para clic
            style={{ touchAction: "none" }} // Evitar gestos no deseados
          >
            <StarsSvg
              isFilled={index < rating}
              color={index < rating ? "#F5A524" : "gray-200"} // Cambia colores dinámicamente
            />
          </div>
        ))}
      </div>
    );
  };