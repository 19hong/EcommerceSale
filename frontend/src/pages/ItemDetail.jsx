import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  User,
  Tag,
  DollarSign,
} from 'lucide-react';
import { useItem, useDeleteItem } from '../hooks/useItems';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import { formatDate, formatPrice, getInitials } from '../utils/helpers';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { data: item, isLoading, isError } = useItem(id);
  const deleteItem = useDeleteItem();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const canModify =
    user &&
    item &&
    (item.user?._id === user._id ||
      item.user?.toString() === user._id ||
      isAdmin);

  const handleDelete = async () => {
    await deleteItem.mutateAsync(id);
    navigate('/items');
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 mb-4">Item not found</p>
        <Link to="/items">
          <Button variant="secondary">Back to Items</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold"
              style={{
                backgroundColor: `hsl(${item.title.length * 30}, 70%, 50%)`,
              }}
            >
              {item.title.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge-primary">{item.category}</span>
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
              </div>
            </div>
          </div>

          {canModify && (
            <div className="flex items-center gap-2">
              <Link to={`/items/${item._id}/edit`}>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Price</p>
              <p className="text-lg font-bold gradient-text">
                {formatPrice(item.price)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <Tag className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Category</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {item.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Created</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {formatDate(item.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">
            {item.description}
          </p>
        </div>

        {item.user && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold"
              style={{
                backgroundColor: `hsl(${item.user.name.length * 40}, 70%, 50%)`,
              }}
            >
              {getInitials(item.user.name)}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {item.user.name}
              </p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
        )}
      </motion.div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Item"
        size="sm"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{item.title}"? This action cannot be
          undone.
        </p>
        <div className="flex items-center gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
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
