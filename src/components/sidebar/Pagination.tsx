// components/Pagination.tsx
import Link from 'next/link';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav>
      <ul className="flex gap-2">
        {pages.map((page) => (
          <li key={page}>
            <Link href={`?page=${page}`}>
              <span className={page === currentPage ? 'font-bold text-blue-600' : 'text-gray-600'}>
                {page}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};


