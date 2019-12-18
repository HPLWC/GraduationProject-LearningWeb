<!-- 视频播放页 -->
<template>
  <div>
    <header-nav :bgc="true"></header-nav>
    <el-row type="flex" :gutter="20" class="p-h-100 m-t-20">
      <el-col :md="18" :sm="24">
        <!-- 标题部分 -->
        <div class="p-t-20 f-18">
          <p class="m-b-15 f-24">第一讲1 Vue的基础</p>
          <div data-flex="">
            <p data-flex="cross:center" class="m-b-0 f-14">
              <hpc-icon name="timeselect" size="20"></hpc-icon>
              <span class="m-l-5">发布时间：2019-02-02</span>
            </p>
            <p class="m-l-40 m-b-0 f-14">播放量：102</p>
          </div>
        </div>
      </el-col>

      <el-col :md="6" :sm="1" class="hidden-xs-only hidden-sm-only">
        <div data-flex="cross:bottom" class="p-t-20 f-18">
          <div class="m-h-10">
            <hpc-icon name="defaultuser" :size="60" class="m-t-2 o-8"></hpc-icon>
          </div>
          <p class="m-b-15 p-r-30">主讲人：张弟老师</p>
          <el-button type="primary" class="m-b-10">关注</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="20" class="p-h-100 m-t-20">
      <el-col :md="18" :sm="24">
        <!-- 视频播放器 -->
        <hpc-video :options="{ height: videoHeight }"></hpc-video>
      </el-col>

      <el-col :md="6" :sm="1" class="hidden-xs-only hidden-sm-only" :style="{ height: `calc(${videoHeight} - 70px)` }">
        <course-video-list :selectedKey="selectedKey" @checkList="checkList"></course-video-list>
      </el-col>
    </el-row>

    <!-- 评论 -->
    <div class="m-h-100 m-t-80 p-r-100">
      <list-view type="comment"></list-view>
    </div>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import 'element-ui/lib/theme-chalk/display.css'
import HeaderNav from '../../common/fragment/HeaderNav'
import CourseVideoList from '../fragment/CourseVideoList'
import ListView from '../fragment/ListView'

export default @Component({ components: { HeaderNav, CourseVideoList, ListView } })
class CourseVideo extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  videoHeight = '600px'
  selectedKey = 'data-video-key'
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */

  /* 选中视频列表 */
  checkList (key) {}
}
</script>

<style lang="scss" scoped>
  $height: 110px;

  .list-height {
    height: $height;
  }
</style>
