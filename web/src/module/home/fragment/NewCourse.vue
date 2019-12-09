<template>
  <div class="dir:top a-c m-t-10 m-b-20">
    <img src="../../../assets/images/banner.png" alt="course" :style="{ maxWidth: '100%', width: '400px' }">
    <p class="m-t-10 f-18">{{ value.title || '无值' }}</p>
    <p class="m-t-20">{{ value.decoration || '暂无介绍' }}</p>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'

export default @Component
class NewCourse extends Vue {
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
</style>
