import request from '../utils/request'
// 推荐歌单 limit:获取数量
export const recommendSongListAPI = ({ limit }) => request({
  url: '/personalized',
  params: {
    limit
  }
})
// 推荐最新音乐 limit:获取数量
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

// 搜索  keywords:关键词  limit:获取数量  offset:偏移量 用于分页
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
// 获取音乐  id:音乐id
export const getMusicAPI = ({ id }) => request({
  url: `/song/detail?ids=${id}`
})
// 获取歌词  id: 音乐id
export const getLyricsAPI = ({ id }) => request({
  url: `/lyric?id=${id}`
})

// 获取歌单列表  id:歌单id
export const getSongListAPI = ({
  songListId
}) => request({
  url: '/playlist/track/all',
  params: {
    id: songListId
  }
})
