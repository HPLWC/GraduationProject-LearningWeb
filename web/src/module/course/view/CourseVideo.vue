<template>
  <div>
    <header-nav :bgc="true"></header-nav>
    <el-row :gutter="10" class="p-h-100">
      <el-col :md="16" :sm="24">
        <hpc-video :options="{height: '500px'}"></hpc-video>
      </el-col>
      <el-col :md="8" :sm="0">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import HeaderNav from '../../common/fragment/HeaderNav'

export default @Component({ components: { HeaderNav } })
class CourseVideo extends Vue {
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
</style>
