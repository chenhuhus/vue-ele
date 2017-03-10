// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

import './common/scss/index.scss'

Vue.use(VueResource)
// 相当于给每个vue实例(vm)扩展了一个$http方法
// this.$http.get()  this -> vm

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
