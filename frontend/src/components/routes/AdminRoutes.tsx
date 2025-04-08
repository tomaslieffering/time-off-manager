import { useAuth } from '@/contexts/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoutes() {
	const auth = useAuth()
	return (
		auth.user?.is_admin ? <Outlet /> : <Navigate to='/login' />
	)
}