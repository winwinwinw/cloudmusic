import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Play from '../views/Play'
import Search from '../views/Search'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    redirect: '/layout/home',
    children: [

      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      }, {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: {
          title: '搜索'
        }
      }
    ]
  }, {
    path: '/play',
    name: 'Play',
    component: Play
  }
]

const router = new VueRouter({
  routes
})

export default router
