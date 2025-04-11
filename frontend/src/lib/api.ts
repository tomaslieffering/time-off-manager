import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BACKEND,
	withCredentials: true,
	withXSRFToken: true,
})

axiosInstance.interceptors.request.use(function(config) {
	const token = localStorage.getItem('token')
	config.headers.Authorization =  token ? `Bearer ${token}` : ''
	return config
})

export default axiosInstance