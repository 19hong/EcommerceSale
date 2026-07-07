import Spinner from './Spinner';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
