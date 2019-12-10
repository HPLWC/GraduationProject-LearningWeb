<template>
  <div @click="$emit('click')" class="dir:top a-c m-t-10 m-b-20 cp">
    <div class="course-img w-100">
      <img src="../../../assets/images/banner.png" alt="course">
      <div data-flex="cross:center main:center" class="hover-icon h-100 w-100 c-white o-7">
        <hpc-icon name="video" :size="45"></hpc-icon>
      </div>
    </div>
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
  .course-img {
    min-height: 200px;
    position: relative;

    .hover-icon {
      top: 50%;
      width: 0;
      left: 50%;
      height: 0;
      opacity: 0;
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 0, 0, .7);
    }

    img {
      left: 0;
      width: 100%;
      height: 100%;
      /*max-width: 100%;*/
      object-fit: cover;
      position: absolute;
    }

    &:hover {
      .hover-icon {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
        border-radius: 0;
        transition: top .2s,
                    left .2s,
                    width .2s,
                    height .2s,
                    opacity .2s,
                    border-radius .2s .1s;
      }
    }
  }
</style>
