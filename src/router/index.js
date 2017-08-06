import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Landing from '@/components/Landing'
import Find from '@/components/Find'

Vue.use(Router)
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
        path: '/find',
        name: 'Find',
        component: Find
    }
  ]
})
