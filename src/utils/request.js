// 封装网络请求
import axios from 'axios'
import { setToken } from './auth'
// import { DNotify } from './notify'

const newAxios = axios.create({
  baseURL: 'http://121.40.228.138:3000/', // 基地址
  headers: {},
  params: {},
  data: {},
  xhrFields: { withCredentials: true },
  timeout: 5000
})

// 添加请求拦截器
newAxios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么`
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

// 添加响应拦截器
newAxios.interceptors.response.use(
  response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response.data)
    const { code } = response.data
    if (code !== 200) {
      // 登陆失败,密码错误
      // DNotify({ message: '密码错误' })

      return Promise.reject(response)
    }
    // 登陆成功,设置token
    setToken(response.data.token)
    return response
  },

  error => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default newAxios
