<template>
  <div class="login-container">
    <component :is="currentView" @setViews="setViews" :username="username"></component>
  </div>
</template>

<script>
import loginForm from './login_form.vue'
import registerForm from './register_form.vue'
export default {
  name: 'login',
  components: {
    'login_form': loginForm,
    'register_form': registerForm
  },
  data () {
    return {
      currentView: 'login_form',
      username: this.$route.params.username ? this.$route.params.username : ''
    }
  },
  methods: {
    setViews (name, userName = '') {
      this.currentView = name
      if (userName && userName !== '') this.username = userName
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;

.login-container {
  color: honeydew;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
