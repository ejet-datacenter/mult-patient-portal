import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/view',
  routes: [
    //首页
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/home',
    },

    //search
    {
      path: '/search',
      name: 'Search',
      component: Search,
      alias: '/search',
    },

  ]

})
