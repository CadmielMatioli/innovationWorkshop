import Vue from 'vue'
import Router from 'vue-router'
import VueDemo from '@/components/VueDemo'
import Messages from '@/components/Messages'
import ChartStates from '@/components/ChartStates'
import PieChartTwitter from "@/components/PieChartTwitter"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: VueDemo
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages
    },
    {
      path: '/states',
      name: 'states',
      component: ChartStates
    },
    {
      path: '/twitter',
      name: 'twitter',
      component: PieChartTwitter
    }
  ]
})
