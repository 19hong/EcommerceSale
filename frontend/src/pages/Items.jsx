import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { useItems } from '../hooks/useItems';
import ItemCard from '../components/common/ItemCard';
import SearchInput from '../components/ui/SearchInput';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';

const categories = [
  'All',
  'Technology',
  'Design',
  'Business',
  'Education',
  'Health',
  'Entertainment',
];

const sortOptions = [
  { value: '-createdAt', label: 'Newest' },
  { value: 'createdAt', label: 'Oldest' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'title', label: 'Name: A-Z' },
];

export default function Items() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const page = parseInt(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '-createdAt';

  const { data, isLoading, isError } = useItems({
    page,
    search,
    category,
    sort,
    limit: 12,
  });

  const handleSearch = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams);
      if (value) params.set('search', value);
      else params.delete('search');
      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleCategory = useCallback(
    (cat) => {
      const params = new URLSearchParams(searchParams);
      if (cat && cat !== 'All') params.set('category', cat);
      else params.delete('category');
      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleSort = useCallback(
    (value) => {
      const params = new URLSearchParams(searchParams);
      params.set('sort', value);
      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Browse Items
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Discover amazing items from our community.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="flex-1 w-full sm:max-w-md">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search items..."
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            className="input-field text-sm w-full sm:w-auto"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-all ${
              showFilters
                ? 'bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-900/20 dark:border-primary-800'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  (cat === 'All' && !category) || category === cat
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="py-20">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <div className="py-20 text-center">
          <p className="text-red-500">Failed to load items. Please try again.</p>
        </div>
      ) : data?.items?.length === 0 ? (
        <EmptyState
          title="No items found"
          description={
            search
              ? `No results for "${search}". Try a different search term.`
              : 'No items available at the moment.'
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.items?.map((item, index) => (
              <ItemCard key={item._id} item={item} index={index} />
            ))}
          </div>

          <Pagination
            pagination={data?.pagination}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
