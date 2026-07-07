import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  User,
  LayoutDashboard,
  Plus,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Browse', path: '/items' },
  { name: 'Pricing', path: '/pricing' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              FullStack
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-semibold"
                    style={{
                      backgroundColor: user?.name
                        ? `hsl(${user.name.length * 40}, 70%, 50%)`
                        : '#6366f1',
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => {
                              navigate('/dashboard');
                              setDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                          </button>
                          <button
                            onClick={() => {
                              navigate('/profile');
                              setDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </button>
                          <button
                            onClick={() => {
                              navigate('/items/new');
                              setDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
                          >
                            <Plus className="h-4 w-4" />
                            New Item
                          </button>
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-700 py-1">
                          <button
                            onClick={() => {
                              logout();
                              setDropdownOpen(false);
                              navigate('/');
                            }}
                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3"
                >
                  {isDark ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      navigate('/');
                    }}
                    className="w-full px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setIsOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate('/register');
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
