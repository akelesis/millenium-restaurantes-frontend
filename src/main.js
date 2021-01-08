import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './store'
import './config/bootstrap'
import './registerServiceWorker'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
