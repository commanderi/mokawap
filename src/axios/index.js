import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'
// import Store from '../index/index.js'

// console.log(Store.state.http)
//
Axios.defaults.baseURL = 'http://api.vs04o.cn/' // Store.state.http
Axios.defaults.timeout = 50000
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.post['Accept'] = 'application/json'
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.get['Accept'] = 'application/json'
Axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.delete['Accept'] = 'application/json'
Axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.headers.put['Accept'] = 'application/json'
//设置axios为form-data
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.transformRequest = [function (data) {
  // console.log(data)
  data = Qs.stringify(data)
  return data
}]
// 设置请求token
// Axios.interceptors.request.use(config => {
//   config.headers = {
//     'Content-Type': 'application/json;charset=utf-8'
//   }
//   // console.log(config)
//   return config
// })

let app = new Vue({})
// 接口错误拦截
Axios.interceptors.response.use(res => {
  // console.log(res)
  if (res.status === 401) {
    // app && app.$message({
    //   type: 'warning',
    //   message: '登录身份过期，请重新登录。'
    // })
    // sessionStorage.removeItem('loginInfo')
    // router.push({name: 'login'})
  } else {
    return res.data
  }
}, err => {
  console.log(err)
  // app.$notify.error({
  //   title: '服务错误',
  //   message: '服务器响应错误 ' + err.message
  // })
  return Promise.reject(err)
})
export default Axios
