import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Items from '../pages/Items';
import ItemDetail from '../pages/ItemDetail';
import CreateEditItem from '../pages/CreateEditItem';
import Dashboard from '../pages/Dashboard';
import MyItems from '../pages/MyItems';
import Profile from '../pages/Profile';
import Pricing from '../pages/Pricing';
import Users from '../pages/Users';
import NotFound from '../pages/NotFound';

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/items', element: <Items /> },
      { path: '/items/:id', element: <ItemDetail /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'items', element: <MyItems /> },
    ],
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Profile /> }],
  },
  {
    path: '/items/new',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <CreateEditItem /> }],
  },
  {
    path: '/items/:id/edit',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <CreateEditItem /> }],
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute adminOnly>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Users /> }],
  },
  { path: '*', element: <NotFound /> },
];
