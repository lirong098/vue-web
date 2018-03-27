import VueCookie from 'vue-cookie'
const user = {
  state: {
    username: VueCookie.get('profile')
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    }
  },

  actions: {}
}

export default user
