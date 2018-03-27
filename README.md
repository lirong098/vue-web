vue-web
===============

vue-web基于vue-cli 2.9.3生成基础项目，再优化项目结构：

 + 增加全局变量及方法
 + 增加svg-icon组件
 + 配置按需加载
 + 封装element-ui的table和pagination组件

参考 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## 目录结构

目录结构如下：

~~~
vue-web 部署目录
├─build           webpack应用目录
│  ├─build.js           npm run build 执行脚本
│  ├─check-versions.js           检查web环境版本
│  ├─utils.js           静态资源预处理器（css、个人理解）
│  ├─vue-loader.conf.js           组件预处理器配置
│  ├─webpack.base.conf.js           webpack基础配置
│  ├─webpack.dev.conf.js           npm run dev 执行脚本及开发环境时 webpack打包配置
│  └─webpack.prod.conf.js           生产环境时webpack打包配置
│
├─config           项目配置文件（对外访问目录）
│  ├─dev.env.js           开发环境配置
│  ├─index.js           项目配置文件
│  ├─prod.env.js           生产环境配置
│  └─test.env.js           单元测试配置（此项目没有用）
│
├─server           node中间服务文件（用于生产环境web服务器的中间服务）
│  ├─package.json           安装依赖包
│  └─server.js           node服务脚本
│
├─src           应用目录
│  ├─api           项目api模块
│  │  ├─index.js           api入口
│  │  ├─login.js           登录模块的api（自定义）
│  │  └─request.js           请求服务设置（axios、请求拦截器...）
│  ├─assets           静态资源
│  ├─components           公共组件
│  │  ├─SvgIcon           svg-icon组件（例子）
│  │  └─table           table组件（例子）
│  ├─global           全局方法及变量
│  │  ├─means.js           全局方法
│  │  └─variable.js           全局变量
│  ├─icons           图标
│  │  ├─svg           svg资源
│  │  └─index.js           注册全局svg-icon组件
│  ├─router           路由
│  │  ├─before_each.js           vue-router导航守卫
│  │  └─index.js           vue-router配置
│  ├─store           vuex配置
│  │  ├─modules           按模块设置全局状态及管理
│  │  ├─getters.js           全局状态的计算属性
│  │  └─index.js           vuex入口
│  ├─views           视图目录
│  │  ├─layout           项目布局
│  │  ├─login           登录模块
│  │  └─svg-icons           svg-icon列表
│  ├─App.vue           应用组件
│  └─main.js           应用主入口
│
├─static           静态资源
├─test           单元测试（没有启用）
├─.babelrc           ES6编译设置
├─.editorconfig           统一代码格式的解决方案，[参考：有各个参数的说明](https://github.com/cy0707/Learn_Vue/issues/6)
├─eslintignore.js           eslint不检查目录配置
├─eslintrc.js           eslint配置
├─gitignore           git不上传目录配置
├─.gitlab-ci.yml           gitlab-ci 自动部署脚本
├─.postcssrc.js           [参考](https://github.com/michael-ciniawsky/postcss-load-config)
├─Dockerfile           docker镜像文件
├─index.html           入口文件
~~~
# 按需加载
vue项目实现按需加载有3种方式：
* [vue异步组件](https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)
```javascript
{
    path: '/svgicons',
    name: 'svg_icons',
    component: resolve => require(['@/views/svg-icons/index.vue'], resolve)
}
```
* import()(建议使用此方法)
```javascript
const layout = () => import(/* webpackChunkName: 'g-main' */ '@/views/layout/layout.vue')
const svgIcons = () => import(/* webpackChunkName: 'g-main' */ '@/views/svg-icons/index.vue')
{
  name: 'svg_icons',
  path: 'svgicons',
  component: svgIcons
}
```
* webpack的require.ensure()
```javascript
const login = r => require.ensure([], () => r(require('@/views/login/login.vue')), 'g-login')
{
  path: '/login',
  name: 'login',
  component: login
}
```
[webpack动态导入](https://doc.webpack-china.org/guides/code-splitting/#%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5-dynamic-imports-)

# vue-web

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
