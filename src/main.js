// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './demo/config/router';
import Demo from './demo';
import './polyfills';

Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  components: { Demo },
  template: '<Demo/>'
})
