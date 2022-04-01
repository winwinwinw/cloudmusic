import { getToken, setToken, removeToken } from '../../utils/auth'
import { loginPWAPI, logoutAPI } from '../../api'
// import { loginPWAPI, logoutAPI, userDetailAPI } from '../../api'
import { resetRouter } from '@/router'

const defaultState = () => {
  return {
    cookie: '',
    token: getToken() || [],
    userDetail: {} // 用户详情对象
  }
}
const state = defaultState()

const mutations = {
  RESET_STATE: (state) => {
    // state = { ...defaultState() }
    Object.assign(state, defaultState())
  },
  SET_TOKEN (state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  REMOVE_TOKEN (state) {
    state.token = ''
    removeToken()
  },
  SET_USER (state, value) {
    state.userDetail = value
  },
  SET_COOKIE (state, value) {
    state.cookie = encodeURIComponent(value)
  },
  REMOVE_COOKIE (state) {
    state.cookie = ''
  }
}
const actions = {
  async getLoginActions ({ commit }, value) {
    const res = await loginPWAPI(value)
    if (res.data.code === 200) {
      commit('SET_USER', res.data)
      commit('SET_TOKEN', res.data.token)
      commit('SET_COOKIE', res.data.cookie)
    }
    return res
  },
  // async getUserDetailActions ({ commit }, value) {
  //   const { data: userObj } = userDetailAPI(value)
  //   commit('SET_USER', userObj)
  //   return userObj
  // },
  loginOutActions ({ commit }) {
    commit('RESET_STATE')
    commit('REMOVE_TOKEN')
    commit('REMOVE_COOKIE')
    resetRouter()
    logoutAPI()
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
