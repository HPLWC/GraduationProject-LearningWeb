<!-- 底部部分 -->
<template>
  <footer class="m-t-20 p-h-100 p-v-30 bg_deep c-white o-9">
    <el-row :gutter="80" class="w-100">
      <el-col :md="8" :sm="8" :offset="3">
        <p class="m-b-15 f-18">易上课</p>
        <ul data-flex="main:left">
          <li class="p-r-20 m-r-30 cp t-hover">
            <router-link to="/about">关于我们</router-link>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <router-link to="/contact">联系我们</router-link>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <router-link to="/blogroll">友情链接</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :md="8" :sm="8">
        <p class="m-b-15 f-18">导航</p>
        <ul data-flex="main:left">
          <li class="p-r-20 m-r-30 cp t-hover">
            <router-link to="/home">首页</router-link>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <router-link to="/course/list">课程</router-link>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <router-link to="/about">关于</router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </footer>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component
class LayoutFooter extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  footer {
    overflow: hidden;

    &.bg_deep {
      /*background: #efeff4;*/
      background: rgba(0, 0, 0, 0.9) !important;
    }

  }
</style>
