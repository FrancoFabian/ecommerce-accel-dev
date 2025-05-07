import Image from "next/image";


export interface ProductCardProps {
  id: string | number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  onSave?: () => void;
}

export const ProductCardPop: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  imageUrl,
  isNew = false,
  onSave,
}) => {
  
  return (
    <article
      id={id.toString()}
      className="relative flex w-full flex-col gap-3 rounded-2xl bg-white p-4 shadow-md snap-start group"
    >
      {/* Badge NEW */}
      {isNew && (
        <span className="absolute right-7 top-7 z-20 text-xs font-semibold text-gray-400">
          NEW
        </span>
      )}

      

      {/* Main content */}
      <div className="flex h-full flex-col items-center justify-between rounded-xl bg-gray-50">
        <header className="flex flex-col gap-2 px-4 pt-6">
          <h3 className="text-lg font-semibold tracking-tight text-gray-600">
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
        </header>

        <div className="relative h-42 w-42">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-xl object-contain transition-transform duration-300 group-hover:scale-110"
            priority
          />
        </div>
      </div>

      {/* Actions */}
      <footer className="flex gap-2 px-1 pt-3">
        <button
          onClick={onSave}
          className="h-10 w-full min-w-20 rounded-xl bg-gray-100 px-4 text-sm font-medium text-gray-700 transition-opacity hover:bg-gray-200"
        >
          Guardar
        </button>
        <button
          className="h-10 w-full min-w-20 rounded-xl bg-primary/20 px-4 text-sm font-medium text-primary transition-opacity hover:opacity-80 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Añadir
        </button>
      </footer>
    </article>
  );
};