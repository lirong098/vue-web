<template>
  <div class="navbar-menu">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#409eff">
      <el-menu-item index="1" disabled>VueWeb</el-menu-item>
      <el-menu-item index="index">首页</el-menu-item>
      <!-- <el-menu-item index="repositories">镜像</el-menu-item> -->
      <el-submenu index="2" style="float:right;" v-if="username">
        <template slot="title">{{username}}</template>
        <el-menu-item index="userSetting">用户设置</el-menu-item>
        <el-menu-item index="loginOut">退出</el-menu-item>
      </el-submenu>
      <el-submenu index="2" style="float:right;" v-if="!username">
        <template slot="title">
          <el-button @click="jumpLogin">登录</el-button>
        </template>
      </el-submenu>
      <el-menu-item index="3" style="float:right;" disabled>
        <el-input
          placeholder="search"
          @keyup.enter.native="searchQ"
          v-model="search">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchQ"></i>
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import VueCookie from 'vue-cookie'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      activeIndex: 'index',
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  created () {},
  mounted () {},
  methods: {
    searchQ () {
      this.$api.project.search({q: this.search}).then(res => {
        console.log(res)
      })
    },
    handleSelect (index, indexPath) {
      console.log(index, indexPath)
      if (index === 'loginOut') this.loginOut()
      if (index === 'repositories') this.$router.push({name: 'repositories'})
      if (index === 'index') this.$router.push({name: 'index'})
      if (index === 'userSetting') this.$router.push({name: 'usersetting'})
    },
    loginOut () {
      this.$api.login.logOut().then(res => {
        // console.log(res)
        if (res.status === 200) {
          VueCookie.delete('profile')
          this.$store.commit('SET_USERNAME', '')
          this.$router.push({path: '/login'})
        }
      })
    },
    jumpLogin () {
      this.$router.push({path: '/login'})
    }
  },
  updated () {},
  watch: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
.navbar-menu {
  .el-menu-item.is-disabled {
    opacity: 1 !important;
  }
}
</style>
