// import { validatAlphabets, validateLowerCase, validateUpperCase, validateEmail } from '@global/means.js'
import {validatAlphabets, validateLowerCase, validateUpperCase, validatPhone} from '@global/means.js'
import login from '@/api/login.js'
// 验证密码
export const validatePassword = (rule, value, callback) => {
  if (!value || value.length < 8 || !validatAlphabets(value) || !validateLowerCase(value) || !validateUpperCase(value) || value.length > 20) {
    callback(new Error('8到20个字符且需包含至少一个大写字符、小写字符或者数字'))
  } else {
    callback()
  }
}
// 验证确认密码
export const validateConfirmPassword = (password, rule, value, callback) => {
  if (value !== password) {
    callback(new Error('密码不一致'))
  } else {
    callback()
  }
}

export const validateValue = (rule, value, callback) => {
  if (value) {
    login.userExists({target: rule.field, value: value}).then(res => {
      console.log('validateValue', res.data)
      if (res.data) {
        callback(new Error('用户名已被注册'))
      } else {
        callback()
      }
    })
  } else {
    callback(new Error('Required'))
  }
}

export const validateFormEmail = (rule, value, callback) => {
  /*
  if (!validateEmail(value)) {
    callback(new Error('请填写正确的邮箱地址'))
  }
  */
  login.userExists({target: rule.field, value: value}).then(res => {
    if (res.data) {
      callback(new Error('邮箱地址已被注册'))
    } else {
      callback()
    }
  })
}

export const validatePhone1 = (rule, value, callback) => {
  if (!validatPhone(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}
