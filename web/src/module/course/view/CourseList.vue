<!-- 课程列表页 -->
<template>
  <div>
    <layout-header>课程</layout-header>

    <div data-flex="main:justify cross:center" class="m-h-100 p-h-30 m-t-15 m-b-5 b-b">
      <div data-flex="cross:center" class="f-16">
<!--        <p v-for="val in $c.OrderWay" class="m-r-20" :key="val.way">按{{ val.value }}排序</p>-->
        <p>类型：</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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

    <div data-flex="dir:top" class="a-c">
      <el-row :gutter="80" class="p-h-100">
        <el-col :lg="6" :md="8" :sm="12" class="m-t-20">
          <new-course @click="toDetail"></new-course>
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
      <el-pagination
        class="m-v-20"
        :page-sizes="[10, 20, 30, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="8">
      </el-pagination>
    </div>

    <!-- 底部 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import NewCourse from '../../home/fragment/NewCourse'

export default @Component({ components: { LayoutHeader, LayoutFooter, NewCourse } })
class CourseList extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  searchForm = {
    value: ''
  }

  options = [{
    value: '0',
    label: '全部'
  }, {
    value: '1',
    label: '体育'
  }, {
    value: '2',
    label: '前端'
  }, {
    value: '3',
    label: '美工'
  }, {
    value: '4',
    label: '后台'
  }]
  value = '0'

  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  toDetail () {
    this.$router.push('/course/detail')
  }
}
</script>

<style lang="scss" scoped>
</style>
