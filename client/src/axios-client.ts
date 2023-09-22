import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('ACCESS_TOKEN')

  config.headers = config.headers || {}

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  (error: any) => {
    const { response } = error
    if (response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN')
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error
  },
)

export default axiosClient
