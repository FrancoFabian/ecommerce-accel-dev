

interface Subcategory {
  id: string;
  nombre: string;
  nivel: string;
}

interface SubcategoryListProps {
  subcategories: Subcategory[];
}

const SubcategoryList = ({ subcategories }:SubcategoryListProps) => {
  return (
    <div className="space-y-2">
      {subcategories.map((subcategory) => (
        <div key={subcategory.id} className="text-sm text-gray-600">
          {subcategory.nombre}
        </div>
      ))}
    </div>
  );
};

export default SubcategoryList;