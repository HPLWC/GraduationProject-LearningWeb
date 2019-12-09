<template>
  <footer class="m-t-20 p-h-100 p-v-30 bg_deep">
    <el-row :gutter="80" class="w-100">
      <el-col :md="8" :sm="8" :offset="3">
        <p class="m-b-15 f-18">科可课</p>
        <ul data-flex="main:left">
          <li class="p-r-20 m-r-30 cp t-hover">
            <a>关于我们</a>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <a>联系我们</a>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <a>友情链接</a>
          </li>
        </ul>
      </el-col>
      <el-col :md="8" :sm="8">
        <p class="m-b-15 f-18">导航</p>
        <ul data-flex="main:left">
          <li class="p-r-20 m-r-30 cp t-hover">
            <a>首页</a>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <a>联系我们</a>
          </li>
          <li class="p-r-20 m-r-30 cp t-hover">
            <a>友情链接</a>
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
  }
</style>
