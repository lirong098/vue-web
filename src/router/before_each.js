import store from '@/store'

export default function routerBeforeEach (router) {
  router.beforeEach((to, from, next) => {
    document.title = to.name ? to.name : 'DouWa'
    let profile = store.state.user.username && store.state.user.username !== ''
    if (to.path === '/login') {
      next()
      return
    }
    if (to.path === '/logout') {
      if (profile) {
        store.commit('SET_USERNAME', '')
      }
      next({
        path: '/login'
      })
      return
    }
    if (!profile) {
      next({
        path: '/login'
      })
      return
    }
    next()
  })
  router.afterEach(() => {})
}
