<template>
  <div>
    <h1 data-flex="cross:center" class="f-22 p-b-8 b-b">
      <hpc-icon name="view"></hpc-icon>
      <span class="m-l-10">{{ title }}</span>
    </h1>
    <div>
      <ul class="p-h-15 p-t-20">
        <template>

          <!-- 评论 -->
          <li v-if="type==='comment'" data-flex="cross:top" class="m-t-20 p-b-20 p-h-10 b-b">
            <div>
              <hpc-icon name="defaultuser" :size="50" class="m-t-2 o-8"></hpc-icon>
            </div>
            <div class="m-l-18 bx-b">
              <div>
                <p class="m-b-10 f-18">首评论</p>
                <p class="o-7 p-r-100">本节课我们介绍了系列课程的关系，后端mvc，前端mvvm等列课程的关系，后端mvc，前端mvvm等概念和Vue.js基础的指令v-for，v-model</p>
              </div>
              <template>
                <ul>
                  <li data-flex="cross:center" class="m-t-20 p-b-20 p-h-10">
                    <div>
                      <hpc-icon name="defaultuser" :size="40" class="o-8"></hpc-icon>
                    </div>
                    <div class="m-l-18 bx-b">
                      <p class="m-b-10 f-16">子评论</p>
                      <p class="o-7 p-r-100">本节课我们介绍了系列课程的另一关系，除后端mvc，前端mvvm等概念和Vue.js基础的指令v-for，v-model</p>
                    </div>
                  </li>
                </ul>
              </template>
            </div>
          </li>

          <!-- 目录 -->
          <li v-else-if="type==='catalog'" data-flex="cross:center" class="catalog m-t-20 p-b-20 p-h-10 b-b">
            <div>
              <hpc-icon name="video" class="o-8"></hpc-icon>
            </div>
            <div class="m-l-18 bx-b">
              <p class="m-b-15 f-18 cp t-hover">第一讲1 Vue.js另一基础</p>
              <p class="o-7 p-r-100">本节课我们介绍了系列课程的另一关系，除后端mvc，前端mvvm等概念和Vue.js基础的指令v-for，v-model</p>
            </div>
          </li>

        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'

export default @Component
class ListView extends Vue {
  /* vue-props */
  // 种类： catalog目录页  comment评论页
  @Prop({ type: String, default: 'catalog' }) type
  @Prop({ type: Array, default: [] }) data
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  get title () {
    if (this.type === 'catalog') return '课程目录（3章）'
    else if (this.type === 'comment') return '评论'
    else return ''
  }
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  .catalog:hover {
    /*background: #c0c4cc;*/
  }
</style>
