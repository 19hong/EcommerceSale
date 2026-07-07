import { Inbox } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Nothing here yet',
  description = 'No data available at the moment.',
  action,
  actionText = 'Create',
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
        {description}
      </p>
      {action && onAction && (
        <Button onClick={onAction}>{actionText}</Button>
      )}
    </div>
  );
}
