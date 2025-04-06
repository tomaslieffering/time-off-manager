import { LoginInputs } from '@/types/LoginInputs'
import { useContext, createContext, ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthProviderProps {
	user: string | null,
	token: string,
	logIn(data: LoginInputs): void,
	logOut(): void
}

const AuthContext = createContext<AuthProviderProps>({
	user: null,
	token: '',
	logIn: () => { },
	logOut: () => { }
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState('');
	const navigate = useNavigate();

	const logIn = (data: LoginInputs) => {

	}

	const logOut = () => {

	}

	return (
		<AuthContext.Provider value={{ user, token, logIn, logOut }}>

		</AuthContext.Provider>
	)
}