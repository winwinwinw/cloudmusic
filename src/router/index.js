import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Play from '../views/Play'
import Search from '../views/Search'
import Home from '../views/Home'
import SongList from '../views/SongList'
import Mine from '../views/Mine'
import Broadcasting from '../views/Broadcasting'
import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登陆'
    }
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

const createRouter = () => new VueRouter({
  routes
})
const router = createRouter()
// router.beforeEach((to, from, next) => {
//   // ...
// })
export function resetRouter () {
  router.matcher = createRouter().matcher
}
export default router
