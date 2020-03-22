import Vue from 'vue'

import App from './App.vue'

import store from '@/plugins/Vuex'
import wait from '@/plugins/VueWait'

import '@/assets/main.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  wait
}).$mount('#app')
