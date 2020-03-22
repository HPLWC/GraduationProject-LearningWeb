<!-- 视频播放列表 -->
<template>
  <div class="course-video-list f-16 fill-height">
    <div data-flex="cross:center" class="bg-color o-9 f-18 p-l-20 p-v-20">
      <p>视频列表</p>
      <!--<hpc-icon name="view" :size="20" class="m-l-10"></hpc-icon>-->
    </div>
    <ul @click="checkList" class="video-list-box bg-color o-8 f-16 scroll fill-height">
      <li
        v-for="item in data"
        :data-video-key="item.id"
        :data-video-title="item.title"
        data-flex="cross:center"
        :class="['p-l-30', 'm-r-2', 'p-v-10', 'm-b-5', 'cp', 't-hover', { 'checked': selectedRow(item.id) }]"
        :key="item.id"
      >
        <hpc-icon name="video" :size="15"></hpc-icon>
        <p class="m-l-10">{{ item.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'

export default @Component
class CourseVideoList extends Vue {
  /* vue-props */
  @Prop({ type: String, default: 'data-video-key' }) selectedKey
  @Prop({ type: Array, default: [] }) data
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  get selectedRow () {
    return (key) => {
      return this.selectedKey === key
    }
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */

  /* 选中视频播放目录 */
  checkList (e) {
    let dataObj = e.target.dataset
    this.$router.push({
      query: {
        videoKey: dataObj.videoKey,
        id: this.$route.query.id
      }
    })
    this.$emit('checkList', e.target.dataset.videoKey)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/css/vars.scss';
  $bg: #000000;
  $tColor: #ffffff;

  .bg-color {
    color: $tColor;
    background: $bg;
  }
  .fill-height {
    height: -webkit-fill-available;
  }
  // 当前被选中元素
  .checked {
    background: #222222;
    color: $color-primary;
  }

  .scroll {
    &::-webkit-scrollbar {
      width: $scroll-bar-size;
      height: $scroll-bar-size;
      /*background-color: transparent;*/
      /*display: none;*/
    }

    & .-o-scrollbar {
      display: none;
    }

    /* 兼容IE */
    -ms-overflow-style: none;
    -ms-scroll-chaining: chained;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);

    /* 定义滚动条轨道 */
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    /* 定义滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: $scroll-bar-size;
      background-color: #666;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);

      &:hover {
        background-color: #555555;
      }

      &:active {
        background-color: #444444;
      }
    }
  }

  .course-video-list {
    position: relative;

    .video-list-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 64px;
      bottom: 0;
      overflow: hidden scroll;

      li *{
        pointer-events: none;
      }
    }
  }

</style>
