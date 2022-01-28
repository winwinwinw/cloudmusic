<template>
  <div>
    <div class="title">
      <van-nav-bar
        :title="$route.meta.title"
        fixed
      >
        <template #left>
          <van-icon name="arrow-left" size="0.7rem" color="#000" @click="$router.replace('/layout/mine')"/>
        </template>
      </van-nav-bar>
    </div>
    <van-sticky :offset-top="48">
     <van-form @submit="onSubmit">
       <van-field
         v-model="formLogin.username"
         name="手机号"
         label="手机号"
         placeholder="手机号"
         :rules="[{ required: true, message: '请填写正确的手机号' ,trigger :'onBlur',pattern :/^1[3456789]\d{9}$/}]"
       />
       <van-field
         v-model="formLogin.password"
         type="password"
         name="密码"
         label="密码"
         placeholder="密码"
         :rules="[{ required: true, message: '请填写密码' }]"
       />
       <div style="margin: 16px;">
         <van-button round block type="info" native-type="submit">登陆</van-button>
       </div>
     </van-form>
    </van-sticky>
  </div>
</template>

<script>
import { loginPWAPI } from '../../api'

export default {
  name: 'login',
  data () {
    return {
      formLogin: {
        username: '18324576519',
        password: 'dai20000316'
      }
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      const res = await loginPWAPI({
        phone: this.formLogin.username,
        password: this.formLogin.password
      })
      console.log(res)
    }
  }
}
</script>

<style scoped lang="scss">
.title {
}
.loginBox {
position: relative;
}
</style>
