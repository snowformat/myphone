import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Exchange from '@/components/common/Exchange'
import Success from '@/components/common/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: '/',
          name: 'Exchange',
          component: Exchange},
        {
          path: '/Success',
          name: 'Success',
          component: Success}
      ]
    }
  ]
})
