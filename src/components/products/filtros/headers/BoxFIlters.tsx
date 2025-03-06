import React from 'react';

export const BoxFilters = () => {
  const filters = ["Filter 1", "Filter 2", "Filter 3", "Filter 4", "Filter 5", "Filter 6"];

  return (
    <div className="mb-4 mt-2 flex flex-wrap items-center gap-2">
      {filters.map((filter, index) => (
        <div
          key={index}
          className="relative max-w-fit min-w-min inline-flex items-center justify-between px-1 h-7 text-sm rounded-full bg-default/40 text-default-foreground"
        >
          <span className="flex-1 font-normal px-2 pr-1 text-default-700">{filter}</span>
          <span
            role="button"
            tabIndex={0}
            className="z-10 appearance-none outline-none select-none transition-opacity opacity-70 hover:opacity-100 cursor-pointer text-lg text-default-500"
            aria-label="close chip"
          >
            <svg
              aria-hidden="true"
              fill="currentColor"
              height="1em"
              width="1em"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"></path>
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
};


