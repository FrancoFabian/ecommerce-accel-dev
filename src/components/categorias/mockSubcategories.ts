

export interface MckCategory { 
    id: string;
    nombre: string;
    nivel: string;
}
type Subcategory = {
    id: string;
    nombre: string;
    nivel: string;
  };
type MockSubcategories = {
    [key: string]: Subcategory[];
  };
export const mockCategories:MckCategory[] = [
    {
      id: "22",
      nombre: "Videovigilancia",
      nivel: "1"
    },
    {
      id: "25",
      nombre: "Radiocomunicación",
      nivel: "1"
    },
    {
      id: "30",
      nombre: "Seguridad Electrónica",
      nivel: "1"
    }
  ];
  
  export const mockSubcategories: MockSubcategories = {
    "22": [
      { id: "206", nombre: "Cables y Conectores", nivel: "2" },
      { id: "208", nombre: "Energía", nivel: "2" },
      { id: "210", nombre: "Cámaras IP", nivel: "2" }
    ],
    "25": [
      { id: "220", nombre: "Radios Portátiles", nivel: "2" },
      { id: "222", nombre: "Antenas", nivel: "2" },
      { id: "224", nombre: "Accesorios", nivel: "2" }
    ],
    "30": [
      { id: "230", nombre: "Alarmas", nivel: "2" },
      { id: "232", nombre: "Control de Acceso", nivel: "2" },
      { id: "234", nombre: "Cerraduras Inteligentes", nivel: "2" }
    ]
  };