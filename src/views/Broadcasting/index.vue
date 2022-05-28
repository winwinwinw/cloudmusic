<template>
<div>
  <button @click="btn">验证登录状态</button>
</div>
</template>

<script>
import { loginStatusAPI } from '@/api'

export default {
  name: 'index',
  methods: {
    async btn () {
      try {
        const res = await loginStatusAPI()
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
