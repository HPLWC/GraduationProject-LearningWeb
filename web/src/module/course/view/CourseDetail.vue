<!-- 课程详情页面 -->
<template>
  <div>
    <layout-header>详情页</layout-header>

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
      <h1 data-flex="cross:center" class="f-22 p-b-8 b-b">
        <hpc-icon name="view"></hpc-icon>
        <span class="m-l-10">课程目录（3章）</span>
      </h1>
      <div>
        <ul class="p-h-15 p-t-20">
          <li data-flex="cross:center" class="m-t-20 p-b-20 p-h-10 b-b">
            <hpc-icon name="video" class="o-8"></hpc-icon>
            <div class="m-l-18 bx-b">
              <p class="m-b-15 f-18">第一讲 Vue.js基础</p>
              <p class="o-7 p-r-100">本节课我们介绍了系列课程的关系，后端mvc，前端mvvm等概念和Vue.js基础的指令v-for，v-model</p>
            </div>
          </li>
          <li data-flex="cross:center" class="m-t-20 p-b-20 p-h-10 b-b">
            <hpc-icon name="video" class="o-8"></hpc-icon>
            <div class="m-l-18 bx-b">
              <p class="m-b-15 f-18">第二讲 Vue.js另一基础</p>
              <p class="o-7 p-r-100">本节课我们介绍了系列课程的另一关系，除后端mvc，前端mvvm等概念和Vue.js基础的指令v-for，v-model</p>
            </div>
          </li>
        </ul>
      </div>
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

export default @Component({ components: { LayoutHeader, LayoutFooter, CourseDetailCard } })
class CourseDetail extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */

  /* 开始学习 */
  startHandle () {}
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
