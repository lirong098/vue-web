<template>
  <div class="login-container">
    <register-form type="updateuser"></register-form>
  </div>
</template>

<script>
import registerForm from './register_form.vue'
export default {
  name: 'resetPassword',
  components: {
    registerForm
  },
  props: {},
  data () {
    return {}
  },
  created () {
    console.log(this.$route.query)
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$light_gray:#eee;
.login-container {
  background-color: $bg;
  width: 100%;
  height: 100%;
  background-color: $bg;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
