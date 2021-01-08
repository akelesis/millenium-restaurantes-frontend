import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../components/settings_page/Settings.vue'
import Restaurant from '../components/restaurant/Restaurant.vue'
import Table from '../components/restaurant/Table.vue'
import Reports from '../components/restaurant/Reports.vue'
import Receipt from '../components/restaurant/Receipt.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: Restaurant
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports
    },
    {
      path: '/receipt',
      name: 'receipt',
      component: Receipt
    },
  ]
})
