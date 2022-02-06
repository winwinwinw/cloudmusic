const getters = {
  UserID: state => {
    if (JSON.stringify(state.user.userDetail) !== '{}') {
      return state.user.userDetail.account.id
    }
    return null
  },
  token: state => state.user.token,
  nickName: state => {
    if (JSON.stringify(state.user.userDetail) !== '{}') {
      return state.user.userDetail.profile.nickname
    }
    return null
  },
  headP: state => {
    if (JSON.stringify(state.user.userDetail) !== '{}') {
      return state.user.userDetail.profile.avatarUrl
    }
    return null
  },
  follows: state => {
    if (JSON.stringify(state.user.userDetail) !== '{}') {
      return state.user.userDetail.profile.follows
    }
    return null
  }
}
export default getters
