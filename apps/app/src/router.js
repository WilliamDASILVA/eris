import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import Dialog from '@/views/Dialog'
import Explanation from '@/views/Explanation'
import Game from '@/views/Game'
import Victory from '@/views/Game/Victory'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'Dialog',
      path: '/dialog/:id',
      component: Dialog
    },
    {
      name: 'Explanation',
      path: '/explanation/:id',
      component: Explanation
    },
    {
      name: 'Game',
      path: '/game',
      component: Game
    },
    {
      name: 'Victory',
      path: '/game/victory',
      component: Victory
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
