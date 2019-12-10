<!-- 我的课程卡片 -->
<template>
  <el-card shadow="hover" class="a-c" data-flex="cross:center main:center">
    <img v-if="value.img" src="../../../assets/images/banner.png" alt="photo" style="width: 300px;">
    <hpc-icon name="default" size="120" v-else></hpc-icon>
    <p class="m-t-10 f-18">{{ value.title || '无值' }}</p>
    <p class="m-t-20">{{ value.decoration || '暂无介绍' }}</p>
  </el-card>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'

export default @Component
class IconCard extends Vue {
  /* vue-props */
  @Prop({ type: Object, default: () => ({}) }) value
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
// webpack多入口打包，webpack加快速度打包
</style>
