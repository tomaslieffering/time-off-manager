import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRequestsPage from '@/pages/UserRequestsPage'
import LogInPage from '@/pages/LogInPage'
import DefaultLayout from '@/layouts/DefaultLayout'
import AuthProvider from '@/contexts/AuthProvider'
import HomePage from '@/pages/HomePage'
import PrivateRoutes from '@/components/routes/PrivateRoutes'
import AdminRoutes from '@/components/routes/AdminRoutes'
import AddRequestPage from './pages/AddRequestPage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider >
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route element={<PrivateRoutes />}>
                <Route path='/requests' element={<UserRequestsPage />} />
                <Route path='/requests/new' element={<AddRequestPage />}></Route>
              </Route>
              <Route element={<AdminRoutes />}>
                {/* <Route path='/' element={<AllRequestsPage />} /> */}
              </Route>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LogInPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider >
  )
}

export default App
