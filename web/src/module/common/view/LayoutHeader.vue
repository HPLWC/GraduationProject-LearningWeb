<!-- 顶部头部分 -->
<template>
  <div class="header" :style="{ height: screen ? '100%' : getHeight(height) }">
    <div class="header_bg" :style="{ height: screen ? '100%' : getHeight(height) }">
      <header-nav ref="HeaderNav" />
      <div class="c-white f-34 o-9 h-100" data-flex="main:center cross:center" :style="{ height: getHeight(titleHeight) }">
        <slot>易上课在线学习平台</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import HeaderNav from '../fragment/HeaderNav.vue'

@Component({ components: { HeaderNav } })
export default class LayoutHeader extends Vue {
  /* vue-props */
  @Prop({ type: Number, default: 400 }) height!: number
  @Prop({ type: Boolean, default: false }) screen!: boolean
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
  init (): void {
    let el: any = (this.$refs.HeaderNav as Vue).$el
    this.titleHeight = this.height - el.offsetHeight
  }

  getHeight (val: number): string {
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
