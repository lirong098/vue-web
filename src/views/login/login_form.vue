<template>
  <div class="wrapper">
    <div class="container">
      <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title-container">
          <h3 class="title">Welcome</h3>
        </div>
        <el-form-item prop="principal" class="user_form">
        <!--<span class="svg-container svg-container_login">-->
          <!--<svg-icon icon-class="user" class="user" />-->
        <!--</span>-->
          <el-input name="principal" type="text" v-model="loginForm.principal" autoComplete="on" placeholder="username" class="input"/>
        </el-form-item>

        <el-form-item prop="password" class="pwd_form">
        <!--<span class="svg-container">-->
          <!--<svg-icon icon-class="password" class="password" />-->
        <!--</span>-->
          <el-input name="password" :type="passwordType" class="input" @keyup.enter.native="login" v-model="loginForm.password" autoComplete="on" placeholder="password" />
          <span class="show-pwd" @click="showPwd">
          <!--<svg-icon icon-class="eye" class="eye"/>-->
        </span>
        </el-form-item>

        <el-button  style="width:44%;margin-bottom:10px;" :loading="loading" @click="login" class="button">登录</el-button>
        <div style="width: 100%">
          <label for="user_remember_me">
            <input class="remember-me-checkbox" type="checkbox" value="1"  id="user_remember_me" />
            <span style="font-size: 14px">记住我</span>
          </label>
          <el-button type="text" @click="reset" class="mr forget_pwd ml">忘记密码</el-button>
          <el-button type="text" @click="registerDialog" class="mr register">注册账号</el-button>
        </div>
        <div class="external-logins">
          <a class="external-login-button" href="/auth/githublogin">
            <svg-icon icon-class="github"/>
            <p>github登录</p>
          </a>
          <a class="external-login-button" href="/auth/gitlablogin">
            <svg-icon icon-class="gitlab"/>
            <p>gitlab登录</p>
          </a>
        </div>
      </el-form>
      <el-dialog
        title="重置密码"
        :visible.sync="resetDialog"
        width="40%"
        :before-close="handleClose">
        <el-form :model="resetData" :rules="resetRules" ref="resetData">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="resetData.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
        <el-button @click="resetDialog = false">取 消</el-button>
        <el-button type="primary" @click="sendEmail('resetData')">确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
