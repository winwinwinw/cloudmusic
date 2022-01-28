import request from '../utils/request'
// 推荐歌单
export const recommendSongListAPI = ({ limit }) => request({
  url: '/personalized',
  params: {
    limit
  }
})
// 推荐最新音乐
export const recommendNewMusicAPI = ({ limit }) => request({
  url: '/personalized/newsong',
  params: {
    limit
  }
})
// 获取热搜列表,简略版
export const hotSearchListAPI = () => request({
  url: '/search/hot'
})

// 搜索
export const searchListAPI = ({
  keywords,
  limit,
  offset
}) => request({
  url: '/cloudsearch',
  params: {
    keywords,
    limit,
    offset
  }
})
// 获取音乐
export const getMusicAPI = ({ id }) => request({
  url: `/song/detail?ids=${id}`
})
// 获取歌词
export const getLyricsAPI = ({ id }) => request({
  url: `/lyric?id=${id}`
})

// 获取歌单列表
export const getSongListAPI = ({
  songListId
}) => request({
  url: '/playlist/track/all',
  params: {
    id: songListId
  }
})

// 登陆---------手机号,密码登陆
export const loginPWAPI = ({
  phone,
  password,
  captcha,
  // eslint-disable-next-line camelcase
  md5_password
}) => request({
  url: '/login/cellphone',
  params: {
    phone,
    password,
    captcha,
    md5_password
  }
})
