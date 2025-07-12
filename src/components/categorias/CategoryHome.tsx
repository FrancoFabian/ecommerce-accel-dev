'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchSubcategories,
  selectSubcategories,
} from '@/store/features/categoriesSlice';
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading
} from '@/store/features/productsSlice';

import { Category } from '@/types/category';
import { Breadcrumbs } from './Breadcrumbs';
import { CategoryGrid } from './CategoryGrid';
import { ProductsGrid } from '../products/oneproduct/ProductGrid';
import { ProductsGridSkeleton } from '../skeletons/productos/ProductsGridSkeleton';
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


/* ────────────────────────────────────────────────────────────────────────── */
/* categorías raíz hard-codeadas                                             */
/* ────────────────────────────────────────────────────────────────────────── */
const mockCategories: Record<string, Category> = {
  videovigilance: {
    id: "22",
    title: "Videovigilancia",
    description: "Cámaras y sistemas de seguridad",
    icon: <Videovigilancia className="w-[3.5rem] h-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  accessControl: {
    id: "37",
    title: "Control de Acceso",
    description: "Dispositivos para control de acceso",
    icon: <Controldeacceso className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  energy: {
    id: "30",
    title: "Energía",
    description: "Soluciones de energía y respaldo",
    icon: <Energia className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  fireDetection: {
    id: "38",
    title: "Detección de Fuego",
    description: "Sistemas de detección y alarma",
    icon: <Detecciondefuego className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  alarms: {
    id: "32",
    title: "Alarmas / Intrusión y Casa Inteligente",
    description: "Sistemas de alarma y automatización",
    icon: <CasaInteligente className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  radiocommunication: {
    id: "25",
    title: "Radiocomunicación",
    description: "Sistemas de comunicación por radio",
    icon: <Radiocomunicaciones className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  networks: {
    id: "26",
    title: "Redes e IT",
    description: "Infraestructura de redes e informática",
    icon: <Redes className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  structuredCabling: {
    id: "65811",
    title: "Cableado Estructurado",
    description: "Soluciones de cableado estructurado",
    icon: <Cableadoestructurado className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  iotGps: {
    id: "27",
    title: "IoT / GPS / Telemática y Señalización Audiovisual",
    description: "Dispositivos IoT y sistemas audiovisuales",
    icon: <Telematica className="h-[3.5rem] w-[3.5rem] text-primary" color="transparent" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  audioVideo: {
    id: "665223",
    title: "Audio y Video",
    description: "Equipos de audio y video",
    icon: <Audiovideo className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
  robots: {
    id: "66630",
    title: "Robots e Industrial",
    description: "Sistemas robóticos e industriales",
    icon: <Robot className="h-[3.5rem] w-[3.5rem] text-primary" />,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
  },
};


type ViewMode = 'categories' | 'products';

/* ────────────────────────────────────────────────────────────────────────── */
/* componente                                                                */
/* ────────────────────────────────────────────────────────────────────────── */
export function CategoryHome() {
  const dispatch = useAppDispatch();

  // estado global
  const products = useAppSelector(selectProducts);
  const productsLoading = useAppSelector(selectProductsLoading);
  const categoriesLoading = useAppSelector((s) => s.categories.loading);

  // estado local que SÍ sigue siendo propio del componente
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<{ id: string; title: string }[]>(
    [{ id: 'root', title: 'Inicio' }],
  );
  const [viewMode, setViewMode] = useState<ViewMode>('categories');

  /* ── selectores derivados ────────────────────────────────────────── */
  const subcats = useAppSelector(
    currentCategory ? selectSubcategories(currentCategory) : () => [],
  );

  /* ── efectos de carga ────────────────────────────────────────────── */
  useEffect(() => {
    if (currentCategory) {
      dispatch(fetchSubcategories(currentCategory));
    }
  }, [currentCategory, dispatch]);

  /* ── handlers ────────────────────────────────────────────────────── */
  const handleCategorySelect = (catId: string, catTitle: string) => {
    setCurrentCategory(catId);
    setBreadcrumb((b) => [...b, { id: catId, title: catTitle }]);

    /** Después de que llegue `fetchSubcategories` comprobaremos
     *  si sí hay subcategorías; si no, cargamos productos.
     */
    dispatch(fetchSubcategories(catId)).then((r) => {
      const hasChildren = 
        'payload' in r && 
        typeof r.payload === 'object' && 
        r.payload !== null &&
        'subcategories' in r.payload &&
        Array.isArray(r.payload.subcategories) &&
        r.payload.subcategories.length > 0;
      if (!hasChildren) {
        dispatch(fetchProducts(catId));
        setViewMode('products');
      } else {
        setViewMode('categories');
      }
    });
  };

  const handleBreadcrumbNavigate = (id: string) => {
    if (id === 'root') {
      setBreadcrumb([{ id: 'root', title: 'Inicio' }]);
      setCurrentCategory(null);
      setViewMode('categories');
      return;
    }

    const idx = breadcrumb.findIndex((b) => b.id === id);
    if (idx >= 0) {
      setBreadcrumb(breadcrumb.slice(0, idx + 1));
      const newCat = breadcrumb[idx].id;
      setCurrentCategory(newCat);

      /** igual que antes, comprobamos si es hoja o padre */
      dispatch(fetchSubcategories(newCat)).then((r) => {
        const hasChildren = 
          'payload' in r && 
          typeof r.payload === 'object' && 
          r.payload !== null &&
          'subcategories' in r.payload &&
          Array.isArray(r.payload.subcategories) &&
          r.payload.subcategories.length > 0;
        if (!hasChildren) {
          dispatch(fetchProducts(newCat));
          setViewMode('products');
        } else {
          setViewMode('categories');
        }
      });
    }
  };

  /* ── data que alimenta el grid ────────────────────────────────────── */
  const categoriesToShow = (): Category[] => {
    if (!currentCategory) return Object.values(mockCategories);
    return subcats;
  };

  /* ── render ──────────────────────────────────────────────────────── */
  return (
    <div className="h-[85vh] flex flex-col w-full relative overflow-hidden
                    bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* blobs decorativos – opcionales */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80
                        bg-blue-200 rounded-full mix-blend-multiply
                        filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80
                        bg-cyan-200 rounded-full mix-blend-multiply
                        filter blur-xl opacity-30 animate-blob animation-delay-2"></div>
        <div className="absolute top-40 left-40 w-80 h-80
                        bg-indigo-200 rounded-full mix-blend-multiply
                        filter blur-xl opacity-30 animate-blob animation-delay-4"></div>
      </div>
      <Breadcrumbs items={breadcrumb} onNavigate={handleBreadcrumbNavigate} />

      <div className="flex-1 overflow-auto">
        {viewMode === 'categories' ? (
          categoriesLoading ? (
            <p className="text-center py-10">Cargando categorías…</p>
          ) : (
            <CategoryGrid
              categories={categoriesToShow()}
              onCategoryClick={(c) => handleCategorySelect(c.id, c.title)}
            />
          )
        ) : productsLoading ? (                       // ⬅️ muestra skeleton
          <ProductsGridSkeleton count={12} />
        ) : (
          <ProductsGrid products={products} />

        )}
      </div>
    </div>
  );
}

