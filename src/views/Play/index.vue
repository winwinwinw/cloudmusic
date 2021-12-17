<template>
  <div class="play">
    <div
      class="song-bg"
      :style="`background-image: url(${
        songInfo && songInfo.al && songInfo.al.picUrl
      }`"
    ></div>
    <div class="header">
      <van-icon
        name="arrow-left"
        size="20"
        class="left-incon"
        @click="$router.back()"
      />
    </div>
    <div class="song-wrapper">
      <div
        class="song-turn ani"
        :style="`animation-play-state:${playState ? 'running' : 'paused'}`">
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

    </div>

    <audio
      ref="audio"
      preload="true"
      :src="`https://music.163.com/song/media/outer/url?id=${id}.mp3`"
    ></audio>
  </div>
</template>

<script>
import { getMusicAPI } from '../../api'
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
      songInfo: {} // 歌曲信息
    }
  },

  methods: {
    async getSong () {
      const res = await getMusicAPI({ id: this.id })
      this.songInfo = res.data.songs[0]
    },

    audioStart () {
      if (!this.playState) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
      this.playState = !this.playState
    }

  },
  mounted () {
    this.getSong()
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

.left-incon {
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
