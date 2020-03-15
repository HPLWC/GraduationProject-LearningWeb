<!-- 课程列表页 -->
<template>
  <div>
    <layout-header>课程</layout-header>

    <div data-flex="main:justify cross:center" class="m-h-100 p-h-30 m-t-15 m-b-5 b-b">
      <div data-flex="cross:center" class="f-16">
<!--        <p v-for="val in $c.OrderWay" class="m-r-20" :key="val.way">按{{ val.value }}排序</p>-->
        <p>类型：</p>
        <el-select v-model="courseTypeOptions.value" @change="typeChange" filterable placeholder="请选择">
          <el-option
            v-for="item in courseTypeOptions.options"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-form :model="searchForm" :inline="true" label-width="100px" @submit.native.prevent="searchEvent">
        <el-form-item>
          <el-input v-model="searchForm.value" :style="{ width: '250px' }">
            <hpc-icon @click="searchEvent" slot="append" name="search" :size="18"></hpc-icon>
          </el-input>
          <!--<el-button class="m-l-10">搜索</el-button>-->
        </el-form-item>
      </el-form>
    </div>

    <div data-flex="dir:top" class="a-c">
      <el-row :gutter="80" class="p-h-100">
        <el-col v-for="info in courseList" :lg="6" :md="8" :sm="12" class="m-t-20" :key="info.id">
          <new-course :value="info" @click="toDetail(id)"></new-course>
        </el-col>
      </el-row>
      <el-pagination
        class="m-v-20"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper">
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

  courseTypeOptions = {
    options: [],
    value: 0,
  }
  courseList = []

  pagination = {
    pageSizeOptions: ['10', '20', '30', '50'],
    current: 1,
    pageSize: 10,
    total: 0
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  async created () {
    this.courseList = await this.getAllInfo()
    this.courseTypeOptions.options = await this.getAllType()
    this.courseTypeOptions.options.push({id: 0, title: '所有'})

    // this.$nextTick(() => {
    //   this.courseTypeOptions.value = 0
    // })
  }
  /* vue-method */
  async getAllInfo (params) {
    const { data } = await this.$store.dispatch('getCourseAllInfo', {
      ...params,
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current,
    })
    if (data) {
      this.pagination.total = data.total || 0
    }
    return data && data.data || []
  }
  async getAllType () {
    const { data } = await this.$store.dispatch('getCourseAllNameType')
    return data || []
  }

  /* 选择器改变事件 */
  async typeChange (value) {
    this.searchForm.value = ''
    this.courseList = await this.getAllInfo({ type_id: value })
  }
  /* 查询 */
  async searchEvent () {
    console.log(this.searchForm.value)
    this.courseList = await this.getAllInfo({
      type_id: this.courseTypeOptions.value,
      title: this.searchForm.value
    })
  }

  toDetail (id) {
    this.$router.push({ path: '/course/detail', query: { id } })
  }
}
</script>

<style lang="scss" scoped>
</style>
