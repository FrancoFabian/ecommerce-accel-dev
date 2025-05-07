"use client"

import { ProductCardPop } from "./popular-product-card";



const products = [
  {
    id: '7',
    title: 'Kit NVR 4CH + 4 Cámaras Bullet 2MP',
    description: 'Sistema completo de videovigilancia con NVR de 4 canales y 4 cámaras bullet de 2MP con visión nocturna',
    price: 4999,
    imageUrl: 'https://images.pexels.com/photos/4219883/pexels-photo-4219883.jpeg',
    isNew: true,
  },
  {
    id: '8',
    title: 'Access Point WiFi 6 para Exteriores',
    description: 'Access point WiFi 6 resistente a la intemperie para cobertura exterior de alta velocidad',
    price: 1899,
    imageUrl: 'https://images.pexels.com/photos/4050388/pexels-photo-4050388.jpeg',
  },
  {
    id: '9',
    title: 'Switch 24 Puertos Administrable',
    description: 'Switch gigabit administrable de 24 puertos para redes empresariales',
    price: 3499,
    imageUrl: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg',
  },
  {
    id: '10',
    title: 'Cámara PTZ 4MP con Zoom Óptico',
    description: 'Cámara PTZ de alta definición con zoom óptico 20x y seguimiento automático',
    price: 2999,
    imageUrl: 'https://images.pexels.com/photos/3201765/pexels-photo-3201765.jpeg',
    isNew: true,
  },
  {
    id: '12',
    title: 'Kit de Herramientas para Redes',
    description: 'Kit completo de herramientas profesionales para instalación y mantenimiento de redes',
    price: 1299,
    imageUrl: 'https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg',
  },
  {
    id: '13',
    title: 'Panel de Parcheo 24 Puertos Cat6',
    description: 'Panel de parcheo Cat6 de 24 puertos para rack de 19 pulgadas',
    price: 799,
    imageUrl: 'https://images.pexels.com/photos/2881228/pexels-photo-2881228.jpeg',
  },
];

export const PopularProducts = () => {
  return (
    <section className="container-custom px-8 py-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title text-2xl font-bold text-context mb-0">Más Populares</h2>
        <a href="/populares" className="text-sm text-primary font-medium hover:underline">
          Ver todos
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCardPop
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
            isNew={product.isNew}
          />
        ))}
      </div>
    </section>
  );
}