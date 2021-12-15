<template>
<div>
  <div>
    <van-nav-bar
      :title="$route.meta.title"
      fixed
    />
  </div>
  <div class="main">
    <router-view></router-view>
  </div>
  <div>
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
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
