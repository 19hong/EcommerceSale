import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.pages <= 1) return null;

  const { page, pages } = pagination;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= pages; i++) {
      if (
        i === 1 ||
        i === pages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    for (let i = 0; i < range.length; i++) {
      if (l) {
        if (range[i] - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (range[i] - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(range[i]);
      l = range[i];
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {getPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
          className={`min-w-[40px] h-10 rounded-xl font-medium transition-all ${
            pageNum === page
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
              : typeof pageNum === 'number'
              ? 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              : 'text-gray-400 cursor-default'
          }`}
          disabled={pageNum === '...'}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
