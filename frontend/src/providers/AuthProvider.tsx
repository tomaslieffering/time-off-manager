import { LoginInputs } from '@/types/LoginInputs'
import { useContext, createContext, ReactNode, useState } from 'react'
import axiosInstance from '@/lib/api'
import { User } from '@/types/User'

interface AuthProviderProps {
	user: User | null,
	logIn(data: LoginInputs): Promise<boolean | void>,
	logOut(): Promise<boolean | void>
}

const AuthContext = createContext<AuthProviderProps>({
	user: null,
	logIn: async () => { },
	logOut: async () => { }
})

const AuthProvider = ({ children }: { children: ReactNode }) => {

	const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

	const logIn = async (data: LoginInputs) => {
		await axiosInstance.get('/sanctum/csrf-cookie')
		const success = await axiosInstance
			.post('/api/login', {
				email: data.email,
				password: data.password,
			})
			.then((response) => {
				setUser(response.data.data.user)
				localStorage.setItem('user', JSON.stringify(response.data.data.user));
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
			localStorage.removeItem('user');
			return true
		}).catch(() => {
			return false
		})

		return success
	}

	return (
		<AuthContext.Provider value={{ user, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider

export const useAuth = () => {
	return useContext(AuthContext)
}