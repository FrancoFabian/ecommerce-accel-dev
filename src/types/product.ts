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
  
  // ===== TIPOS PARA SYSCOM API =====

export interface SyscomPrecios {
  precio_lista: number;
  precio_especial: number;
  precio_descuentos: number;
}

export interface SyscomIconos {
  inf_izq: string;
  inf_der: string;
  sup_izq: string;
  sup_der: string;
}

export interface SyscomImagen {
  orden: number;
  url: string;
}

export interface SyscomRecurso {
  recurso: string;
  path: string;
}

export interface SyscomProducto {
  producto_id: number;
  modelo: string;
  total_existencia: number;
  titulo: string;
  marca: string;
  sat_key: string;
  img_portada: string;
  categorías: (string | null)[];
  marca_logo: string;
  link: string;
  precios: SyscomPrecios;
  existencia: Record<string, any>;
  iconos: SyscomIconos;
  caracteristicas: string[];
  imagenes: SyscomImagen[];
  descripcion: string;
  recursos: SyscomRecurso[];
}
  
  