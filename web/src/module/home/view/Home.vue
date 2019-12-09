<template>
  <div class="home-page">
    <layout-header :height="700"></layout-header>

    <!--  第二层：介绍功能  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">选择科可课</div>
      <div class="w-100 m-h-100 p-h-100 bx-b" data-flex="main:justify box:mean">
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">覆盖面积广</div>
          <div>fdfdsf范德萨发的说法是范德萨发大水发发发发付付付付付付付付付付付付付付付付付付付付付付付付付付付发大水发范发范德萨发大水</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">面积广</div>
          <div>fdfdsf范德萨发的说法是范德萨发大水发大水发范德萨发师弟发范德萨发大水</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">面积广</div>
          <div>fdfdsf范德萨发的说法是范德萨发大水发大水发范德萨发师弟发范德萨发大水</div>
        </div>
      </div>
    </div>

    <!--  第三层：吹吹水  -->
    <div class="m-t-50 bg_lg">
      <div class="f-24 f-b p-v-50 a-c c-white o-9">
        <p>一切不以为了解决学生工作为目标的视频都是耍流氓！</p>
        <p>一站学习，一套课程，一份工作</p>
      </div>
    </div>

    <!--  第四层：内容介绍  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">我能学到什么？</div>
      <!--<div class="w-100 m-h-100 p-h-100 bx-b m-t-20" data-flex="main:justify box:mean">
        <icon-card></icon-card>
        <icon-card></icon-card>
        <icon-card></icon-card>
      </div>-->
      <el-row :gutter="80" class="w-100 p-h-100">
        <el-col :md="8" :sm="12" class="m-t-20">
          <icon-card></icon-card>
        </el-col>
        <el-col :md="8" :sm="12" class="m-t-20">
          <icon-card></icon-card>
        </el-col>
        <el-col :md="8" :sm="12" class="m-t-20">
          <icon-card></icon-card>
        </el-col>
        <el-col :md="8" :sm="12" class="m-t-20">
          <icon-card></icon-card>
        </el-col>
        <el-col :md="8" :sm="12" class="m-t-20">
          <icon-card></icon-card>
        </el-col>
        <el-col :md="8" :sm="12" class="m-t-20">
          <icon-card></icon-card>
        </el-col>
      </el-row>
    </div>

    <!--  第五层：最新课程  -->
    <div class="m-t-50 p-b-40 bg_deep" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20 m-t-20">最新课程</div>
      <!--<div class="w-100 m-h-100 p-h-100 bx-b m-t-20" data-flex="main:justify box:mean">
        <new-course></new-course>
        <new-course></new-course>
        <new-course></new-course>
      </div>-->
      <el-row :gutter="80" class="w-100 p-h-100">
        <el-col :md="8" :sm="12">
          <new-course></new-course>
        </el-col>
        <el-col :md="8" :sm="12">
          <new-course></new-course>
        </el-col>
        <el-col :md="8" :sm="12">
          <new-course></new-course>
        </el-col>
      </el-row>
      <div class="f-16 cp m-t-30 t-hover">
        <a @click="allCourse">全部课程 ></a>
      </div>
    </div>

    <!--  第六层：用户评价  -->
    <div class="m-t-10 p-b-40" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20 m-t-20 m-b-10">用户评价</div>
      <div class="m-h-80 w-100 p-h-100 bx-b">
        <el-carousel indicator-position="outside">
          <el-carousel-item>
            <div data-flex="dir:top cross:center">
              <img src="../../../assets/images/banner.png" alt="" :style="{ width: '120px', height: '120px', borderRadius: '50%' }">
              <p class="f-b f-18 m-v-10">下雨收衫</p>
              <p class="m-t-10 f-16 a-c" :style="{ maxWidth: '600px' }">下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫下雨收衫</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!--  第七层：页面底部  -->
    <layout-footer ref="LayoutFooter"></layout-footer>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import IconCard from '../fragment/IconCard'
import NewCourse from '../fragment/NewCourse'

export default @Component({ components: { LayoutHeader, LayoutFooter, IconCard, NewCourse } })
class Home extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  // 跳转到全部课程
  allCourse () {}
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars.scss";
  .home-page {

    .bg_lg {
      background: linear-gradient(135deg, #51cadd, $color-primary);
    }

    .bg_deep {
      background: #efeff4;
    }
  }
</style>
