<template>
<div>
  <div v-if="loginStatus" class="userBox">
    <div class="userInfo">
      <div class="headP">
        <img style="width: 100%" :src="$store.getters.headP" alt="">
      </div>
      <div class="nickName">{{ $store.getters.nickName }}</div>
      <div class="info"><span style="color: #39a9ed">关注数:</span>{{ $store.getters.follows }}</div>
    </div>
    <div class="tool">
      <div class="toolBox" v-for="(item,index) in toolList" :key="index">
        <van-icon :name="item.icon" :color="item.color ? '#c1c1c1':'#c20c0c'" size="42"/>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
  <div v-else>
    <van-empty description="请登录">
      <van-button round type="danger" class="bottom-button" @click="loginFN">登陆</van-button>
    </van-empty>
  </div>
</div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      loginStatus: false,
      toolList: [
        {
          name: '最近播放',
          icon: 'clock'
        }, {
          name: '本地/下载',
          icon: 'label'
        }, {
          name: '云盘',
          icon: 'music'
        }, {
          name: '已购',
          icon: 'goods-collect'
        }, {
          name: '我的好友',
          icon: 'friends'
        }, {
          name: '收藏和赞',
          icon: 'star'
        }, {
          name: '我的博客',
          icon: 'audio'
        }, {
          name: '音乐应用',
          icon: 'add-o',
          color: '#eee'
        }
      ]// 工具列表,默认为8个
    }
  },
  created () {
    if (!this.loginStatus && this.$store.getters.UserID) {
      this.loginStatus = true
    }
  },
  methods: {
    loginFN () {
      this.$router.push('/login')
    }

  }
}
</script>

<style scoped lang="scss">
.bottom-button {
  width: 160px;
  height: 40px;
}

.userBox {
  width: 100%;
  height: 800px;
  background-color: #f0f1f5;
  font-size: 18px;

  .userInfo {
    width: 80%;
    height: 16%;
    background-color: #fff;
    border-radius: 14px;
    margin: 0 auto;
    position: relative;
    top: 40px;
    box-shadow: -2px 4px 2px 2px #cddbe6;

    .headP {
      width: 30%;
      height: 70%;
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translate(-50%, -20%);
      overflow: hidden;
      background-color: red;
      border-radius: 50%;

    }

    .nickName {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translate(-50%, -20%);
    }

    .info {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translate(-50%, -20%);
    }
  }

  .tool {
    width: 88%;
    height: 30%;
    background-color: #fff;
    border-radius: 14px;
    font-size: 14px;
    margin: 0 auto;
    position: relative;
    top: 60px;
    display: flex;
    justify-items: auto;
    flex-wrap: wrap;

    .toolBox {
      flex: auto;
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
