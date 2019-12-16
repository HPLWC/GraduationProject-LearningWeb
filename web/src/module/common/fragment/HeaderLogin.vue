<template>
  <ul class="cp c-white" data-flex="main:left">
    <template v-if="!isLogin">
      <li>登录</li>
    </template>
    <template v-else>
      <li>
        <el-dropdown>
          <span class="f-16 t-hover">HPLWC</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span data-link="/user/collection" @click="toUserInfo">我的收藏</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span data-link="/user/history" @click="toUserInfo">播放历史</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span data-link="/user/center" @click="toUserInfo">个人中心</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </template>
  </ul>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component class HeaderLogin extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  isLogin = true
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */

  /* 用户管理页面跳转 */
  toUserInfo (e) {
    let dataset = e.target.dataset
    this.$router.push(dataset.link)
  }
}
</script>

<style lang="scss" scoped>
  li {
    padding: 1.6rem 2.2rem;

    .el-dropdown {
      color: #ffffff;
    }
  }
</style>
