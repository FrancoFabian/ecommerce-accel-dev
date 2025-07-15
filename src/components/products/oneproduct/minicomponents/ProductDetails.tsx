import { ExpandableSection } from "./ExpandableButton";
import { SyscomProducto } from '@/types/product';

interface ProductDetailsProps {
  product?: SyscomProducto;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
          return (
        <div className="px-2 w-full -mx-1 mt-2" data-orientation="vertical">
          {/* Características */}
          {product?.caracteristicas && product.caracteristicas.length > 0 && (
            <>
              <ExpandableSection
                title="Características"
                content={
                  <ul className="list-inside list-disc space-y-1">
                    {product.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="text-default-500">
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                }
              />
              <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
            </>
          )}
          
          {/* Información técnica */}
          <ExpandableSection 
            title="Información técnica" 
            content={
              <div className="space-y-2">
                {product?.sat_key && (
                  <p className="text-default-500">
                    <strong>Clave SAT:</strong> {product.sat_key}
                  </p>
                )}
                {product?.modelo && (
                  <p className="text-default-500">
                    <strong>Modelo:</strong> {product.modelo}
                  </p>
                )}
                {product?.marca && (
                  <p className="text-default-500">
                    <strong>Marca:</strong> {product.marca}
                  </p>
                )}
              </div>
            } 
          />
          <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
          
          {/* Recursos adicionales */}
          {product?.recursos && product.recursos.length > 0 && (
            <>
              <ExpandableSection 
                title="Recursos adicionales" 
                content={
                  <ul className="space-y-2">
                    {product.recursos.map((recurso, index) => (
                      <li key={index} className="text-default-500">
                        <a 
                          href={recurso.path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {recurso.recurso}
                        </a>
                      </li>
                    ))}
                  </ul>
                } 
              />
              <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
            </>
          )}
          
          <ExpandableSection title="Envíos y devoluciones" content={<p>Información sobre envíos y devoluciones.</p>} />
        </div>
      );
  };