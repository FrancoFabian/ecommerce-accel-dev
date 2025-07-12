import { Benefits } from "@/components/beneficios/beneficios";
import { SliderImages } from "@/components/carrusel/sliderimages";
import { Footer } from "@/components/footer/Footer";
import { PopularProducts } from "@/components/products/popular/popular-products";

const images = [
  "https://i.imgur.com/xEC1Xo4.jpeg",
  "https://i.imgur.com/92P1A8N.png",
  "https://i.imgur.com/AFfp8o5.jpeg",
  "https://i.imgur.com/xRLV3Rs.jpeg",
  "https://i.imgur.com/sqHZ8ZC.png"
];


export default function Home() {
  return (
    <div className="w-full lg:h-[100vh] sm:h-auto overflow-y-auto">
     <SliderImages images={images} autoPlay={false}/>
     <PopularProducts/>
     <Benefits/>
     <Footer/>
    </div>
  );
}
