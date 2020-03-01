<!-- 课程详情页面 -->
<template>
  <div>
    <layout-header>[前端]Webpack介绍</layout-header>

    <!-- 课程介绍 -->
    <!--<div data-flex="" class="course-detail-card div p-20">
      <el-row :gutter="60">
        <el-col :md="14" :sm="14">
          <img src="../../../assets/images/banner.png" alt="" class="w-100" :style="{ objectFit: 'cover' }">
        </el-col>
        <el-col :md="10" :sm="10" class="p-5">
          <h1 class="f-22 p-b-10 b-b">[前端]Webpack介绍</h1>
          <div>
            <p class="m-t-18 m-b-5 f-18">课程介绍</p>
            <div class="o-8" :style="{ lineHeight: '1.7' }">Vue.js多火热不用再说，本套课程针对有前端HTML CSS基础的童鞋，快速的学习并掌握在实战中Vue的开发套路。后面的 (实战篇) 我们来模拟真实企业实战开发大型的Vue项目，争取做完一个项目让你能直接到企业找到对应工作。</div>
          </div>
          <div class="a-c m-t-20">
            <el-button type="primary" size="medium" @click="startHandle">开始学习</el-button>
          </div>
        </el-col>
      </el-row>
    </div>-->
    <course-detail-card @click="startHandle"></course-detail-card>

    <!-- 课程目录 -->
    <div class="course-detail-catalog m-t-20">
      <course-detail-catalog></course-detail-catalog>
    </div>

    <!-- 底部 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import CourseDetailCard from '../fragment/CourseDetailCard'
import CourseDetailCatalog from '../fragment/CourseDetailCatalog'

export default @Component({ components: { LayoutHeader, LayoutFooter, CourseDetailCard, CourseDetailCatalog } })
class CourseDetail extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */

  /* 开始学习 */
  startHandle () {
    this.$router.push('/course/video')
  }
}
</script>

<style lang="scss" scoped>
  @media only screen {
    .course-detail-card {
      /*@media (min-width: 1400px) and (max-width: 1921px) {*/
        margin: 2% 15%;
      /*}*/
    }
    .course-detail-catalog {
      margin: 3% 15%;
    }
  }
</style>
