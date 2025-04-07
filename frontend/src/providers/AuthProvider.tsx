import { LoginInputs } from '@/types/LoginInputs'
import { useContext, createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '@/lib/api'

interface AuthProviderProps {
	user: string | null,
	logIn(data: LoginInputs): void,
	logOut(): void
}

const AuthContext = createContext<AuthProviderProps>({
	user: null,
	logIn: () => { },
	logOut: () => { }
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(localStorage.getItem('user') || null)
	const navigate = useNavigate()

	const logIn = (data: LoginInputs) => {
		axiosInstance.get("/sanctum/csrf-cookie").then(() => {
			axiosInstance
				.post("/api/login", {
					email: data.email,
					password: data.password,
				})
				.then((response) => {
					setUser(response.data.data.user)
					localStorage.setItem('user', response.data.data.user);
				})
				.catch(function (error) {
					console.error(error)
				})
		})
		navigate('/requests')
	}

	const logOut = () => {
		axiosInstance.post('/api/logout').then(() => {
			setUser(null)
			localStorage.removeItem('user');
		})
		navigate('/')
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