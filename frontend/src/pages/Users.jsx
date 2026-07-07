import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, Trash2 } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';
import SearchInput from '../components/ui/SearchInput';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { formatDate, getInitials } from '../utils/helpers';

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const { data, isLoading } = useUsers({ page, search });

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

  const handlePageChange = useCallback(
    (newPage) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage all registered users.
          </p>
        </div>
      </div>

      <div className="mb-6 max-w-md">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search users by name or email..."
        />
      </div>

      {isLoading ? (
        <div className="py-12">
          <Spinner />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {data?.users?.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                          style={{
                            backgroundColor: `hsl(${user.name.length * 40}, 70%, 50%)`,
                          }}
                        >
                          {getInitials(user.name)}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 badge-primary">
                        <Shield className="h-3 w-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`badge ${
                          user.isActive ? 'badge-success' : 'badge-danger'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setShowDeleteModal(user)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
        isOpen={!!showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        title="Delete User"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{showDeleteModal?.name}"? This action
          cannot be undone.
        </p>
        <div className="flex items-center gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(null)}
          >
            Cancel
          </Button>
          <Button variant="danger">Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
