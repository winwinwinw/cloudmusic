<template>
  <div>
    <p class="title">热门推荐</p>
    <div>
      <van-row gutter="6">
        <!--        van-row和van-col用的是vant组件库里的layout布局-->
        <van-col span="8" v-for="obj in recommendSongList" :key="obj.id" @click="songListFn(obj.id)">
          <van-image
            width="100%"
            height="3rem"
            :src="obj.picUrl"
          />
          <p class="song_name">{{ obj.name }}</p>
        </van-col>
      </van-row>
    </div>
    <p class="title">推荐音乐</p>
    <div>
      <!--      musicItem是公共组件   name:歌曲名 id:歌曲id albumName:专辑名  singerName:歌手名-->
      <music-item
        v-for="item in recommendNewMusicList"
        :key="item.id"
        :name="item.name"
        :id="item.id"
        :albumName="item.song.album.alias[0]"
        :singerName="item.song.album.artists[0].name"
      ></music-item>
    </div>
  </div>
</template>

<script>
import { recommendSongListAPI, recommendNewMusicAPI } from '../../api'
import MusicItem from '../../components/MusicItem'
export default {
  name: 'index',
  data () {
    return {
      recommendSongList: [], // 推荐歌单
      recommendNewMusicList: [] // 推荐歌曲列表
    }
  },
  components: {
    MusicItem
  },
  async created () {
    const res = await recommendSongListAPI({ limit: 6 })
    this.recommendSongList = res.data.result
    const res2 = await recommendNewMusicAPI({ limit: 10 })
    this.recommendNewMusicList = res2.data.result
    console.log(res)
  },
  methods: {
    songListFn (songListID) {
      this.$router.push({
        path: '/songList',
        query: { songListID }
      })
    }
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
