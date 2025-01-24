import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import HomePage from '@/pages/HomePage'
import ParentDashboard from '@/pages/ParentDashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'dashboard',
        element: <ParentDashboard />
      }
    ]
  }
])
