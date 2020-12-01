<!-- 登录状态 -->
<template>
  <ul class="cp c-white" data-flex="main:left">
    <template v-if="!isLogin">
      <li data-link="/login" @click="toUserInfo">登录</li>
    </template>
    <template v-else>
      <li>
        <el-dropdown>
          <span class="f-16 t-hover">{{ user.name }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span data-link="/user/collection" @click="toUserInfo">我的收藏</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span data-link="/user/attention" @click="toUserInfo">我的关注</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span data-link="/user/center" @click="toUserInfo">个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="exit">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
      <!--<li data-flex="cross:center" class="t-hover" :style="{ padding: '1.6rem 0.5rem' }">
        <hpc-icon name="delete"></hpc-icon>退出
      </li>-->
    </template>
  </ul>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class HeaderLogin extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  isLogin = false
  user = {}
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.isLogin = !!this.$ls.get('ACCESS_TOKEN')
    if (this.isLogin) this.userInfo()
  }
  /* vue-method */

  /* 判断用户是否登录 */
  async userInfo () {
    const { data } = await this.$store.dispatch('userInfo')
    if (data) {
      this.$store.commit('SET_USER_INFO', data)
      this.isLogin = true
      this.user = data
    } else {
      this.$store.commit('SET_USER_INFO', {})
      this.isLogin = false
    }
  }

  /* 用户管理页面跳转 */
  toUserInfo (e: any) {
    let dataset = e.target.dataset
    this.$router.push(dataset.link)
  }

  /* 退出登录 */
  exit () {
    this.$ls.remove('ACCESS_TOKEN')
    this.$router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
  li {
    padding: 1.6rem 2.2rem;

    .el-dropdown {
      color: #ffffff;

      &::before {
        /*content: '你好，'*/
      }
    }
  }
</style>
