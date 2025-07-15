# Ecommerce Accel Dev

Aplicación de ecommerce desarrollada con Next.js 14, TypeScript y Redux Toolkit.

## Características

- ✅ Autenticación completa con JWT
- ✅ Gestión de categorías y productos
- ✅ Carrito de compras optimizado
- ✅ Integración con API de Syscom
- ✅ Interfaz responsive y moderna
- ✅ Estado global con Redux Toolkit

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Syscom API Token (SERVER SIDE)
SYSCOM_TOKEN=tu_token_de_syscom_aqui

# Environment
NEXT_PUBLIC_ENV=development
```

### Token de Syscom

Para obtener productos individuales de Syscom, necesitas configurar el token de autenticación:

1. Regístrate en [Syscom Developers](https://developers.syscom.mx)
2. Obtén tu token de API
3. Agrégalo a la variable `SYSCOM_TOKEN` en tu archivo `.env.local`

**Nota importante**: El token se maneja del lado del servidor por seguridad, no uses el prefijo `NEXT_PUBLIC_`.

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## Integración con Syscom

### Visualización de Productos

Los productos de Syscom se pueden visualizar individualmente accediendo a:
```
/oneproduct?id=PRODUCTO_ID
```

### Endpoint Interno

Para mayor seguridad, la aplicación incluye un endpoint interno que maneja las peticiones a Syscom:
```
GET /api/syscom/[id]
```

Este endpoint:
- ✅ Maneja el token de autenticación de forma segura
- ✅ Incluye manejo de errores robusto
- ✅ Transforma y optimiza la respuesta
- ✅ Registra errores para debugging

### Datos que se muestran

- ✅ Título y descripción del producto
- ✅ Marca y modelo
- ✅ Precios (lista y especial)
- ✅ Existencia disponible
- ✅ Galería de imágenes
- ✅ Características técnicas
- ✅ Recursos adicionales
- ✅ Información SAT

### Estructura de Datos de Syscom

```typescript
interface SyscomProducto {
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
  precios: {
    precio_lista: number;
    precio_especial: number;
    precio_descuentos: number;
  };
  existencia: Record<string, any>;
  iconos: {
    inf_izq: string;
    inf_der: string;
    sup_izq: string;
    sup_der: string;
  };
  caracteristicas: string[];
  imagenes: {
    orden: number;
    url: string;
  }[];
  descripcion: string;
  recursos: {
    recurso: string;
    path: string;
  }[];
}
```

## Arquitectura del Proyecto

```
src/
├── app/                    # Pages y API routes (Next.js 14)
├── components/            # Componentes reutilizables
│   ├── categorias/       # Componentes de categorías
│   ├── products/         # Componentes de productos
│   │   └── oneproduct/   # Página individual de producto
│   ├── shopping/         # Carrito y checkout
│   └── ui/              # Componentes UI base
├── store/                # Redux Toolkit store
│   ├── features/        # Slices de estado
│   └── services/        # APIs (RTK Query)
│       ├── ecommerceApi.ts
│       └── syscomApi.ts  # API de Syscom
├── types/               # Tipos TypeScript
└── hooks/              # Custom hooks
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Producción
npm start

# Linting
npm run lint

# Corrección de linting
npm run lint:fix
```

## Tecnologías Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Redux Toolkit + RTK Query
- **UI**: Componentes personalizados
- **Autenticación**: JWT + cookies
- **APIs**: API propia + Syscom API

## Contribución

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Troubleshooting

### Error de Redux: Selectores no memoizados (RESUELTO)

**Problema**: Error en consola indicando que selectores devuelven nuevas referencias causando re-renders innecesarios:
```
CategoryHome.tsx:137 Selector CategoryHome.useAppSelector[subcats] returned a different result when called with the same parameters.
```

**Causa**: Selectores no estaban memoizados con `createSelector` y se creaban nuevas funciones en cada render.

**Solución implementada**:
- ✅ Agregado `createSelector` a `categoriesSlice.ts`
- ✅ Creados selectores memoizados: `selectSubcategoriesById`, `makeSelectSubcategories`, `selectCategoriesLoading`
- ✅ Actualizado `CategoryHome.tsx` para usar `useMemo` con selectores memoizados
- ✅ Corregido tipado TypeScript para Next.js 15

**Archivos modificados**:
- `src/store/features/categoriesSlice.ts` - Selectores memoizados
- `src/components/categorias/CategoryHome.tsx` - Uso optimizado de selectores
- `src/app/api/syscom/[id]/route.ts` - Compatibilidad Next.js 15

### Error 401 (Unauthorized) con Syscom

Si recibes errores 401 al acceder a productos de Syscom:

1. **Verifica el token**: Asegúrate de que la variable `SYSCOM_TOKEN` esté configurada en `.env.local`
2. **Reinicia el servidor**: Después de configurar el token, reinicia el servidor de desarrollo
3. **Verifica el formato**: El token debe ir sin el prefijo `NEXT_PUBLIC_`
4. **Usa la página de debug**: Visita `/debug` para verificar el estado del token

O usa el componente directamente:

```tsx
import { SyscomTokenStatus } from '@/components/debug/SyscomTokenStatus';

// En tu componente
<SyscomTokenStatus />
```

### Error de Google Fonts con Next.js 15

Si experimentas errores con las fuentes de Google (como `Geist` o `Geist_Mono`):

1. **Síntomas**: Errores de `Module not found` con `@vercel/turbopack-next/internal/font/google/font`
2. **Causa**: Incompatibilidad entre ciertas fuentes de Google y Turbopack
3. **Solución**: Usar fuentes más estables como `Inter` y `JetBrains_Mono`

```tsx
// ❌ Problemático en Next.js 15
import { Geist, Geist_Mono } from "next/font/google";

// ✅ Solución estable
import { Inter, JetBrains_Mono } from "next/font/google";
```

### Otros errores comunes

- **Error 404**: El ID del producto no existe en Syscom
- **Error 500**: Error interno del servidor, verifica los logs
- **Error de red**: Verifica tu conexión a internet

## Licencia

Este proyecto es privado y pertenece a Grupo Accel.
