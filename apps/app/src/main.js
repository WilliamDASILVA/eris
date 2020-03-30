import Vue from 'vue'

import App from './App.vue'

import store from '@/plugins/Vuex'
import wait from '@/plugins/VueWait'
import router from './router'

import '@/assets/main.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  wait
}).$mount('#app')
