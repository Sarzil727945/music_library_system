import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard/Home/Dashboard'
import Albums from '../pages/Dashboard/Albums'
import AllAlbums from '../pages/Dashboard/AllAlbums'

export const router = createBrowserRouter([
  { path: '/', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: '/dashboard/my-dashboard/', element: <Dashboard /> },
      { path: '/dashboard/add-albums', element: <Albums /> },
      { path: '/dashboard/my-albums', element: <AllAlbums /> },
    ],
  },
])
