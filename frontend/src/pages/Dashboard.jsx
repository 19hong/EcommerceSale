import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Plus, TrendingUp, Clock, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMyItems } from '../hooks/useItems';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { formatDate, formatPrice } from '../utils/helpers';

export default function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useMyItems({ limit: 5 });

  const stats = [
    {
      label: 'Total Items',
      value: data?.pagination?.total || 0,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Active',
      value:
        data?.items?.filter((i) => i.status === 'active').length || 0,
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      label: 'Recent',
      value: data?.items?.length || 0,
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      label: 'Growth',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening with your items today.
          </p>
        </div>
        <Link
          to="/items/new"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Item
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="card">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Items
            </h2>
            <Link
              to="/dashboard/items"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="p-12">
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
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {data?.items?.map((item) => (
              <Link
                key={item._id}
                to={`/items/${item._id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{
                      backgroundColor: `hsl(${item.title.length * 30}, 70%, 50%)`,
                    }}
                  >
                    {item.title.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
                  <span className="text-sm font-semibold gradient-text">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
