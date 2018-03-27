import {service as request, apiObj, auth} from './request.js'
// import {axiosObj} from './axios_obj.js'
const login = {
  // form表单提交的列子
  login (user) {
    return request({
      url: auth + '/login',
      method: 'post',
      data: user,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
  },
  send (data) {
    return request({
      url: auth + '/send' + apiObj(data),
      method: 'get' // post、put、delete
    })
  }
}
export default login
