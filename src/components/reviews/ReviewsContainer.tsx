'use client';

import { useState} from 'react';

import { SearchInput } from "../searchbar/SearchInput";
import { Dropdown } from "./buttons/Dropdown";
import { Review, ReviewItem } from "./ReviewItem";


interface ReviewsContainerProps {
    reviews: Review[];
  }
export const ReviewsContainer = ({reviews}: ReviewsContainerProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('most_recent');
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSortChange = (key: string) => {
      setSortOption(key);
    };
  
    const filteredReviews = reviews.filter((review) =>
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const sortedReviews = [...filteredReviews].sort((a, b) => {
      switch (sortOption) {
        case 'most_recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'highest_rating':
          return b.rating - a.rating;
        case 'lowest_rating':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });
  
    const sortOptions = [
      { key: 'most_recent', label: 'Lo más reciente' },
      { key: 'highest_rating', label: 'Calificación más alta' },
      { key: 'lowest_rating', label: 'Calificación más baja' },
    ];
  
    return (
      <div className="mt-16 lg:col-span-8 lg:mt-0">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-large font-semibold">{reviews.length} Reseñas</h1>
         
            {/* Dropdown de ordenamiento */}
           
              <Dropdown
                options={sortOptions}
                selectedKey={sortOption}
                onSelect={handleSortChange}
              />
           
            {/* Campo de búsqueda */}
            
              <SearchInput
                placeholder="Buscar reseñas"
                value={searchTerm}
                onChange={handleSearchChange}
              />
           
          
        </header>
        {/* Lista de reseñas */}
        <div className="mt-4 flex flex-col">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    );
}
