import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllRequests from '@/pages/AllRequests'
import LogIn from '@/pages/LogIn'
import DefaultLayout from '@/layouts/DefaultLayout'
import AuthProvider from '@/providers/AuthProvider'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/requests' element={<AllRequests />} />
              <Route path='/login' element={<LogIn />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider >
  )
}

export default App
