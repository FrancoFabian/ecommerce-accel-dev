'use client';
import { useState } from 'react';
import { Command } from 'cmdk';
import { SearchIcon } from '@/icons/SearchIcon';
import { SearchInput } from './SearchInput';
import { CategoriesList } from './CategoriesList';
import { SuggestionsList } from './SuggestionsLIst';

export const SearchMenu = () => {
  const [value, setValue] = useState(''); // Valor actual del input
  const [categories, setCategories] = useState([
    { key: 'application', label: 'Application', selected: true, icon: <SearchIcon /> },
    { key: 'ai', label: 'AI', selected: false, icon: <SearchIcon /> },
    { key: 'marketing', label: 'Marketing', selected: false, icon: <SearchIcon /> },
    { key: 'ecommerce', label: 'E-commerce', selected: false, icon: <SearchIcon /> },
  ]);

  const handleCategorySelect = (key: string) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        selected: category.key === key,
      }))
    );
  };

  // Lista de sugerencias (puede filtrarse según el input)
  const suggestions = ['Example Item 1', 'Example Item 2', 'Example Item 3'];
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative bg-white border border-gray-300 dark:border-gray-700 rounded-lg max-h-full h-auto">
      <Command className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Campo de búsqueda */}
        <SearchInput value={value} setValue={setValue} />

        {/* Categorías iniciales */}
        {!value && <CategoriesList categories={categories} onSelect={handleCategorySelect} />}

        {/* Lista de sugerencias */}
        {value && filteredSuggestions.length > 0 && (
          <SuggestionsList value={value} suggestions={filteredSuggestions} />
        )}

        {/* Mensaje personalizado cuando no hay resultados */}
        {value && filteredSuggestions.length === 0 && (
          <div className="flex flex-col text-center items-center justify-center h-32">
            <div>
              <p>No results for &quot;{value}&quot;</p>
              <p className="text-default-400">Try searching for something else.</p>
            </div>
          </div>
        )}
      </Command>
    </div>
  );
};
