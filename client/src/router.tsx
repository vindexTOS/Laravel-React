import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from './Views/Login'
import Signup from './Views/Signup'
import User from './Views/User'
import NotFound from './Views/NotFound'
import DefaultLayout from './Components/DefaultLayout'
import GuestLayout from './Components/GuestLayout'
import Dashboard from './Views/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Navigate to="/users" /> },
      {
        path: '/users',
        element: <User />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
