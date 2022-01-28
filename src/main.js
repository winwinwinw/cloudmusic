import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mobile/flexible.js'
import './styles/reset.css'
import './vantRegistered.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
