import { GoChevronRight } from "react-icons/go";

export const Breadcrumbs = () => {
  return (
    <nav className="my-4 px-2 py-2" aria-label="Breadcrumbs">
      <ol className="flex flex-wrap list-none rounded-sm">
        {/* Home */}
        <li className="flex items-center">
          <span
            className="flex gap-1 items-center cursor-pointer whitespace-nowrap line-clamp-1 text-foreground/50 text-sm hover:opacity-80 transition-opacity"
            tabIndex={0}
            role="link"
          >
            Home
          </span>
          <span aria-hidden="true" className="px-1 text-foreground/50">
            <GoChevronRight className="w-4 h-4" />
          </span>
        </li>

        {/* Shoes Category */}
        <li className="flex items-center">
          <span
            className="flex gap-1 items-center cursor-pointer whitespace-nowrap line-clamp-1 text-foreground/50 text-sm hover:opacity-80 transition-opacity"
            tabIndex={0}
            role="link"
          >
            Shoes Category
          </span>
          <span aria-hidden="true" className="px-1 text-foreground/50">
          <GoChevronRight className="w-4 h-4" />
          </span>
        </li>

        {/* Current Page: Training Shoes */}
        <li className="flex items-center">
          <span
            className="flex gap-1 items-center whitespace-nowrap line-clamp-1 text-sm text-foreground cursor-default transition-opacity"
            aria-disabled="true"
            role="link"
            aria-current="page"
          >
            Training Shoes
          </span>
        </li>
      </ol>
    </nav>
  );
};


