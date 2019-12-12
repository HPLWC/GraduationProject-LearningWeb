<template>
  <video-player
    class="vjs-custom-skin"
    ref="videoPlayer"
    :playsinline="true"
    :options="playerOptions"

    v-on="$listeners"
    v-bind="$attrs"
  ></video-player>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default @Component({ components: { videoPlayer } })
class HpcVideo extends Vue {
  /* vue-props */
  @Prop({ type: String, default: '300px' }) height
  @Prop({ type: Object, default: () => ({}) }) options
  @Prop({ type: Object, default: () => ({}) }) videoUrl

  /* vue-vuex */
  /* vue-data */
  playerOptions = {} // 初始化参数

  /* vue-compute */
  get player () {
    return this.$refs.videoPlayer.player
  }

  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.assignOption()
  }
  mounted () {
    this.setVideo()
  }

  /* vue-method */

  /* 合并初始化参数 */
  assignOption () {
    // 默认参数
    let options = {
      autoplay: false, // 自动播放
      // width: '1000px', // 宽度
      height: this.height, // 高度
      loop: false, // 结束重新开始
      muted: false, // 默认情况下将会消除任何音频。
      preload: 'auto', // 浏览器在<video>加载元素立刻开始下载视频数据
      playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
      language: 'zh-CN',
      // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      // fluid: true, // 按比例缩放以适应其容器
      sources: [
        {
          type: 'video/mp4', // 类型
          src: 'http://vjs.zencdn.net/v/oceans.mp4' // url地址
        },
        {
          type: 'video/mp4', // 类型
          src: 'http://vjs.zencdn.net/v/oceans.mp4' // url地址
        }
      ],
      poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg', // 封面地址
      notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controlBar: {
        timeDivider: true, // 当前时间和持续时间的分隔符
        durationDisplay: true, // 显示持续时间
        remainingTimeDisplay: false, // 是否显示剩余时间功能
        fullscreenToggle: true // 是否显示全屏按钮
      }
    }

    Object.assign(this.playerOptions, options, this.options)
  }

  /* 设置视频数据源 */
  setVideo () {
    this.playerOptions.sources[0].src = this.videoUrl && this.videoUrl.url
    if (this.videoUrl.poster) this.playerOptions.poster = this.videoUrl.poster
  }

  /* 重置几个方法：播放、停止、重置进度条 */
  _play () {
    this.player.play()
  }
  _stop () {
    this.player.stop()
  }
  _src (src) {
    this.player.src(src)
  }
}
</script>

<style lang="scss" scoped>
</style>
