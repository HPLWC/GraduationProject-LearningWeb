<!-- 课程介绍卡片 -->
<template>
  <div data-flex="" class="course-detail-card div p-20">
    <el-row :gutter="60">
      <el-col :md="14" :sm="14">
        <img v-if="data.photo" :src="data.photo" alt="" class="w-100" :style="{ objectFit: 'cover' }">
        <img v-else src="../../../assets/images/banner.png" alt="默认图片" class="w-100" :style="{ objectFit: 'cover' }">
      </el-col>
      <el-col :md="10" :sm="10" class="p-5">
        <h1 class="f-22 p-b-10 b-b">[{{ data.courseType && data.courseType.title }}]{{ data.title }}</h1>
        <div>
          <p class="m-t-18 m-b-5 f-18">课程介绍</p>
          <div class="o-8" :style="{ lineHeight: '1.7' }">{{ data.decoration || '暂无简介' }}</div>
        </div>
        <div class="a-c m-t-20">
          <el-button type="primary" size="medium" @click="$emit('click')">开始学习</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'

export default @Component
class CourseDetailCard extends Vue {
  /* vue-props */
  @Prop({ type: Object, default: {} }) data
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
</style>
