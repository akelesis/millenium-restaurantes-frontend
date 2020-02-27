import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
import Restaurant from '../components/restaurant/Restaurant.vue'
import Table from '../components/restaurant/Table.vue'
import Reports from '../components/restaurant/Reports.vue'

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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
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
    }
  ]
})
