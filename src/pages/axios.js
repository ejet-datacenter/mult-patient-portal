import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// axios.interceptors.request.use(
//   config => {
//     if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//       config.headers.Authorization = token
//     }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )

// axios.interceptors.response.use((response) => {
//
// })
axios.defaults.baseURL = 'http://192.168.20.52:8299/pview/';
//axios.defaults.baseURL = 'http://127.0.0.1:8299/pview/';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;