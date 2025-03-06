'use client';
import { Category } from "@/types/category";
import { useState } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { CategoryGrid } from "./CategoryGrid";
import { Videovigilancia } from "@/icons/categorias/VideovigilanciaIcon";
import { Controldeacceso } from "@/icons/categorias/Controldeacceso";
import { Energia } from "@/icons/categorias/Energia";
import { Detecciondefuego } from "@/icons/categorias/Detecciondefuego";
import { CasaInteligente } from "@/icons/categorias/Casainteligente";
import { Radiocomunicaciones } from '../../icons/categorias/Radiocomunicaciones';
import { Redes } from "@/icons/categorias/Redes";
import { Cableadoestructurado } from "@/icons/categorias/Cableadoestructurado";
import { Telematica } from "@/icons/categorias/Telematica";
import { Audiovideo } from "./Audiovideo";
import { Robot } from "./Robots";
import { ProductsGrid } from "../products/oneproduct/ProductGrid";
import { ProductCardProps } from "@/types/product";


const mockCategories: Record<string, Category> = {
  videovigilance: {
    id: "22",
    title: "Videovigilancia",
    description: "Cámaras y sistemas de seguridad",
    icon: <Videovigilancia className="w-[3.5rem] h-[3.5rem] text-primary" />,
  },
  accessControl: {
    id: "37",
    title: "Control de Acceso",
    description: "Dispositivos para control de acceso",
    icon: <Controldeacceso className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  energy: {
    id: "30",
    title: "Energía",
    description: "Soluciones de energía y respaldo",
    icon: <Energia className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  fireDetection: {
    id: "38",
    title: "Detección de Fuego",
    description: "Sistemas de detección y alarma",
    icon: <Detecciondefuego className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  alarms: {
    id: "32",
    title: "Alarmas / Intrusión y Casa Inteligente",
    description: "Sistemas de alarma y automatización",
    icon: <CasaInteligente className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  radiocommunication: {
    id: "25",
    title: "Radiocomunicación",
    description: "Sistemas de comunicación por radio",
    icon: <Radiocomunicaciones className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  networks: {
    id: "26",
    title: "Redes e IT",
    description: "Infraestructura de redes e informática",
    icon: <Redes className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  structuredCabling: {
    id: "65811",
    title: "Cableado Estructurado",
    description: "Soluciones de cableado estructurado",
    icon: <Cableadoestructurado className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  iotGps: {
    id: "27",
    title: "IoT / GPS / Telemática y Señalización Audiovisual",
    description: "Dispositivos IoT y sistemas audiovisuales",
    icon: <Telematica className="h-[3.5rem] w-[3.5rem] text-primary" color="transparent" />,
  },
  audioVideo: {
    id: "665223",
    title: "Audio y Video",
    description: "Equipos de audio y video",
    icon: <Audiovideo className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
  robots: {
    id: "66630",
    title: "Robots e Industrial",
    description: "Sistemas robóticos e industriales",
    icon: <Robot className="h-[3.5rem] w-[3.5rem] text-primary" />,
  },
};




export const CategoryHome = () => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<Array<{ id: string; title: string }>>([
    { id: "root", title: "Inicio" },
  ]);

  // Este estado relaciona categoryId -> [subcategorías cargadas]
  const [subcategoriesMap, setSubcategoriesMap] = useState<Record<string, Category[]>>({});

  // Estado extra para manejar productos
  const [products, setProducts] = useState<ProductCardProps[]>([]); 
  // O usa la interfaz correcta: ProductCardProps[], si la tienes en tu /types

  // Modo de visualización: "categories" o "products"
  const [viewMode, setViewMode] = useState<"categories" | "products">("categories");

  /**
   *  Función para cargar subcategorías desde la API
   */
  const fetchSubcategories = async (categoryId: string) => {
    try {
      const res = await fetch(`/api/subcategories?categoryId=${categoryId}`);
      if (!res.ok) {
        throw new Error(`Error al obtener subcategorías de ${categoryId}`);
      }
      const data = await res.json();

      const mappedSubcategories: Category[] = (data.subcategorias || []).map(
        (sub: { id: string; nombre: string }) => ({
          id: sub.id,
          title: sub.nombre,
          description: '',
          icon: undefined,
        })
      );

      setSubcategoriesMap((prev) => ({
        ...prev,
        [categoryId]: mappedSubcategories,
      }));

      return mappedSubcategories;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  /**
   *  Función para cargar productos desde la API
   */
  const fetchProducts = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/productscategory?categoria=${categoryId}`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error(`Error al cargar productos para la categoría ${categoryId}`);
      }
      const data = await response.json();
      // Ajusta el tipo de data (ProductResponse) según tu interfaz

      setProducts(data.productos || []);
      // Cambiamos el modo de visualización a "products"
      setViewMode("products");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Manejo de clic en categoría
   * 1. Consultar subcategorías.
   * 2. Si no existen subcategorías => es "categoría final" => fetchProducts.
   */
  const handleCategorySelect = async (categoryId: string, categoryTitle: string) => {
    setCurrentCategory(categoryId);
    // Agregar al breadcrumb
    setBreadcrumb((prev) => [...prev, { id: categoryId, title: categoryTitle }]);

    // Verificamos si ya tenemos subcategorías en nuestro estado
    let subCats = subcategoriesMap[categoryId];
    if (!subCats) {
      subCats = await fetchSubcategories(categoryId);
    }

    // Si NO hay subcategorías, se asume que es categoría final
    if (!subCats || subCats.length === 0) {
      fetchProducts(categoryId);
    } else {
      // Si sí hay subcategorías, cambiamos el modo de vista a "categories"
      setViewMode("categories");
    }
  };

  /**
   * Cuando el usuario hace clic en el breadcrumb
   */
  const handleBreadcrumbNavigate = (id: string) => {
    if (id === "root") {
      // Ir a la raíz
      setBreadcrumb([{ id: "root", title: "Inicio" }]);
      setCurrentCategory(null);
      setProducts([]); // limpiamos productos
      setViewMode("categories"); // Volvemos a mostrar categorías de nivel 1
      return;
    }

    // Si navegan a un breadcrumb intermedio:
    const index = breadcrumb.findIndex((item) => item.id === id);
    if (index >= 0) {
      setBreadcrumb(breadcrumb.slice(0, index + 1));
      const newCurrent = breadcrumb[index].id;
      setCurrentCategory(newCurrent);

      // Lógica para ver si esa categoría tenía subcategorías o era final
      const subCats = subcategoriesMap[newCurrent];
      if (!subCats || subCats.length === 0) {
        // Asumimos que es final, recargamos productos
        fetchProducts(newCurrent);
      } else {
        setViewMode("categories");
      }
    }
  };

  /**
   *  Determinar categorías actuales o productos a renderizar según el viewMode
   */
  const getCurrentCategories = (): Category[] => {
    // Si no hay categoría seleccionada, mostramos "mockCategories"
    if (!currentCategory) {
      return Object.values(mockCategories).map((cat) => ({
        ...cat,
        subcategories: [],
      }));
    }
    // Si sí hay currentCategory, mostramos las subcategorías cargadas
    return subcategoriesMap[currentCategory] || [];
  };

  // Render principal
  return (
    <div className="h-[85vh] flex w-full flex-col">
      <Breadcrumbs items={breadcrumb} onNavigate={handleBreadcrumbNavigate} />

      <div className="flex-1 overflow-auto">
        {
          viewMode === "categories"
            ? (
              <CategoryGrid
                categories={getCurrentCategories()}
                onCategoryClick={(cat) => {
                  handleCategorySelect(cat.id, cat.title);
                }}
              />
            )
            : (
              // <ProductsGrid> es un componente que creas para mostrar tus productos
              <ProductsGrid
                products={products}
              />
            )
        }
      </div>
    </div>
  );
};





// export const CategoryHome = () => {

//   const [currentCategory, setCurrentCategory] = useState<string | null>(null);
//   // Para el breadcrumb
//   const [breadcrumb, setBreadcrumb] = useState<Array<{ id: string; title: string }>>([
//     { id: "root", title: "Inicio" },
//   ]);

//   // Diccionario que almacenará las subcategorías que vienen de la API.
//   // key = id de la categoría, value = array de subcategorías
//   const [subcategoriesMap, setSubcategoriesMap] = useState<Record<string, Category[]>>({});

//   /**
//    *  Función para cargar subcategorías desde la API
//    *  dado un ID de categoría (por ejemplo "22").
//    */
//   const fetchSubcategories = async (categoryId: string) => {
//     try {
//       const res = await fetch(`/api/subcategories?categoryId=${categoryId}`);
//       if (!res.ok) {
//         throw new Error(`Error al obtener subcategorías de ${categoryId}`);
//       }

//       const data = await res.json();

//       const mappedSubcategories: Category[] = (data.subcategorias || []).map(
//         (sub: { id: string; nombre: string }) => ({
//           id: sub.id,
//           title: sub.nombre,
//           description:'',
//           icon: undefined, // Ícono genérico

//         })
//       );

//       setSubcategoriesMap((prev) => ({
//         ...prev,
//         [categoryId]: mappedSubcategories,
//       }));
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   /**
//  * Manejo de clic en categoría
//  * Si la categoría no tiene subcategorías en el diccionario (subcategoriesMap),
//  * se hace la petición a la API. Luego se actualiza el breadcrumb.
//  */
// const handleCategorySelect = async (categoryId: string, categoryTitle: string) => {
//   setCurrentCategory(categoryId);

//   // Agregar el nivel actual al breadcrumb
//   setBreadcrumb((prev) => [
//     ...prev,
//     { id: categoryId, title: categoryTitle },
//   ]);

//   // Si no tenemos subcategorías en el estado, las pedimos a la API
//   if (!subcategoriesMap[categoryId]) {
//     await fetchSubcategories(categoryId);
//   }
// };

// /**
//  * Cuando el usuario hace clic en un item del breadcrumb
//  */
// const handleBreadcrumbNavigate = (id: string) => {
//   // Si vuelven al "root", reiniciamos
//   if (id === "root") {
//     setBreadcrumb([{ id: "root", title: "Inicio" }]);
//     setCurrentCategory(null);
//     return;
//   }

//   // Si navegan a algún breadcrumb intermedio,
//   // recortamos el breadcrumb hasta ese punto
//   const index = breadcrumb.findIndex((item) => item.id === id);
//   if (index >= 0) {
//     setBreadcrumb(breadcrumb.slice(0, index + 1));
//     setCurrentCategory(id);
//   }
// };


  
//   /**
//    * Determinar qué categorías mostrar:
//    * - Si no hay `currentCategory`, mostrar las categorías de nivel 1 (mockCategories)
//    * - Si sí hay `currentCategory`, mostrar las subcategorías que obtuvimos del servidor
//    */
//   const getCurrentCategories = (): Category[] => {
//     if (!currentCategory) {
//       // Mostrar las categorías "mock" (nivel 1)
//       return Object.values(mockCategories).map((cat) => ({
//         ...cat,
//         // Subcategorías sin definir
//         subcategories: [],
//       }));
//     }

//     // Si hay currentCategory, mostramos las subcategorías cargadas.
//     // Si no hay nada en subcategoriesMap[currentCategory], devolvemos un array vacío.
//     return subcategoriesMap[currentCategory] || [];
//   };


//   return (
//     <div className="h-[85vh] flex w-full flex-col">
//       <Breadcrumbs items={breadcrumb} onNavigate={handleBreadcrumbNavigate} />

//       <div className="flex-1 overflow-auto">
//         <CategoryGrid
//           categories={getCurrentCategories()}
//           onCategoryClick={(category) => {
//             // Si la categoría tiene subcategorías,
//             // tenemos que volver a cargar la info, si no está en la cache
//             handleCategorySelect(category.id, category.title);
//           }}
//         />
//       </div>
//     </div>
//   );
// };