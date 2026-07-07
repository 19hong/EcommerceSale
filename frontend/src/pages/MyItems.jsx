import { useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useMyItems, useDeleteItem } from '../hooks/useItems';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { formatDate, formatPrice } from '../utils/helpers';

export default function MyItems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading } = useMyItems({ page, limit: 10 });
  const deleteItem = useDeleteItem();

  const handlePageChange = useCallback(
    (newPage) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteItem.mutateAsync(deleteTarget._id);
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Items
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your items.
          </p>
        </div>
        <Link to="/items/new" className="btn-primary inline-flex items-center gap-2">
          <Plus className="h-5 w-5" />
          New Item
        </Link>
      </div>

      {isLoading ? (
        <div className="py-12">
          <Spinner />
        </div>
      ) : data?.items?.length === 0 ? (
        <EmptyState
          title="No items yet"
          description="Create your first item to get started."
          action
          actionText="Create Item"
          onAction={() => (window.location.href = '/items/new')}
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {data?.items?.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/items/${item._id}`}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge-primary">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold gradient-text">
                      {formatPrice(item.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`badge ${
                          item.status === 'active'
                            ? 'badge-success'
                            : item.status === 'inactive'
                            ? 'badge-warning'
                            : 'badge-danger'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/items/${item._id}/edit`}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
            <Pagination
              pagination={data?.pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Item"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{deleteTarget?.title}"? This action
          cannot be undone.
        </p>
        <div className="flex items-center gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setDeleteTarget(null)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            loading={deleteItem.isPending}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
