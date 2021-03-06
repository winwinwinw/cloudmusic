<template>
  <div class="play">
    <!-- 模糊背景(靠样式设置), && 有属性继续用, 固定定位 -->
    <div
      class="song-bg"
      :style="`background-image: url(${
        songInfo && songInfo.al && songInfo.al.picUrl
      }`"
    ></div>
    <!-- 播放页头部导航 -->
    <div class="header">
      <van-icon
        name="arrow-left"
        size="20"
        class="left-icon"
        @click="$router.back()"
      />
    </div>
    <!-- 播放页内容容器 -->
    <div class="song-wrapper">
      <div
        class="song-turn ani"
        :style="`animation-play-state:${playState ? 'running' : 'paused'}`"
      >
        <div class="song-img">
          <img
            style="width: 100%"
            :src="`${
              songInfo && songInfo.al && songInfo.al.picUrl
            }`"
            alt=""
          />
        </div>
      </div>
      <!-- 播放盒子 -->
      <div class="start-box" @click="audioStart">
        <span class="song-start" v-show="!playState"></span>
      </div>
      <!-- 播放歌词 -->
      <div class="song-msg">
        <h2 class="m-song-h2">
          <span class="m-song-sname"
          >{{ songInfo.name }}-{{
              songInfo && songInfo.ar && songInfo.ar[0].name
            }}</span
          >
        </h2>
        <div class="lrcContent">
          <p class="lrc">{{ curLyric }}</p>
        </div>
      </div>
      <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
    </div>
    <audio
      ref="audio"
      preload="auto"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    ></audio>
  </div>
</template>
<script>
// 获取歌曲详情和 歌曲的歌词接口
import { getMusicAPI, getLyricsAPI } from '../../api'
import { Icon } from 'vant'

export default {
  components: {
    [Icon.name]: Icon
  },
  name: 'play',
  data () {
    return {
      playState: false,
      id: this.$route.query.id,
      songInfo: {}, // 歌曲信息
      lyric: {}, // 歌词枚举对象
      curLyric: '', // 当前显示歌词
      lastLy: '', // 记录当前播放歌词
      audioEvent: null
    }
  },
  computed: {
    needleDeg () {
      return this.playState ? '-7deg' : '-38deg'
    }
  },
  methods: {
    async getSong () {
      const res = await getMusicAPI({
        id: this.id
      })
      this.songInfo = res.data.songs[0]
      // 处理歌词
      const lyrContent = await getLyricsAPI({
        id: this.id
      })
      const lyricStr = lyrContent.data.lrc.lyric
      this.lyric = this._formatLyr(lyricStr)
      // 初始化完毕先显示零秒歌词
      this.curLyric = this.lyric[0]
    },
    _formatLyr (lyricStr) { // 处理歌词
      const reg = /\[.+?\]/g
      const timeArr = lyricStr.match(reg)
      const contentArr = lyricStr.split(/\[.+?\]/).slice(1)
      const lyricObj = {}
      timeArr.forEach((item, index) => {
        const ms = item.split(':')[0].split('')[2] * 60
        const ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        lyricObj[ms + Number(ss)] = contentArr[index]
      })
      // 返回得到歌词对象
      // key是秒, value是显示的歌词
      return lyricObj
    },
    audioStart () {
      if (!this.playState) {
        try {
          this.$refs.audio.play()
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          this.$refs.audio.pause()
        } catch (err) {
          console.log(err)
        }
      }
      this.playState = !this.playState
    },
    showLyric () {
      // 监听播放audio进度, 切换歌词显示
      this.audioEvent = () => {
        // console.log(this.$refs.audio.currentTime)
        const curTime = Math.floor(this.$refs.audio.currentTime)
        // 避免空白出现
        if (this.lyric[curTime]) {
          this.curLyric = this.lyric[curTime]
          this.lastLy = this.curLyric
        } else {
          this.curLyric = this.lastLy
        }
      }
      this.$refs.audio.addEventListener('timeupdate', this.audioEvent)
    }
  },
  mounted () {
    this.getSong()
    this.showLyric()
    console.log(this.$route.query.id)
    console.log(this.$refs.audio.ended)
  },

  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.$refs.audio.removeEventListener('timeupdate', this.audioEvent)
    next()
  }
}
</script>
<style scoped>
.header {
  height: 50px;
}
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.song-bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  opacity: 1;
  filter: blur(25px);
}

.song-bg::before {
  content: " ";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.song-wrapper {
  position: fixed;
  width: 247px;
  height: 247px;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  z-index: 10001;
}
.song-turn {
  width: 100%;
  height: 100%;
  background: url("./img/bg.png") no-repeat;
  background-size: 100%;
}
.start-box {
  position: absolute;
  width: 156px;
  height: 156px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.song-start {
  width: 56px;
  height: 56px;
  background: url("./img/start.png");
  background-size: 100%;
}

.needle {
  position: absolute;
  transform-origin: left top;
  background: url("./img/needle-ab.png") no-repeat;
  background-size: contain;
  width: 73px;
  height: 118px;
  top: -40px;
  left: 112px;
  transition: all 0.6s;
}

.song-img {
  width: 154px;
  height: 154px;
  position: absolute;
  left: 50%;
  top: 50%;
  overflow: hidden;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.m-song-h2 {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #fefefe;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.lrcContent {
  margin-top: 50px;
}

.lrc {
  font-size: 14px;
  color: #fff;
  text-align: center;
}

.left-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  z-index: 10001;
  color: #fff;
}

.ani {
  animation: turn 5s linear infinite;
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
