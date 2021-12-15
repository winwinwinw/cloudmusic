import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mobile/flexible.js'
import './styles/reset.css'
import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, Cell, CellGroup, Icon, Search, List } from 'vant'

Vue.use(List)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(VanImage)
Vue.use(Col)
Vue.use(Row)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
