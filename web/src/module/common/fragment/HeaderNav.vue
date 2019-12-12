<template>
  <nav :class="['f-16', 'p-h-20', 'o-8', { 'mint-bgc': bgc }]" data-flex="main:justify">
    <ul class="cp c-white" data-flex="main:left">
      <!--<li class="t-hover">首页</li>
      <li class="t-hover">课程</li>
      <li class="t-hover">关于</li>
      <li class="t-hover">优惠</li>-->
      <li v-for="(record, key) in $c.NavTitle" @click="toNavView(record)" class="t-hover" :key="key">{{ record.title }}</li>
    </ul>
    <!--  登录状态  -->
    <header-login></header-login>
  </nav>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'
import HeaderLogin from './HeaderLogin'

export default @Component({ components: { HeaderLogin } })
class HeaderNav extends Vue {
  /* vue-props */
  @Prop({ type: Boolean, default: false }) bgc
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  toNavView (record) {
    this.$router.push(record.hash)
  }
}
</script>

<style lang="scss" scoped>
  li {
    padding: 1.6rem 2.2rem;
  }
  .mint-bgc {
    background-color: rgba(0, 0, 0, 1);
    /*background: url("../../../assets/images/banner.png") rgba(0, 0, 0, .8);*/
  }
</style>
