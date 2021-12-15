<template>
  <div>
    <p class="title">热门推荐</p>
    <div>
      <van-row gutter="6">
      <van-col span="8" v-for="obj in recommendSongList" :key="obj.id">
        <van-image
          width="100%"
          height="3rem"
          :src="obj.picUrl"
        />
        <p class="song_name">{{obj.name}}</p>
      </van-col>
    </van-row>
    </div>
    <p class="title">推荐音乐</p>
    <div>
      <van-cell-group>
        <van-cell
          v-for="item in recommendNewMusicList"
          :key="item.id" center
          :title="item.name"
          :label="item.song.artists[0].name+(item.song.alias.length >=1 ?'-'+item.song.alias[0]:'')"
          >
          <template v-slot:right-icon>
            <van-icon name="play-circle-o" size="0.6rem"/>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { recommendSongListAPI, recommendNewMusicAPI } from '../../api'

export default {
  name: 'index',
  data () {
    return {
      recommendSongList: [],
      recommendNewMusicList: []

    }
  },
  async created () {
    const res = await recommendSongListAPI({ limit: 6 })
    this.recommendSongList = res.data.result
    const res2 = await recommendNewMusicAPI({ limit: 10 })
    this.recommendNewMusicList = res2.data.result
  }
}
</script>

<style scoped>
/* 标题 */
.title {
  padding: 10px 9px;
  margin: 0 0 9px 0;
  background-color: #eee;
  color: #333;
  font-size:18px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 13px;
  padding: 0 3px;
  margin-bottom: 10px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>
