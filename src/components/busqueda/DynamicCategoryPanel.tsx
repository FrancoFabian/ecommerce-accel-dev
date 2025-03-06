
interface Category {
  key: string;
  label: string;
  selected: boolean;
}

export const DynamicCategoryPanel = ({ categories }: { categories: Category[] }) => {
    const selectedCategory = categories.find((category: Category) => category.selected);
  
    return (
      <div className="w-full h-full">
        {/* Renderiza el componente correspondiente según la categoría */}
        {selectedCategory ? (
          <div className="p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">{selectedCategory.label}</h3>
            {/* Lógica específica para cada categoría */}
            {selectedCategory.key === 'application' && (
              <p>Contenido de la categoría &quot;Application&quot;.</p>
            )}
            {selectedCategory.key === 'ai' && (
              <p>Contenido de la categoría &quot;AI&quot;.</p>
            )}
            {selectedCategory.key === 'marketing' && (
              <p>Contenido de la categoría &quot;Marketing&quot;.</p>
            )}
            {selectedCategory.key === 'ecommerce' && (
              <p>Contenido de la categoría &quot;E-commerce&quot;.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Selecciona una categoría para ver contenido.</p>
        )}
      </div>
    );
  };