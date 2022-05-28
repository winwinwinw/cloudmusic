import request from '../utils/request'

// 登陆---------手机号,密码登陆
export const loginPWAPI = ({
  phone,
  password,
  captcha,
  // eslint-disable-next-line camelcase
  md5_password
}) => request({
  url: '/login/cellphone',
  method: 'get',
  params: {
    phone,
    password,
    captcha,
    md5_password
  }
})
// 退出登陆
export const logoutAPI = () => request({ url: '/logout' })
// 获取登录状态
export const loginStatusAPI = () => request({ url: '/login/status' })
// 获取用户详情
export const userDetailAPI = ({ uid }) => request({
  url: '/user/detail',
  params: {
    uid
  }
})
// 获取账号信息
export const accountAPI = () => request({ url: '/user/account' })
