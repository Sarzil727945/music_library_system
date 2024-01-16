import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import { router } from './routes/Routes'
import { Toaster } from 'react-hot-toast'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchProvider } from './providers/SearchContext'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <SearchProvider>
        <div>
          <RouterProvider router={router} />
        </div>
      </SearchProvider>
    </QueryClientProvider>
  </AuthProvider>
)
