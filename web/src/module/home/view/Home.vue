<template>
  <div class="home-page">
    <layout-header :height="700"></layout-header>

    <!--  第二层  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">选择科客课</div>
      <div class="m-h-100 p-h-100" data-flex="main:justify">
        <div v-hover data-observer="hover-animate" class="m-h-100 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">覆盖面积广</div>
          <div>fdfdsf范德萨发的说法是范德萨发大水发大水发范发范德萨发大水</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-100 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">面积广</div>
          <div>fdfdsf范德萨发的说法是范德萨发大水发大水发范德萨发师弟发范德萨发大水</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-100 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">面积广</div>
          <div>fdfdsf范德萨发的说法是范德萨发大水发大水发范德萨发师弟发范德萨发大水</div>
        </div>
      </div>
    </div>

    <!--  第三层  -->
    <div class="m-t-50 bg">
      <div class="f-24 f-b p-v-50 a-c c-white o-9">
        <p>一切不以为了解决学生工作为目标的视频都是耍流氓！</p>
        <p>一站学习，一套课程，一份工作</p>
      </div>
    </div>

    <!--  第四层  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">我能学到什么？</div>
      <div class="m-h-100 p-h-100" data-flex="main:justify">

      </div>
    </div>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'

export default @Component({ components: { LayoutHeader } })
class Home extends Vue {
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
  @import "../../../assets/css/vars.scss";
  .home-page .bg{
    background: linear-gradient(135deg, #51cadd, $color-primary);
  }
</style>
