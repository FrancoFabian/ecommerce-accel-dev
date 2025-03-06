'use client';
import { useState } from 'react';
import { mockSubcategories } from './mockSubcategories';
import SubcategoryList from './SubCategory';


interface Category {
  id: string;
  nombre: string;
  nivel: string;
}

interface CategoryAccordionProps {
  categories: Category[];
}

const CategoryAccordion = ({ categories }:CategoryAccordionProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="space-y-2">
      {categories.map((category:Category) => (
        <div key={category.id} className="border rounded-md overflow-hidden">
          <button
            className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => toggleCategory(category.id)}
          >
            <div className="flex items-center justify-between">
              <span>{category.nombre}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  expandedCategory === category.id ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {expandedCategory === category.id && (
            <div className="px-4 py-2">
              <SubcategoryList subcategories={mockSubcategories[category.id] || []} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoryAccordion;