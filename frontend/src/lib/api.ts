import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://ec2-16-171-33-96.eu-north-1.compute.amazonaws.com',
	withCredentials: true,
	withXSRFToken: true
})

export default axiosInstance