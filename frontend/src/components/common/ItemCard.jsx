import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Tag, User as UserIcon } from 'lucide-react';
import { formatDate, formatPrice, truncateText, getInitials } from '../../utils/helpers';

export default function ItemCard({ item, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/items/${item._id}`}
        className="card block p-6 h-full hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
            style={{
              backgroundColor: `hsl(${item.title.length * 30}, 70%, 50%)`,
            }}
          >
            {item.title.charAt(0).toUpperCase()}
          </div>
          <span className="badge-primary">{item.category}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {truncateText(item.description, 100)}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">
            {formatPrice(item.price)}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            {formatDate(item.createdAt)}
          </div>
        </div>

        {item.user && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-semibold"
              style={{
                backgroundColor: `hsl(${item.user.name.length * 40}, 70%, 50%)`,
              }}
            >
              {getInitials(item.user.name)}
            </div>
            <span className="text-xs text-gray-500">{item.user.name}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
