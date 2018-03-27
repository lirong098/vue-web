<template>
  <div class="login-container">
    <div class="reset-password">
      <div class="title-container">
          <h3 class="title">重置密码</h3>
        </div>
      <el-card style="width: 40%;">
        <el-form :model="passwordData" :rules="rules" ref="passwordData" label-width="80px">
          <el-form-item label="新密码" prop="password">
            <el-input v-model="passwordData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="passwordData.confirmPassword" type="password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('passwordData')">提交</el-button>
          <el-button @click="resetForm('passwordData')">取消</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { validatePassword, validateConfirmPassword } from './public.js'
export default {
  name: 'resetPassword',
  components: {},
  props: {},
  data () {
    return {
      passwordData: {},
      rules: {
        password: [{required: true, trigger: 'blur', validator: validatePassword}],
        confirmPassword: [{required: true, trigger: 'blur', validator: (rule, value, callback) => { validateConfirmPassword(this.passwordData.password, rule, value, callback) }}]
      },
      reset_uuid: this.$route.query.reset_uuid
    }
  },
  created () {
    console.log(this.reset_uuid, this.$route.query.reset_uuid)
  },
  computed: {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.reset_uuid || this.reset_uuid === '') {
            this.$alert('连接不合法！', '注意')
            return false
          }
          this.$api.login.reset({reset_uuid: this.reset_uuid, password: this.passwordData.password}).then((res) => {
            if (res.status === 200) {
              this.$message({
                message: '密码重置成功',
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    if (!this.reset_uuid || this.reset_uuid === '') {
      this.$alert('连接不合法！', '注意')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$light_gray:#eee;
.login-container {
  overflow: hidden;
  // border:1px solid red;
  // position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  margin: auto 0;
  .reset-password {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .title-container {
      .title {
        font-size: 26px;
        font-weight: 400;
        color: $light_gray;
        text-align: center;
        font-weight: bold;
        margin: 20px auto 20px auto;
      }
    }
  }
}
</style>
