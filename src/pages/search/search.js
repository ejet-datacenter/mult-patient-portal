// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '../../assets/css/neat.css'
import '../../assets/css/font-awesome.min.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import "../axios.js"

import Search from './Search.vue'

Vue.use(ElementUI);
Vue.use(VueAxios, axios)


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(Search)
})
