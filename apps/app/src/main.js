import Vue from 'vue'
import VueGtag from 'vue-gtag'

import App from './App.vue'

import store from '@/plugins/Vuex'
import wait from '@/plugins/VueWait'
import router from './router'

import '@/assets/main.css'

Vue.use(VueGtag, {
  config: {
    id: 'UA-52605586-4'
  }
}, router)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  wait
}).$mount('#app')
