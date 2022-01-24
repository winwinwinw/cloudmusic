import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Play from '../views/Play'
import Search from '../views/Search'
import Home from '../views/Home'
import SongList from '../views/SongList'
import Mine from '../views/Mine'
import Broadcasting from '../views/Broadcasting'

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
          title: '音乐'
        }
      },
      {
        path: 'search',
        name: 'Search',
        component: Search,
        meta: {
          title: '搜索'
        }
      },
      {
        path: 'mine',
        name: 'Mine',
        component: Mine,
        meta: {
          title: '我的'
        }
      }, {
        path: 'broadcasting',
        name: 'broadcasting',
        component: Broadcasting,
        meta: {
          title: '电台'
        }

      }

    ]
  }, {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/songList',
    name: 'SongList',
    component: SongList
  }, {
    path: '*',
    redirect: '/layout/home',
    hidden: true
  }

]

const router = new VueRouter({
  routes
})

export default router
