<template>
  <div class="home-page">
    <layout-header :height="700"></layout-header>

    <!--  第二层：介绍功能  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">选择易上课</div>
      <div class="w-100 m-h-100 p-h-100 bx-b" data-flex="main:justify box:mean">
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-s-platform f-50"></i></div>
          <div class="f-18 m-b-10">覆盖面积广</div>
          <div>易上课作为线上课程，各个地区只要有网络，即可使用，覆盖面积广</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-s-promotion f-50"></i></div>
          <div class="f-18 m-b-10">涵盖范围大</div>
          <div>易上课主要服务于教育群体，但并不局限于此，各行各业都可以上传自己想上传的视频供大家讨论学习。</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">时间局限性小</div>
          <div>易上课是作为全天候上线的网站，任何时间任何地点，只要有网络就可以学习，只要有问题就可以评论。</div>
        </div>
      </div>
    </div>

    <!--  第三层：吹吹水  -->
    <div class="m-t-50 bg_lg">
      <div class="f-24 f-b p-v-50 a-c c-white o-9">
        <p>一切不以为了解决学生问题为目标的视频都是耍流氓！</p>
        <p>一站学习，一套课程，一份收获</p>
      </div>
    </div>

    <!--  第四层：内容介绍  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">我能学到什么？</div>
      <template >
        <el-row v-for="(typeArr, key) in courseType" :gutter="80" class="w-100 p-h-100" :key="key">
          <el-col v-for="type in typeArr" :md="8" :sm="12" class="m-t-20" :key="type.id">
            <icon-card :value="type"></icon-card>
          </el-col>
          <!--<el-col :md="8" :sm="12" class="m-t-20">
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
          </el-col>-->
        </el-row>
      </template>
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
          <new-course @click="toCourseDetail"></new-course>
        </el-col>
        <el-col :md="8" :sm="12">
          <new-course @click="toCourseDetail"></new-course>
        </el-col>
        <el-col :md="8" :sm="12">
          <new-course @click="toCourseDetail"></new-course>
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
              <p class="m-t-10 f-16 a-c" :style="{ maxWidth: '600px' }">既然你诚心诚意地问了，我就大发慈悲地告诉你，为了防止世界被破坏，为了维护世界的和平，贯彻爱与真实的邪恶，我是来学习的。</p>
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
  courseType = []
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  async created () {
    const allType = await this.getAllType()
    this.courseType = this.$utils.toTwoArray(allType, 3)
  }
  /* vue-method */
  async getAllType () {
    const { data } = await this.$store.dispatch('getCourseAllType', { pageSize: 6 })
    return data && data.data || []
  }
  // 跳转到全部课程
  allCourse () {
    this.$router.push('/course/list')
  }
  toCourseDetail () {
    this.$router.push('/course/detail')
  }
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
