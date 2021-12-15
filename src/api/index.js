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
export const searchListAPI = ({ keywords }) => request({
  url: '/cloudsearch',
  params: {
    keywords
  }
})
