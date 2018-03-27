import axios from 'axios'
import router from '@/router/index'
export const service = axios.create({
  // baseURL: NEW_API, // api的base_url // 使用反向代理baseURL必须 不设置
  timeout: 5000// request timeout
})
// 增加请求拦截器
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})
// 增加一个response拦截器
service.interceptors.response.use(function (response, res) {
  return response
}, function (error) {
  let resp = error.response
  if (resp.status === 401) {
    router.push({ path: '/login' })
  }
  return Promise.reject(resp)
})
export let apiObj = (obj) => {
  let url = ''
  for (let key in obj) {
    if (url.indexOf('?') === -1) {
      url += '?' + key + '=' + obj[key]
    } else {
      url += '&' + key + '=' + obj[key]
    }
  }
  return url
}

export const auth = '/auth'
export const proxy = '/api'
