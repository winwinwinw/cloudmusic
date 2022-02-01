<template>
<div>
  <div v-if="loginStatus">
    已登录
  </div>
  <div v-else>
    <van-empty description="请登录">
      <van-button round type="danger" class="bottom-button">登陆</van-button>
    </van-empty>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      loginStatus: false
    }
  },
  created () {

  }
}
</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>
