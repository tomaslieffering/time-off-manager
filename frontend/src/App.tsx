import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllRequests from '@/components/AllRequests'
import LogIn from '@/components/LogIn'
import DefaultLayout from './layouts/DefaultLayout'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/requests' element={<AllRequests />} />
            <Route path='/login' element={<LogIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
