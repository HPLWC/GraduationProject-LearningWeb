<template>
  <nav class="f-16 p-h-20 o-8" data-flex="main:justify">
    <ul class="cp c-white" data-flex="main:left">
      <li>首页</li>
      <li>课程</li>
      <li>关于</li>
      <li>优惠</li>
    </ul>
    <!--  登录状态  -->
    <header-login></header-login>
  </nav>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import HeaderLogin from './HeaderLogin'

export default @Component({ components: { HeaderLogin } })
class HeaderNav extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  li {
    padding: 1.6rem 2.2rem;
  }
</style>
