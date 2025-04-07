import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllRequests from '@/pages/AllRequests'
import LogInPage from '@/pages/LogInPage'
import DefaultLayout from '@/layouts/DefaultLayout'
import AuthProvider from '@/providers/AuthProvider'
import HomePage from '@/pages/HomePage'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/requests' element={<AllRequests />} />
              <Route path='/login' element={<LogInPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider >
  )
}

export default App
