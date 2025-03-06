'use client';
import { useState } from "react";
import { RatingComponent } from "./RatingComponent"
import { ReviewModal } from "./ReviewModal"
import { ReviewsContainer } from "./ReviewsContainer"
import { Review } from "./ReviewItem";
const ratingsData = [
    { stars: 5, percentage: 86 },
    { stars: 4, percentage: 36 },
    { stars: 3, percentage: 18 },
    { stars: 2, percentage: 24 },
    { stars: 1, percentage: 22 },
  ];
  const reviewsData: Review[] = [
    {
      id: 1,
      // avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708c',
      avatar:'',
      name: 'Juan Pérez',
      date: '1 de agosto de 2021',
      rating: 5,
      title: 'Gran producto',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/150?u=a04258ab4e29066708c',
      name: 'Jane Doe',
      date: '1 de agosto de 2021',
      rating: 4,
      title: 'Producto fantástico',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 3,
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29066708c',
      name: 'Roberto Pérez',
      date: '1 de agosto de 2021',
      rating: 3,
      title: 'Hermoso producto',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 4,
      avatar: 'https://i.pravatar.cc/150?u=a04258a14e29066708c',
      name: 'Marcar Doe',
      date: '1 de agosto de 2021',
      rating: 2,
      title: 'Producto promedio',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 5,
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29526708c',
      name: 'Frank Doe',
      date: '1 de agosto de 2021',
      rating: 1,
      title: 'Producto decepcionante',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 6,
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29926708c',
      name: 'Zoe Doe',
      date: '1 de agosto de 2021',
      rating: 5,
      title: 'Gran producto',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 7,
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29b26708c',
      name: 'Bob Doe',
      date: '1 de agosto de 2021',
      rating: 4,
      title: 'Buen producto',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 8,
      avatar: 'https://i.pravatar.cc/150?u=a04258b14e29326708c',
      name: 'Francisco Pérez',
      date: '1 de agosto de 2021',
      rating: 3,
      title: 'Producto promedio',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
    {
      id: 9,
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29326708c',
      name: 'Milano Doe',
      date: '1 de agosto de 2021',
      rating: 2,
      title: 'Mal producto',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    },
  ];
  

export const Reviews = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
      setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
      setIsModalOpen(false); // Cierra el modal
  };
  return (
    <div className="mx-auto lg:mt-22 md:mt-14 sm:mt-10 w-full max-6xl px-2 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-12 lg:px-6">
       <div className="lg:col-span-4">
       <RatingComponent
      averageRating={4.4}
      totalReviews={139}
      ratingsBreakdown={ratingsData}
      onClick={openModal}
    />
       </div>
        
    <ReviewsContainer reviews={reviewsData} />
    {isModalOpen && <ReviewModal onClose={closeModal} />}
    </div>
  )
}
