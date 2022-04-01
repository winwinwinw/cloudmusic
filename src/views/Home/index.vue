<template>
  <div>
    <div>
      <van-search
        :placeholder="searchHotVal"

        @focus="enterSearchFn(searchHotVal)"
      />
    </div>
    <!--    轮播图 s-->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" alt="" style="width: 100%;height: 100%;"/>
      </van-swipe-item>
    </van-swipe>
    <!--    轮播图 e-->
    <p class="title">推荐歌单</p>
    <div>
      <van-row gutter="6">
        <van-col span="8" v-for="obj in recommendSongList" :key="obj.id" @click="songListFn(obj.id)">
          <div class="songListImg">
            <van-image
              width="100%"
              height="3rem"
              :src="obj.picUrl"
            />
            <div class="playCount">
              <van-icon name="service-o" size="10"/>
              <span>
                {{ Math.floor(obj.playCount / 10000) }}万
              </span>
            </div>
          </div>
          <p class="song_name">{{ obj.name }}</p>
        </van-col>
      </van-row>
    </div>
    <p class="title">推荐音乐</p>
    <div>
      <music-item
        v-for="(item,index) in recommendNewMusicList"
        :key="index"
        :name="item.name"
        :id="item.id"
        :albumName="item.song.album.alias[0]"
        :singerName="item.song.album.artists[0].name"
      ></music-item>
    </div>
  </div>
</template>

<script>
import { recommendSongListAPI, recommendNewMusicAPI, hotSearchListAPI } from '../../api'
import MusicItem from '../../components/MusicItem'
export default {
  name: 'index',
  data () {
    return {
      recommendSongList: [], // 推荐歌单
      recommendNewMusicList: [], // 推荐歌曲列表
      playCount: 0,
      hotSearchList: [], // 热搜列表
      placeholderHot: '', // 推荐的热搜词
      hotSearchID: Math.floor(Math.random() * 10), // 记录热搜词轮换位置
      time: null,
      images: [
        'https://w.wallhaven.cc/full/3z/wallhaven-3zwkz9.jpg',
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg'
      ]
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
    const searchHot = await hotSearchListAPI()
    this.hotSearchList = searchHot.data.result.hots
    this.searchTermRotation()
    this.placeholderHot = this.hotSearchList[this.hotSearchID].first
  },
  methods: {
    songListFn (songListID) {
      this.$router.push({
        path: '/songList',
        query: { songListID }
      })
    },
    // 热搜词轮换
    searchTermRotation () {
      clearInterval(this.time)
      this.time = setInterval(() => {
        this.hotSearchID++
        if (this.hotSearchID > 9) {
          this.hotSearchID = 0
        }
        this.placeholderHot = this.hotSearchList[this.hotSearchID].first
      }, 4000)
    },
    // 进入搜索界面
    enterSearchFn (searchHotVal) {
      clearInterval(this.time)
      this.$router.push({
        path: '/layout/search',
        query: {
          searchHotVal

        }
      })
    }
  },
  computed: {
    searchHotVal: {
      get () {
        return this.placeholderHot
      }
    }
  }
}
</script>

<style scoped lang="scss">
/* 标题 */
.title {
  padding: 10px 9px;
  margin: 0 0 9px 0;
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
  font-size: 18px;
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

.songListImg {
  position: relative;
  top: 0;

  .playCount {
    height: 12%;
    font-size: 12px;
    line-height: 12px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    color: #eee;
    position: absolute;
    top: 1px;
    right: 1px;
    display: flex;

  }

}

/*轮播图样式*/

.van-swipe-item {
  color: #fff;
  height: 4rem;
  font-size: 20px;
  line-height: 0;
  text-align: center;
  background-color: #39a9ed;
}

</style>
