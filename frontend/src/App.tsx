import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRequestsPage from '@/pages/UserRequestsPage'
import LogInPage from '@/pages/LogInPage'
import DefaultLayout from '@/layouts/DefaultLayout'
import AuthProvider from '@/contexts/AuthProvider'
import HomePage from '@/pages/HomePage'
import PrivateRoutes from '@/components/routes/PrivateRoutes'
import AdminRoutes from '@/components/routes/AdminRoutes'
import AddRequestPage from '@/pages/AddRequestPage'
import NotFoundPage from '@/pages/NotFoundPage'
import AdminRequestsPage from '@/pages/AdminRequestsPage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider >
          <Routes>
            <Route element={<DefaultLayout />}>

              <Route path='/requests' element={<PrivateRoutes />}>
                <Route index element={<UserRequestsPage />} />
                <Route path='new' element={<AddRequestPage />}></Route>
              </Route>

              <Route path='/admin' element={<AdminRoutes />}>
                <Route index element={<AdminRequestsPage />} />
              </Route>

              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LogInPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider >
  )
}

export default App
