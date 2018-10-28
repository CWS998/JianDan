
import Vue from 'vue'
import axios from 'axios'
import Toast from 'muse-ui-toast'

import NProgress from 'muse-ui-progress';
import 'muse-ui-progress/dist/muse-ui-progress.css';
Vue.use(NProgress);

Vue.use(Toast)

axios.defaults.baseURL = 'http://www.yuezhi.ml:5557/'
axios.defaults.timeout = 5000

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
  NProgress.start();
  return config
}, function (error) {
// 对请求错误做些什么
  Toast.error({
    position: 'top-start',
    time: 2000,
    message: '您的网络不好，请检查'
  })
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
// 对响应数据做点什么
  NProgress.done();
  switch (response.status) { 
    case 200:
      return response
      break
    default:
      Toast.error({
        position: 'top-start',
        time: 2000,
        message: '数据发送失败'
      });
      break
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default{
  Get (params, callback) {
    // 为给定 ID 的 user 创建请求
    axios.get(params.url, {
      params: params.par
    })
      .then((success) => {
        callback(success)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  Post (params,callback) {
    axios.post(params.url, params.par)
    .then(response => {
      callback(response)
    })
    .catch(error => {
      console.log(error)
    });
  }
}
