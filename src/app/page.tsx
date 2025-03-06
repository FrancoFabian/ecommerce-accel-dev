import { SliderImages } from "@/components/carrusel/sliderimages";
import { Footer } from "@/components/footer/Footer";

const images = [
  "https://i.imgur.com/xEC1Xo4.jpeg",
  "https://i.imgur.com/92P1A8N.png",
  "https://i.imgur.com/AFfp8o5.jpeg",
  "https://i.imgur.com/xRLV3Rs.jpeg",
  "https://i.imgur.com/sqHZ8ZC.png"
];


export default function Home() {
  return (
    <div className="w-full h-full">
     <SliderImages images={images} autoPlay={false}/>
     <Footer/>
    </div>
  );
}
