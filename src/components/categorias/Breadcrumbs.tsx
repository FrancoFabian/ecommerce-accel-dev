import { HiChevronRight } from "react-icons/hi2";

interface BreadcrumbProps {
  items: { id: string; title: string }[];
  onNavigate: (id: string) => void;
}

export const Breadcrumbs = ({ items, onNavigate }: BreadcrumbProps) => {
  return (
    <nav className="sticky top-0 z-10 bg-white/70 backdrop-blur-xl
                  border-b border-blue-100" aria-label="Breadcrumbs">
      <ol className="flex flex-wrap items-center gap-2 px-4 py-3 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {index > 0 && (
             
                <HiChevronRight className="w-4 h-4 text-gray-400" />
              
            )}
            {index === items.length - 1 ? (
              // Current page (active breadcrumb)
              <span
                className="px-4 py-2 rounded-full text-primary font-semibold
                             bg-blue-100 shadow-sm text-sm"
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
                className="px-4 py-2 rounded-full text-sm text-gray-600
                               hover:text-primary hover:bg-blue-50 transition"
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
