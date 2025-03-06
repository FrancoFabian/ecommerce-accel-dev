import { HiChevronRight } from "react-icons/hi2";

interface BreadcrumbProps {
  items: { id: string; title: string }[];
  onNavigate: (id: string) => void;
}

export const Breadcrumbs = ({ items, onNavigate }: BreadcrumbProps) => {
  return (
    <nav className="my-4 px-2 py-2" aria-label="Breadcrumbs">
      <ol className="flex flex-wrap list-none rounded-sm">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {index > 0 && (
              <span aria-hidden="true" className="px-1 text-foreground/50">
                <HiChevronRight className="w-4 h-4" />
              </span>
            )}
            {index === items.length - 1 ? (
              // Current page (active breadcrumb)
              <span
                className="flex ml gap-1 items-center whitespace-nowrap 
                line-clamp-1 text-sm text-primary bg-primary/20 px-2 rounded-xl font-bold cursor-pointer transition-opacity"
                aria-disabled="true"
                role="link"
                aria-current="page"
              >
                {item.title}
              </span>
            ) : (
              // Navigable breadcrumb
              <button
                onClick={() => onNavigate(item.id)}
                className="flex gap-1 items-center cursor-pointer whitespace-nowrap line-clamp-1 text-foreground/50 text-sm hover:opacity-80 transition-opacity"
              >
                {item.title}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
