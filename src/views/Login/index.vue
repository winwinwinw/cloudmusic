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
    <div class="reg">
      <!-- 临时的!!!!!!!-->
      <a href="javascript:">注册</a>
      <span> | </span>
      <a href="javascript:">找回密码</a>
    </div>
    <van-button @click="loginStatusFN" style="margin-top: 300px">清除VueRouter缓存</van-button>
  </div>
</template>

<script>
// import { userDetailAPI } from '../../api'
import { DNotify } from '../../utils/notify'
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      formLogin: {
        username: '18324576519',
        password: 'dai20000316'
      },
      uid: 0
    }
  },
  methods: {
    ...mapActions('user', ['getLoginActions', 'loginOutActions']),
    async onSubmit (values) {
      try {
        const res = await this.getLoginActions({
          phone: this.formLogin.username,
          password: this.formLogin.password
        })
        this.$router.replace({
          path: '/layout'
        })
        console.log(res)
        this.uid = res.data.account.id
        DNotify({
          type: 'success',
          message: '登陆成功'
        })
      } catch (err) {
        // 账号输入错误
        DNotify({
          message: '手机号或密码错误'
        })
        console.log(err)
      }
    },
    loginStatusFN () {
      this.loginOutActions()
    }
  }
}
</script>

<style scoped lang="scss">
.title {
}

.reg {
  margin-top: 48px;
  text-align: center;
  font-size: 12px;
}
</style>
