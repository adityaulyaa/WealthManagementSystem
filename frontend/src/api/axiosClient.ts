import axios from 'axios'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
})

export default axiosClient
