import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRequestsPage from '@/pages/user/UserRequestsPage'
import LogInPage from '@/pages/auth/LogInPage'
import DefaultLayout from '@/layouts/DefaultLayout'
import AuthProvider from '@/contexts/AuthProvider'
import HomePage from '@/pages/HomePage'
import PrivateRoutes from '@/components/routes/PrivateRoutes'
import AdminRoutes from '@/components/routes/AdminRoutes'
import AddRequestPage from '@/pages/user/AddRequestPage'
import NotFoundPage from '@/pages/NotFoundPage'
import AdminRequestsPage from '@/pages/admin/AdminRequestsPage'
import UserCalendarPage from '@/pages/user/UserCalendarPage'
import AdminCalendarPage from '@/pages/admin/AdminCalendarPage'
import AboutPage from '@/pages/AboutPage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<DefaultLayout />}>

              <Route element={<PrivateRoutes />}>
                <Route path='/requests' element={<UserRequestsPage />} />
                <Route path='/requests/new' element={<AddRequestPage />} />
                <Route path='/calendar' element={<UserCalendarPage />} />

                <Route path='/admin' element={<AdminRoutes />}>
                  <Route path='requests' element={<AdminRequestsPage />} />
                  <Route path='calendar' element={<AdminCalendarPage />} />
                </Route>
              </Route>


              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LogInPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider >
  )
}

export default App
