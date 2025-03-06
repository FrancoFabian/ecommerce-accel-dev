// Interfaz para Categoría
export interface Categoria {
    id: string;
    nombre: string;
    nivel: number;
  }
  
  // Interfaz para Precios
  export interface Precios {
    precio_1: number;
    precio_especial: number;
    precio_descuento: number;
    volumen: Record<string, number> ;
    precio_lista: number;
  }
  
  // Interfaz para Existencia
  export interface Existencia {
    nuevo: number;
    asterisco: {
      a: number;
      b: number;
      c: number;
      d: number;
      e: number;
    };
    detalle: { descripcion: string; cantidad: number; }[];
  }
  
  // Interfaz para ProductCard (solo las propiedades necesarias)
  export interface ProductCardProps {
    producto_id: string;
    modelo: string;
    titulo: string;
    marca: string;
    img_portada: string;
    categorias: Categoria[];
    precios: Precios;
    existencia: Existencia;
  }
  
  // Interfaz para la respuesta de la API
  export interface ProductResponse {
    cantidad: number;
    pagina: number;
    paginas: number;
    productos: ProductCardProps[];
  }
  
  