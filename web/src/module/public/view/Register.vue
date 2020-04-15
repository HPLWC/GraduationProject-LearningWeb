<template>
  <div class="login" data-flex="main:center cross:center">
    <el-card v-if="isRegister">
      <div slot="header" data-flex="cross:center box:last">
        <span class="f-16">用户注册</span>
      </div>
      <el-form ref="user" :model="user" label-width="80px" :rules="rules" class="m-h-20 full-width">
<!--        <el-form-item label="账号" prop="username">-->
<!--          <el-input type="text" v-model="user.username" placeholder="这将会成为你的登录账号"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="user.password2" placeholder="请再次输入密码"></el-input>
        </el-form-item>
<!--        <el-form-item label="邮箱" prop="email">-->
<!--          <el-input type="text" v-model="user.email"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="验证码" prop="verifyCode">
          <el-input type="text" v-model="user.verifyCode">
            <el-button @click="emailVerifyEvent" slot="append" type="primary" :disabled="isInVerify">{{ isInVerify ? `${time}秒` : "发送验证码" }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div data-flex="main:justify">
            <el-button type="primary" @click="register('user')">注册</el-button>
            <p @click="login" class="t-hover cp">登录</p>
          </div>
        </el-form-item>
      </el-form>
      <!--      <div data-flex="main:right">-->
      <!--        <el-button type="primary" @click="login">登录</el-button>-->
      <!--      </div>-->
      <!--      <div class="c-info">测试账号:test   密码:123456</div>-->
    </el-card>
    <el-card :style="{ width: '420px' }" v-else>
      <div slot="header" data-flex="cross:center box:last">
        <span class="f-16">用户信息</span>
      </div>
      <el-form ref="form" :rules="userRules" :model="form" label-width="80px" class="m-h-20 full-width">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" class="m-t-25" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="未知"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" class="m-t-25" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" class="m-t-25" prop="decoration">
          <el-input type="textarea" v-model="form.decoration"></el-input>
        </el-form-item>
        <el-form-item label="评价" class="m-t-25" prop="common">
          <el-input type="textarea" v-model="form.common"></el-input>
        </el-form-item>
        <el-form-item class="m-t-25">
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Component, Watch, Vue} from 'vue-property-decorator'

export default @Component class Register extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  isRegister = true
  isInVerify = false
  timeEvent = null
  time = 60
  user = {
    username: '',
    password: '',
    email: ''
  }
  rules = {
    username: [
      { required: true, message: '请输入账号', trigger: 'change' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'change' },
    ],
    password2: [
      { required: true, message: '请输入密码', trigger: 'change' },
    ],
    email: [
      { type: 'email', required: true, message: '请填写正确格式', trigger: 'change' },
    ],
  }

  form = {
    sex: '未知'
  }
  // 后期改正
  data () {
    let isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入电话号码')
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        const isPhone = reg.test(value)
        value = Number(value) // 转换为数字
        if (typeof value === 'number' && !isNaN(value)) { // 判断是否为数字
          value = value.toString() // 转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) { // 判断是否为11位手机号
            callback(new Error('手机号码格式如:138xxxx8754'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入电话号码'))
        }
      }
    }
    return {
      userRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'change' },
          { validator: isMobileNumber, trigger: 'change' }
        ],
        email: [
          { type: 'email', required: true, message: '请填写正确格式', trigger: 'change' }
        ],
      }
    }
  }
  /* vue-compute */
  /* vue-watch */
  @Watch('time')
  change (newV) {
    if (newV < 0) {
      this.isInVerify = false
      clearInterval(this.timeEvent)
      this.time = 60
    }
  }
  /* vue-lifecycle */
  /* vue-method */
  async register (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        if (this.user.password !== this.user.password2) {
          this.$notify({
            type: 'error',
            title: '提示',
            message: '两次输入密码不一致'
          })
          return false
        }

        const { data } = await this.$store.dispatch('register', {
          email: this.user.email,
          password: this.user.password,
          code: this.user.verifyCode,
        })
        if (data) {
          console.log(data)
          this.$ls.set('ACCESS_TOKEN', data.token)
          this.form.id = data.userId

          this.isRegister = false
        }
      } else {
        this.$notify({
          type: 'error',
          title: '提示',
          message: '请按要求输入正确项'
        })
        return false
      }
    })
  }
  async emailVerifyEvent () {
    if (!this.user.email) return
    const { data } = await this.$store.dispatch('emailVerity', {
      email: this.user.email
    })
    if (data) {
      this.isInVerify = true
      this.timeEvent = setInterval(() => { this.time-- }, 1000)
    }
  }

  submitForm (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        const { data } = await this.$store.dispatch('updateUserInfo', {
          ...this.form
        })
        if (data) {
          this.$store.commit('SET_USER_INFO', data)
          this.form = this.$ls.getObj('USER_INFO')
          this.$notify({
            type: 'success',
            title: '提示',
            message: '保存成功'
          })
          this.$router.push('/home')
        }
      } else {
        this.$notify({
          type: 'error',
          title: '提示',
          message: '请按要求输入正确项'
        })
        return false
      }
    })
  }

  login () {
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars.scss";
  $img: "../../../assets/images";
  .login {
    /* background-color: $bg0;*/
    background: url('../images/loginBg.png') 0% 0% / cover no-repeat $bg0;
  }
</style>
