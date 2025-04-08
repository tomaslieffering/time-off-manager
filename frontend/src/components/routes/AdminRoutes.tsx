import { useAuth } from '@/contexts/AuthProvider'
import NotAuthorizedPge from '@/pages/NotAuthorizedPage'
import { Outlet } from 'react-router-dom'

export default function AdminRoutes() {
	const auth = useAuth()
	return (
		auth.user?.is_admin ? <Outlet /> : <NotAuthorizedPge />
	)
}