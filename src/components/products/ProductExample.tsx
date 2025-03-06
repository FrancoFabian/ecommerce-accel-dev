import { ProductCard } from "./ProductCard";


export default function ProductCardExample() {
    const productData = [
        {
            "producto_id": "69467",
            "modelo": "JR-R591",
            "titulo": "Adaptador RCA MACHO Tipo Jack Polarizado / Terminales Tipo Tornillo / Polarizado (+/-) / Recomendado para Video y AUDIO en sistemas de video vigilancia a 2 Hilos.",
            "marca": "EPCOM POWERLINE",
            "img_portada": "https://ftp3.syscom.mx/usuarios/fotos/BancoFotografiasSyscom/EPCOMPOWERLINE/JRR591/JRR591-p.PNG",
            "precios": {
                "precio_1": 0.77,
                "precio_especial": 0.5,
                "precio_descuento": 0.31,
                "volumen": {
                    "100": 0.29,
                    "200": 0.28,
                    "500": 0.28
                },
                "precio_lista": 0.77
            },
            "existencia": {
                "nuevo": 500,
                "asterisco": {
                    "a": 0,
                    "b": 0,
                    "c": 0,
                    "d": 0,
                    "e": 0
                },
                "detalle": []
            },
            "categorias": [
                { "id": "1301", "nombre": "Adaptador a RCA", "nivel": 3 },
                { "id": "206", "nombre": "Cables y Conectores", "nivel": 2 },
                { "id": "22", "nombre": "Videovigilancia", "nivel": 1 }
            ]
        },
        {
            "producto_id": "74991",
            "modelo": "TT-RG-02",
            "titulo": "Adaptador en línea para 75 Ohm, de conector BNC macho a RCA hembra en aplicaciones de Audio-Video para cámaras, monitores y DVR´s.",
            "marca": "EPCOM TITANIUM",
            "img_portada": "https://ftp3.syscom.mx/usuarios/fotos/TTRG02/TTRG02.jpg",
            "precios": {
                "precio_1": 0.45,
                "precio_especial": 0.26,
                "precio_descuento": 0.16,
                "volumen": {
                    "10": 0.15,
                    "25": 0.14,
                    "50": 0.13
                },
                "precio_lista": 0.45
            },
            "existencia": {
                "nuevo": 500,
                "asterisco": {
                    "a": 0,
                    "b": 0,
                    "c": 0,
                    "d": 0,
                    "e": 0
                },
                "detalle": []
            },
            "categorias": [
                { "id": "1301", "nombre": "Adaptador a RCA", "nivel": 3 },
                { "id": "206", "nombre": "Cables y Conectores", "nivel": 2 },
                { "id": "22", "nombre": "Videovigilancia", "nivel": 1 }
            ]
        },
        {
            "producto_id": "164220",
            "modelo": "485D",
            "titulo": "Convertidor de RS232 a RS485",
            "marca": "EPCOM POWERLINE",
            "img_portada": "https://ftp3.syscom.mx/usuarios/fotos/BancoFotografiasSyscom/EPCOMPOWERLINE/485D/485D-p.PNG",
            "precios": {
                "precio_1": 6.28,
                "precio_especial": 5.66,
                "precio_descuento": 3.53,
                "volumen": {
                    "10": 3.42
                },
                "precio_lista": 6.28
            },
            "existencia": {
                "nuevo": 0,
                "asterisco": {
                    "a": 0,
                    "b": 1,
                    "c": 0,
                    "d": 0,
                    "e": 0
                },
                "detalle": []
            },
            "categorias": [
                { "id": "1301", "nombre": "Adaptador a RCA", "nivel": 3 },
                { "id": "206", "nombre": "Cables y Conectores", "nivel": 2 },
                { "id": "22", "nombre": "Videovigilancia", "nivel": 1 }
            ]
        },
        {
            "producto_id": "74999",
            "modelo": "TT-RG-03",
            "titulo": "Adaptador en línea para 75 Ohm, de conector BNC hembra a RCA macho en aplicaciones de Audio-Video para cámaras, monitores y DVR´s.",
            "marca": "EPCOM TITANIUM",
            "img_portada": "https://ftp3.syscom.mx/usuarios/fotos/TTRG03/TTRG03.jpg",
            "precios": {
                "precio_1": 0.45,
                "precio_especial": 0.26,
                "precio_descuento": 0.16,
                "volumen": {
                    "10": 0.15,
                    "25": 0.14,
                    "50": 0.13
                },
                "precio_lista": 0.45
            },
            "existencia": {
                "nuevo": 406,
                "asterisco": {
                    "a": 0,
                    "b": 0,
                    "c": 0,
                    "d": 0,
                    "e": 0
                },
                "detalle": []
            },
            "categorias": [
                { "id": "1301", "nombre": "Adaptador a RCA", "nivel": 3 },
                { "id": "206", "nombre": "Cables y Conectores", "nivel": 2 },
                { "id": "22", "nombre": "Videovigilancia", "nivel": 1 }
            ]
        },
        {
            "producto_id": "74990",
            "modelo": "TT-RG-01",
            "titulo": "Adaptador en línea para 75 Ohm, de conector BNC macho a RCA macho en aplicaciones de Audio-Video para cámaras, monitores y DVR´s.",
            "marca": "EPCOM TITANIUM",
            "img_portada": "https://ftp3.syscom.mx/usuarios/fotos/TTRG01/TTRG01.jpg",
            "precios": {
                "precio_1": 0.71,
                "precio_especial": 0.46,
                "precio_descuento": 0.28,
                "volumen": {
                    "10": 0.25,
                    "25": 0.24,
                    "50": 0.23,
                    "100": 0.22
                },
                "precio_lista": 0.71
            },
            "existencia": {
                "nuevo": 194,
                "asterisco": {
                    "a": 0,
                    "b": 0,
                    "c": 0,
                    "d": 0,
                    "e": 0
                },
                "detalle": []
            },
            "categorias": [
                { "id": "1301", "nombre": "Adaptador a RCA", "nivel": 3 },
                { "id": "206", "nombre": "Cables y Conectores", "nivel": 2 },
                { "id": "22", "nombre": "Videovigilancia", "nivel": 1 }
            ]
        }
    ]
    const cleanVolume = (volumen: Record<string, number | undefined>): Record<string, number> => {
        return Object.fromEntries(
          Object.entries(volumen)
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => [key, value as number]) // Forzar el tipo como `number`
        );
      };
      

    // Mapear productos y limpiar el volumen
    const cleanedProductData = productData.map(product => ({
        ...product,
        precios: {
            ...product.precios,
            volumen: cleanVolume(product.precios.volumen),
        },
    }));




    return (
        <div className="px-2 pt-2 lg:pt-10 pb-20 grid grid-cols-2 gap-4 sm:flex  sm:flex-wrap sm:justify-center sm:items-center
        lg:flex lg:justify-center lg:items-center lg:flex-wrap
         md:grid-cols-3 lg:grid-cols-4">
            {cleanedProductData.map(product => (
                <ProductCard key={product.producto_id} {...product} />
            ))}
        </div>
    );
}
