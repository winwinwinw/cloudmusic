<template>
<div>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      fixed
    >
      <template #left>
        <van-icon name="wap-nav" size="0.7rem" color="#000"/>
      </template>
    </van-nav-bar>
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
  <div>
    <van-tabbar route v-model="active">
      <van-tabbar-item replace to="/layout/home" icon="music-o">音乐</van-tabbar-item>
<!--      <van-tabbar-item replace to="/layout/broadcasting" icon="service-o">电台</van-tabbar-item>-->
      <van-tabbar-item replace to="/layout/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0

    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
