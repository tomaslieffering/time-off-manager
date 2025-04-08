import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: import.meta.env.REACT_APP_BACKEND,
	withCredentials: true,
	withXSRFToken: true
})

export default axiosInstance