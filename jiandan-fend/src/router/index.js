import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/welcome'
import Index from '@/components/index'
import Me from '@/components/me'

import Jingxuan from '@/components/indexchildren/jingxuan'
import Video from '@/components/indexchildren/video'
import Pic from '@/components/indexchildren/picture'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'jx',
          name: 'jx',
          component: Jingxuan
        },
        {
          path: 'video',
          name: 'video',
          component: Video
        },
        {
          path: 'pic',
          name: 'pic',
          component: Pic
        }
      ]
    },
    {
      path: '/me',
      name: 'me',
      component: Me
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
