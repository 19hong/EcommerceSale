import { motion } from 'framer-motion';

const variants = {
  primary:
    'btn-primary',
  secondary:
    'btn-secondary',
  ghost:
    'btn-ghost',
  danger:
    'px-6 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${variants[variant]} ${sizes[size]} inline-flex items-center justify-center gap-2 ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
