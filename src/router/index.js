import Vue from 'vue'
import Router from 'vue-router'
import routerBeforeEach from './before_each.js'
// 按需引入 （g-layout为打包后生成的文件夹）
const login = r => require.ensure([], () => r(require('@/views/login/login.vue')), 'g-login')
const layout = r => require.ensure([], () => r(require('@/views/layout/layout.vue')), 'g-main')
const svgIcons = r => require.ensure([], () => r(require('@/views/svg-icons/index.vue')), 'g-main')

Vue.use(Router)
const routers = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: layout,
      redirect: 'repositories',
      children: [
      // 路由嵌套的例子
        // {
        //   name: 'repository',
        //   path: 'repository/:namespace/:name',
        //   component: repository,
        //   children: [
        //     {
        //       name: 'repository_info',
        //       path: 'info',
        //       component: repositoryInfo
        //     }
        //   ]
        // },
        {
          name: 'svg_icons',
          path: 'svgicons',
          component: svgIcons
        }
      ]
    }
  ]
})
// 全局前置守卫
routerBeforeEach(routers)
export default routers
