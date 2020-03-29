<template>
  <svg :class="svgClass" :style="styleObj" aria-hidden="true" @click="$emit('click')" v-if="!name.startsWith('el-icon')">
    <use :xlink:href="iconName"></use>
  </svg>
  <i :class="name" @click="$emit('click')" v-else></i>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'

export default @Component
class HpcIcon extends Vue {
  /* vue-props */
  @Prop({ required: true, type: String }) name
  @Prop({ type: String }) className
  @Prop({ type: Number, default: 0 }) rotate
  @Prop({ type: [String, Number], default: 24 }) size
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  get svgClass () {
    return ('svg-icon ' + (this.className || '')).trim()
  }
  get iconName () {
    return `#icon-${this.name}`
  }
  get styleObj () {
    return {
      transform: `rotate(${this.rotate}deg)`,
      fontSize: `${this.size}px`
    }
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