import VueCookie from 'vue-cookie'
import { validatePassword } from './public.js'
export default {
  name: 'login_form',
  components: {},
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loginForm: {
        principal: this.username,
        password: ''
      },
      loginRules: {
        principal: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      resetDialog: false,
      resetData: {},
      resetRules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]
      }
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    login () {
      this.loading = true
      this.$api.login.login(this.loginForm).then((res) => {
        if (res.status === 200) {
          this.loading = false
          VueCookie.set('profile', this.loginForm.principal)
          this.$store.commit('SET_USERNAME', this.loginForm.principal)
          this.$router.push({ path: '/index' })
        }
      }).catch(err => {
        console.log(err, 'err')
        if (err.status === 401) {
          this.$message.error('账号或密码错误！')
          this.loading = false
        }
      })
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    // 忘记密码
    reset () {
      this.resetDialog = true
    },
    registerDialog () {
      this.$emit('setViews', 'register_form')
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    sendEmail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.login.sendEmail({email: this.resetData.email}).then(res => {
            if (res.status === 200) {
              this.resetDialog = false
              this.$message({
                message: '请查收邮件，重置密码',
                type: 'success'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    clickHref (link) {
      window.open(link)
    }
  },
  updated () {},
  watch: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
  .wrapper {
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    opacity: 0.8;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .external-logins{
      height: 60px;
      margin: 20px 30%;
      .external-login-button {
	color: honeydew;
      }
      .external-login-button:first-child{
        float: left;
      }
      .external-login-button:last-child{
        float: right;
      }
      .svg-icon{
        font-size: 38px;
      }
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 80px 0;
      height: 400px;
      text-align: center;
      .el-form-item__error {
        color: beige;
        font-size: 12px;
        line-height: 1;
        padding-top: 0px;
        position: absolute;
        top: 100%;
        left: 30%;
      }
      .login-form {
        padding: 20px 0;
        position: relative;
        z-index: 2;
        .input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: 0;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background-color: rgba(255, 255, 255, 0.2);
          width: 250px;
          border-radius: 3px;
          padding: 10px 15px;
          margin: 0 auto 10px auto;
          display: block;
          text-align: center;
          font-size: 18px;
          color: white;
          -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
          font-weight: 300;
        }
        .input:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
        .input:focus {
          background-color: white;
          width: 300px;
          color: #53e3a6;
        }
        .button {
          width: 100px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          outline: 0;
          background-color: white;
          border: 0;
          padding: 10px 15px;
          color: #53e3a6;
          border-radius: 3px;
          cursor: pointer;
          font-size: 18px;
          -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
        }
        form button:hover {
          background-color: #f5f7f9;
        }
        .forget_pwd, .register{
          color: honeydew;
        }
      }
      .title-container {
        h3 {
          margin-bottom: 20px;
          color: white;
          font-size: 40px;
          -webkit-transition-duration: 1s;
          transition-duration: 1s;
          -webkit-transition-timing-function: ease-in-put;
          transition-timing-function: ease-in-put;
          font-weight: 200;
        }
      }
    }
    .bg-bubbles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .bg-bubbles li {
      position: absolute;
      list-style: none;
      display: block;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 255, 255, 0.15);
      bottom: -160px;
      -webkit-animation: square 25s infinite;
      animation: square 25s infinite;
      -webkit-transition-timing-function: linear;
      transition-timing-function: linear;
    }
    .bg-bubbles li:nth-child(1) {
      left: 10%;
    }
    .bg-bubbles li:nth-child(2) {
      left: 20%;
      width: 80px;
      height: 80px;
      -webkit-animation-delay: 2s;
      animation-delay: 2s;
      -webkit-animation-duration: 17s;
      animation-duration: 17s;
    }
    .bg-bubbles li:nth-child(3) {
      left: 25%;
      -webkit-animation-delay: 4s;
      animation-delay: 4s;
    }
    .bg-bubbles li:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      -webkit-animation-duration: 22s;
      animation-duration: 22s;
      background-color: rgba(255, 255, 255, 0.25);
    }
    .bg-bubbles li:nth-child(5) {
      left: 70%;
    }
    .bg-bubbles li:nth-child(6) {
      left: 80%;
      width: 120px;
      height: 120px;
      -webkit-animation-delay: 3s;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    .bg-bubbles li:nth-child(7) {
      left: 32%;
      width: 160px;
      height: 160px;
      -webkit-animation-delay: 7s;
      animation-delay: 7s;
    }
    .bg-bubbles li:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      -webkit-animation-delay: 15s;
      animation-delay: 15s;
      -webkit-animation-duration: 40s;
      animation-duration: 40s;
    }
    .bg-bubbles li:nth-child(9) {
      left: 25%;
      width: 10px;
      height: 10px;
      -webkit-animation-delay: 2s;
      animation-delay: 2s;
      -webkit-animation-duration: 40s;
      animation-duration: 40s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    .bg-bubbles li:nth-child(10) {
      left: 90%;
      width: 160px;
      height: 160px;
      -webkit-animation-delay: 11s;
      animation-delay: 11s;
    }
    @-webkit-keyframes square {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      100% {
        -webkit-transform: translateY(-700px) rotate(600deg);
        transform: translateY(-700px) rotate(600deg);
      }
    }
    @keyframes square {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
      100% {
        -webkit-transform: translateY(-700px) rotate(600deg);
        transform: translateY(-700px) rotate(600deg);
      }
    }
  }

</style>
