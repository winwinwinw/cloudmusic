// 封装网络请求
import axios from 'axios'
const newAxios = axios.create({
  baseURL: 'http://localhost:3000', // 基地址
  headers: {},
  params: {},
  data: {}
})
export default newAxios
