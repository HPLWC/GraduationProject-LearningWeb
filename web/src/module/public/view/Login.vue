<template>
  <div class="login">
    <div class="c-white f-50 p-t-50 p-b-100 a-c" style="font-family: '楷体';">易上课</div>

    <div data-flex="main:center cross:center dir:top">
    <el-card>
      <div slot="header" data-flex="cross:center box:last">
        <span class="f-16">用户登录</span>
      </div>
      <el-form label-width="60px" class="m-h-20 full-width">
        <el-form-item label="用户名">
          <el-input type="text" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div data-flex="main:justify">
            <el-button type="primary" @click="login">登录</el-button>
            <p @click="register" class="t-hover cp">注册</p>
          </div>
        </el-form-item>
      </el-form>
<!--      <div data-flex="main:right">-->
<!--        <el-button type="primary" @click="login">登录</el-button>-->
<!--      </div>-->
<!--      <div class="c-info">测试账号:test   密码:123456</div>-->
    </el-card>
  </div>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component class Login extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  user = {
    username: '',
    password: ''
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  /** ******************************************  action  ************************************************************/

  /** * 登录 * */
  async login () {
    const { data } = await this.$store.dispatch('login', this.user)
    if (data) {
      this.$ls.set('ACCESS_TOKEN', data.token)
      const res = await this.$store.dispatch('userInfo')
      if (res.data) {
        this.$store.commit('SET_USER_INFO', res.data)
        this.$router.push('/home')
      } else {
        console.log('弹出添加信息页面')
      }
    }
  }

  register () {
    this.$router.push('/register')
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
