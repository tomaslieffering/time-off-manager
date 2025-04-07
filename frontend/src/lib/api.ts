import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://api.timemanager.local',
	withCredentials: true,
	withXSRFToken: true
})

export default axiosInstance