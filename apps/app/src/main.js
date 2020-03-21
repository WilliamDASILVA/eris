import Vue from 'vue'

import App from './App.vue'

import store from '@/plugins/Vuex'
import wait from '@/plugins/VueWait'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  wait
}).$mount('#app')
