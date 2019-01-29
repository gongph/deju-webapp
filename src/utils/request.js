import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://deju-api.boyuanziben.cn',
  timeout: 10000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.error(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default service