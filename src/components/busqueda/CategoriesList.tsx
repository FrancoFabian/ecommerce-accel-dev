import { DynamicCategoryPanel } from "./DynamicCategoryPanel";

interface Category {
  key: string;
  selected: boolean;
  icon: React.ReactNode;
  label: string;
}

export const CategoriesList = ({ categories, onSelect }: { categories: Category[], onSelect: (key: string) => void }) => {
    return (
      <div className="relative grid grid-cols-12">
        {/* Sidebar de Categorías */}
        <div className="col-span-4 flex flex-col gap-2 border-r border-gray-300 px-4 py-2">
          <p className="text-xs font-semibold leading-4 text-default-900">Categories</p>
          <ul className="w-full flex flex-col outline-none gap-2" role="listbox">
            {categories.map((category: Category) => (
              <li
                key={category.key}
                role="option"
                aria-selected={category.selected}
                className={`flex group items-center justify-between relative px-2 
                    w-full box-border rounded-lg subpixel-antialiased 
                    cursor-pointer tap-highlight-transparent outline-none 
                    h-[50px] gap-3 py-2 ${
                  category.selected ? 'bg-gray-400/40 text-slate-800' : 'bg-gray-300/50 text-medium text-slate-700'
                } hover:bg-gray-400/40`}
                onClick={() => onSelect(category.key)}
              >
                {category.icon}
                <span className="flex-1 text-small font-normal">{category.label}</span>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Panel Dinámico de la Categoría */}
        <div className="pt-2 pr-4 pb-6 overflow-y-auto col-span-8 flex">
          {/* Aquí se renderiza el componente dinámico basado en la categoría seleccionada */}
          <DynamicCategoryPanel categories={categories} />
        </div>
      </div>
    );
  };