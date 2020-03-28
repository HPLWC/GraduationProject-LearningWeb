<!-- 收藏页面 -->
<template>
  <div class="contact">
    <div data-flex="dir:top" class="a-c">
      <el-row :gutter="20" class="p-h-100">
        <el-col v-for="info in courseList" :lg="8" :md="8" :sm="12" class="m-t-20" :key="info.id">
          <new-course :isCollection="true" :value="info" @click="toDetail(info.id)" @refresh="refresh"></new-course>
        </el-col>
      </el-row>
      <el-pagination
        v-if="courseList.length > 0"
        class="m-v-20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <div class="f-20 m-v-50" v-if="courseList.length === 0" :style="{height: '163px'}">收藏夹中啥都木得</div>
    </div>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import NewCourse from '../../home/fragment/NewCourse'

export default @Component({ components: { LayoutHeader, LayoutFooter, NewCourse } })
class Home extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  courseList = []
  pagination = {
    pageSizeOptions: ['10', '20', '30', '50'],
    current: 1, // 当前页数
    pageSize: 10,
    total: 0
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.getAllInfo()
  }
  /* vue-method */
  async getAllInfo (params = {}) {
    Object.assign(params, {id: this.$ls.getObj('USER_INFO').id})
    const { data } = await this.$store.dispatch('getTheUserCollections', {
      ...params,
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current,
    })
    if (data) {
      this.pagination.total = data.total || 0
      this.courseList = data.data || []
    }
  }

  handleSizeChange (val) {
    this.pagination.pageSize = val
    this.pagination.current = 1
    this.getAllInfo()
  }
  handleCurrentChange (val) {
    this.pagination.current = val
    this.getAllInfo()
  }
  toDetail (id) {
    this.$router.push({ path: '/course/detail', query: { id } })
  }
  refresh () {
    this.getAllInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
