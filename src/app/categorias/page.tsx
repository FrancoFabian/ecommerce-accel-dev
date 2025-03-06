// 'use client';
// import { useState, useMemo } from 'react';
// import SearchBar from '@/components/categorias/SearchBar';
// import CategoryAccordion from '@/components/categorias/CategoryAccordion';
// import { mockCategories } from '@/components/categorias/mockSubcategories';
import { CategoryHome } from '../../components/categorias/CategoryHome';
// interface Category {
//     id: string;
//     nombre: string;
//     nivel: string;
// }
export default function CategoriesPage() {
    // const [categories] = useState<Category[]>(mockCategories);
    // const [searchTerm, setSearchTerm] = useState('');

    // const filteredCategories = useMemo(() => {
    //     return categories.filter((category) =>
    //         category.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    // }, [categories, searchTerm]);
    return (
        <div className="w-full">
            <CategoryHome/>
        </div>
    );
}