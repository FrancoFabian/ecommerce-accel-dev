
// interfaces/Review.ts

import { StarsSvg } from "../products/StarsSvg";

import Image from 'next/image';

export interface Review {
    id: number;
    avatar: string;
    name: string;
    date: string;
    rating: number; // De 1 a 5
    title: string;
    content: string;
  }
  interface ReviewProps {
    review: Review;
  }
  
export const ReviewItem = ({review}: ReviewProps) => {
    const { avatar, name, date, rating, title, content } = review;

  return (
    <div className="border-divider px-6 py-10 border-b">
    <div>
      <div className="flex items-center justify-between">
        {/* Información del revisor */}
        <div className="flex items-center gap-2">
          <div
            tabIndex={-1}
            className="inline-flex items-center gap-2 rounded-small outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span
              tabIndex={-1}
              className="flex relative bg-gray-400 text-white justify-center items-center overflow-hidden w-10 h-10 bg-default text-default-foreground rounded-full"
            >
              {
                avatar !== "" ? 
              
              <Image
                src={avatar}
                alt={`Avatar de ${name}`}
                className="object-cover w-full h-full transition-opacity duration-500"
                data-loaded="true"
                width={40}
                height={40}
              />:
              name.charAt(0)
}
            </span>
            <div className="flex flex-col items-start">
              <span className="text-small font-medium">{name}</span>
              <span className="text-foreground-400 text-small">{date}</span>
            </div>
          </div>
        </div>
        {/* Calificación de estrellas */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <StarsSvg
              key={index}
              isFilled={index < rating}
              color={index < rating ? '#eda319' : '#8d8c8e'}
              className="text-lg sm:text-xl"
            />
          ))}
        </div>
      </div>
      {/* Contenido de la reseña */}
      <div className="mt-4 w-full">
        <p className="font-medium text-default-900">{title}</p>
        <p className="mt-2 text-default-500">{content}</p>
      </div>
    </div>
  </div>
  )
}


