<!-- 课程列表页 -->
<template>
  <div>
    <layout-header>类型</layout-header>

    <div data-flex="main:justify cross:center" class="m-h-100 p-h-30 m-t-15 m-b-5 b-b">
      <div data-flex="" class="f-16">
        <p v-for="val in $c.OrderWay" class="m-r-20" :key="val.way">按{{ val.value }}排序</p>
      </div>
      <el-form :model="searchForm" :inline="true" label-width="100px">
        <el-form-item>
          <el-input v-model="searchForm.value" :style="{ width: '250px' }">
            <hpc-icon slot="append" name="search" :size="18"></hpc-icon>
          </el-input>
          <!--<el-button class="m-l-10">搜索</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="80" class="p-h-100">
      <el-col :lg="6" :md="8" :sm="12" class="m-t-20">
        <new-course></new-course>
      </el-col>
      <el-col :lg="6" :md="8" :sm="12" class="m-t-20">
        <new-course></new-course>
      </el-col>
      <el-col :lg="6" :md="8" :sm="12" class="m-t-20">
        <new-course></new-course>
      </el-col>
      <el-col :lg="6" :md="8" :sm="12" class="m-t-20">
        <new-course></new-course>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import NewCourse from '../../home/fragment/NewCourse'

export default @Component({ components: { LayoutHeader, NewCourse } })
class CourseList extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  searchForm = {
    value: ''
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
</style>
