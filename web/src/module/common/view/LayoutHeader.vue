<template>
  <div class="header" :style="{ height: getHeight(height) }">
    <div class="header_bg" :style="{ height: getHeight(height) }">
      <header-nav ref="HeaderNav" />
      <div class="c-white f-34 o-9 h-100" data-flex="main:center cross:center" :style="{ height: getHeight(titleHeight) }">
        <slot>在线学习平台</slot>
      </div>
    </div>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'
import HeaderNav from '../fragment/HeaderNav'

export default @Component({ components: { HeaderNav } })
class LayoutHeader extends Vue {
  /* vue-props */
  @Prop({ type: Number, default: 500 }) height
  /* vue-vuex */
  /* vue-data */
  titleHeight = 400
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  mounted () {
    this.init()
  }
  /* vue-method */
  /** ******************************************  action  ************************************************************/

  /** ******************************************  function  ************************************************************/
  init () {
    this.titleHeight = this.height - this.$refs.HeaderNav.$el.offsetHeight
  }

  getHeight (val) {
    return val + 'px'
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background: url("../../../assets/images/banner.png") 0% 0% / cover no-repeat fixed;
  }
  .header_bg {
    background: rgba(0, 0, 0, 0.7);
  }
</style>
