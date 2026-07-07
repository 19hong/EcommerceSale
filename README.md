# FullStack App

A modern, production-ready full-stack web application built with React.js, Node.js, Express, and MongoDB. Features a premium SaaS-style UI with authentication, CRUD operations, search, filtering, pagination, dark mode, and role-based authorization.

## Tech Stack

### Frontend
- **React.js** (v18) - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hook Form + Zod** - Form validation
- **TanStack React Query** - Server state management
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database & ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting
- **express-validator** - Input validation
- **Multer + Cloudinary** - File uploads
- **Morgan** - Logging

## Features

- Beautiful, responsive landing page with glassmorphism design
- Dark mode with system preference detection
- JWT authentication (access + refresh tokens)
- User registration, login, logout
- Protected routes and role-based authorization (Admin/User)
- CRUD operations for items
- Search, filter, and pagination
- User dashboard with statistics
- Profile management with password change
- Admin user management
- Toast notifications
- Loading, empty, and error states
- Mobile-first responsive design
- Smooth animations and transitions
- Code splitting and lazy loading

## Project Structure

```
fullstack-app/
├── backend/
│   ├── server/
│   │   ├── config/          # Database & Cloudinary config
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/       # Auth, error handling, validation
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routes
│   │   ├── utils/           # Helpers & utilities
│   │   └── index.js         # Server entry point
│   ├── uploads/             # Local file uploads
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── auth/        # ProtectedRoute
│   │   │   ├── common/      # ItemCard
│   │   │   ├── layout/      # Header, Footer, Layouts
│   │   │   └── ui/          # Button, Input, Modal, etc.
│   │   ├── context/         # Auth & Theme context
│   │   ├── hooks/           # Custom React Query hooks
│   │   ├── pages/           # Page components
│   │   ├── routes/          # Route configuration
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Validations & helpers
│   │   └── assets/          # Styles & static assets
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root and add:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The app will open on `http://localhost:5173`.

## API Documentation

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/refresh-token` | Refresh access token | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Users

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/users` | Get all users | Yes | Admin |
| GET | `/api/users/:id` | Get user by ID | Yes | Any |
| PUT | `/api/users/profile` | Update profile | Yes | Any |
| PUT | `/api/users/password` | Change password | Yes | Any |
| DELETE | `/api/users/:id` | Delete user | Yes | Admin |

### Items

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/items` | Get all items (with search, filter, pagination) | No |
| GET | `/api/items/mine` | Get current user's items | Yes |
| GET | `/api/items/:id` | Get item by ID | No |
| POST | `/api/items` | Create item | Yes |
| PUT | `/api/items/:id` | Update item | Yes (owner or admin) |
| DELETE | `/api/items/:id` | Delete item | Yes (owner or admin) |

### Query Parameters for GET /api/items

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `search` - Full-text search query
- `category` - Filter by category
- `status` - Filter by status (active/inactive/archived)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort field (prefix with `-` for descending)

## Deployment

### Frontend (Vercel)

1. Push the frontend code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` = your backend URL
4. Deploy

### Backend (Render)

1. Push the backend code to GitHub
2. Create a new Web Service on Render
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables from `.env`
6. Deploy

### Database (MongoDB Atlas)

1. Create a free MongoDB Atlas cluster
2. Get your connection string
3. Replace `MONGODB_URI` in your backend environment variables

## Environment Variables

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/fullstack-app` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_REFRESH_SECRET` | Refresh token secret | Required |
| `JWT_EXPIRE` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRE` | Refresh token expiry | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Optional |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Optional |
| `NODE_ENV` | Environment | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## License

MIT
