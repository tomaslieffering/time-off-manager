import { LogInForm } from '@/types/LogInForm'
import { useContext, createContext, ReactNode, useState } from 'react'
import axiosInstance from '@/lib/api'
import { User } from '@/types/User'
import { useQueryClient } from '@tanstack/react-query'

interface AuthProviderProps {
	user: User | null,
	token: string,
	logIn(data: LogInForm): Promise<boolean | void>,
	logOut(): Promise<boolean | void>
}

const AuthContext = createContext<AuthProviderProps>({
	user: null,
	token: '',
	logIn: async () => { },
	logOut: async () => { }
})

const AuthProvider = ({ children }: { children: ReactNode }) => {

	const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
	const [token, setToken] = useState(localStorage.getItem('token') || '')
	const queryClient = useQueryClient()

	const logIn = async (data: LogInForm) => {
		const success = await axiosInstance
			.post('/api/login', {
				email: data.email,
				password: data.password,
			})
			.then((response) => {
				setUser(response.data.data.user)
				localStorage.setItem('user', JSON.stringify(response.data.data.user));
				setToken(response.data.data.token)
				localStorage.setItem('token', response.data.data.token);

				return true
			})
			.catch(() => {
				return false
			})

		return success
	}

	const logOut = async () => {
		const success = await axiosInstance.post('/api/logout').then(() => {
			setUser(null)
			setToken('')
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			queryClient.removeQueries()
			return true
		}).catch(() => {
			return false
		})

		return success
	}

	return (
		<AuthContext.Provider value={{ user, token, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

export const useAuth = () => {
	return useContext(AuthContext)
}