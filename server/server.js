var express = require('express')
var proxy = require('http-proxy-middleware')
// 支持gzip压缩
var compression = require('compression')

var app = express()

// 开启gzip压缩
app.use(compression())

// static
app.use('/', express.static('dist'))

// default api
let API = 'api'
let AUTH = 'auth'

//  api proxy
if (typeof (process.env.API) !== 'undefined' && process.env.API !== '') {
  API = process.env.API
} else {
  console.error('Env API is lost')
}
app.use('/api', proxy({target: API, logLevel: 'debug'}))
//  auth proxy
if (typeof (process.env.AUTH) !== 'undefined' && process.env.AUTH !== '') {
  AUTH = process.env.AUTH
} else {
  console.error('Env AUTH is lost')
}
app.use('/auth', proxy({target: AUTH, logLevel: 'debug'}))

// start server
var port = 8080
app.listen(port)
console.log('Running on http://localhost:' + port)
