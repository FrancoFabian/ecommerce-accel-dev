
import { Category } from "@/types/category";
import { CategoryCard } from "./CategoriaCard";

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

export const CategoryGrid = ({ categories, onCategoryClick }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 auto-rows-fr gap-2 lg:gap-6 md-gap-6 sm:gap-6  px-6 pt-0 pb-20">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.title}
          description={category.description}
          icon={category.icon}
          onClick={() => onCategoryClick(category)}
        />
      ))}
    </div>
  );
};