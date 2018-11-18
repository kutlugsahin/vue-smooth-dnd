import Vue from 'vue'

import './utils/polyfills'

import './assets/layout.css'
import './assets/header.css'
import './assets/nav.css'
import './assets/demos.css'
import './assets/form.css'

import router from './config/router'
import Demo from './index.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: { Demo },
  template: '<Demo/>'
})
