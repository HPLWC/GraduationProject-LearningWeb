<template>
  <div class="login" data-flex="main:center cross:center">
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
      </el-form>
      <div data-flex="main:right">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <div class="c-info">测试账号:test   密码:123456</div>
    </el-card>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component class Login extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  user = {
    username: 'admin',
    password: '123456'
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
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars.scss";
  $img: "../../../assets/images";
  .login {
    background-color: $bg0;
    /* background: #ccc url("#{$img}/background.svg") no-repeat; */
  }
</style>
