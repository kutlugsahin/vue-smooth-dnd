import Vue from 'vue'

import './demo/utils/polyfills'

import './demo/assets/layout.css'
import './demo/assets/header.css'
import './demo/assets/nav.css'
import './demo/assets/demos.css'
import './demo/assets/form.css'

import router from './demo/config/router'
import Demo from './demo'

Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: { Demo },
  template: '<Demo/>'
})
