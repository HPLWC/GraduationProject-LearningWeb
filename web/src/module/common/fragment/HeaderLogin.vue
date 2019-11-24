<template>
  <ul class="cp c-white" data-flex="main:left">
    <template v-if="!isLogin">
      <li>登录</li>
    </template>
    <template v-else>
      <li>HPLWC，欢迎</li>
    </template>
  </ul>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component class HeaderLogin extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  isLogin = false
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
