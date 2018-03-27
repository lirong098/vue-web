<template>
  <div class="register_form">
    <el-row class="info_title">
      <div class="info_title_back">
        <el-col :span="1" v-if="show">
          <el-button type="text" icon="el-icon-back" class="info_title_back_button" @click="back"></el-button>
        </el-col>
      </div>
      <el-col class="info_title_text" :span="24">
        <div class="title-container">
          <h3 class="title">{{ show ? '系统注册' : '完善信息' }}</h3>
        </div>
      </el-col>
    </el-row>
    <el-card class="register_form_card">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px">
          <el-form-item label="用户名" prop="username" v-if="!$route.query.username">
            <el-input v-model="registerForm.username" :disabled="isUpUserName"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" v-if="!$route.query.phone">
            <el-input v-model="registerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" v-if="!$route.query.email">
            <el-input v-model="registerForm.email">
              <el-button slot="append" :disabled="isGetCode" @click="getCode">{{isGetCodeText}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" v-if="!$route.query.email">
            <el-input v-model="registerForm.code"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" type="password" autoComplete="on" placeholder="8到20个字符且需包含至少一个大写字符、小写字符或者数字"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="registerForm.confirmPassword" type="password" autoComplete="on" placeholder="再次填写密码"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="company" v-if="!$route.query.company">
            <el-input v-model="registerForm.company"></el-input>
          </el-form-item>
          <el-form-item label="公司规模" prop="company_scale">
            <!-- <el-input v-model.number="registerForm.company_scale"></el-input> -->
            <el-select v-model.number="registerForm.company_scale" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="(item, key) in companyScales"
                :key="key"
                :label="item"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form>
    </el-card>
  </div>
</template>
<script>
// import VueCookie from 'vue-cookie'
import { validateFormEmail, validateValue, validatePassword, validateConfirmPassword, validatePhone1 } from './public.js'
export default {
  name: '',
  components: {},
  props: {
    type: {
      type: String,
      default: 'register'
    }
  },
  data () {
    return {
      registerForm: {},
      registerRules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入用户名'},
          {validator: validateValue, trigger: 'blur'}
        ],
        phone: [
          {required: true, trigger: 'blur', message: '请输入手机号码'},
          {validator: validatePhone1, trigger: 'blur'}
        ],
        email: [
          {type: 'email', trigger: 'blur', message: '邮箱地址格式不正确'},
          {required: true, trigger: 'blur', message: '请输入邮箱'},
          {validator: validateFormEmail, trigger: 'blur'}
        ],
        code: [{required: true, trigger: 'blur', message: '请输入验证码'}],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'},
          {validator: validatePassword, trigger: 'blur'}
        ],
        confirmPassword: [
          {required: true, trigger: 'blur', message: '请输入确认密码'},
          {validator: (rule, value, callback) => { validateConfirmPassword(this.registerForm.password, rule, value, callback) }, trigger: 'blur'}
        ],
        company: [{required: true, trigger: 'blur', message: '请输入公司名称'}],
        company_scale: [{required: true, trigger: 'blur', message: '请选择公司规模'}]
      },
      isGetCode: false,
      isGetCodeText: '获取验证码',
      isUpUserName: false,
      companyScales: {}
    }
  },
  computed: {
    show () {
      return this.type === 'register'
    }
  },
  created () {
    if (!this.show) {
      this.updateData()
    }
    this.$api.login.companyScales().then(res => {
      console.log('com', res)
      this.companyScales = res.data
    })
  },
  mounted () {},
  methods: {
    updateData () {
      this.registerForm = Object.assign(this.registerForm, this.$route.query)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.user.users(this.registerForm).then((res) => {
            console.log('注册', res)
            if (res.status === 201) {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              if (!this.show) {
                // VueCookie.set('profile', this.registerForm.username)
                // this.$store.commit('SET_USERNAME', this.registerForm.username)
                this.$router.push({ name: 'login', params: { username: this.registerForm.username } })
              } else {
                this.back()
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getCode () {
      this.$api.login.userExists({target: 'email', value: this.registerForm.email}).then(res => {
        if (!res.data) {
          this.$api.login.send({email: this.registerForm.email, username: this.registerForm.username}).then((res) => {
            if (res.status === 200) {
              this.isGetCode = true
              this.isGetCodeText = '已发送'
              this.isUpUserName = true
            }
          })
        }
      })
    },
    back () {
      this.$emit('setViews', 'login_form', this.registerForm.username)
    }
  },
  updated () {},
  watch: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
  $light_gray:#eee;
.register_form {
  background: #50a3a2;
  background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  opacity: 0.8;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  .register_form_card {
    width: 600px;
    margin-bottom: 5px;
  }
  .info_title {
    height:46px;
    line-height:46px;
    width: 600px;
    position:relative;
    margin: 20px auto 20px auto;
    .info_title_back {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      .info_title_back_button {
        width:100%;
        color:white;
        font-size:24px;
      }
    }
    .info_title_text {
      .title-container {
        .title {
          font-size: 26px;
          font-weight: 400;
          color: $light_gray;
          text-align: center;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
