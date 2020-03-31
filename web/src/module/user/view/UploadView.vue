<!-- 我的上传 -->
<template>
  <div class="contact">
    <div data-flex="dir:top" class="a-c">
      <el-row :gutter="20" class="p-h-100">
        <el-col :lg="8" :md="8" :sm="12" class="m-t-20">
          <div @click="myUploadEvent" data-flex="cross:center main:center" style="height: 200px;" class="div m-t-10 cp">
            <i class="el-icon-plus" style="font-size: 40px;color: #aaa"></i>
          </div>
        </el-col>
        <el-col v-for="info in courseList" :lg="8" :md="8" :sm="12" class="m-t-20" :key="info.id">
          <new-course :isUpload="true" :isCollection="false" :value="info" @click="toDetail(info.id)" @refresh="refresh"></new-course>
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
    </div>

    <upload-modal ref="uploadModal" @refresh="refresh"></upload-modal>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import NewCourse from '../../home/fragment/NewCourse'
import UploadModal from '../fragment/UploadModal'

export default @Component({ components: { LayoutHeader, LayoutFooter, NewCourse, UploadModal } })
class UploadView extends Vue {
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
    Object.assign(params, {user_id: this.$ls.getObj('USER_INFO').id})
    const { data } = await this.$store.dispatch('getTheUploadCourseInfo', {
      ...params,
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current,
    })
    if (data) {
      this.pagination.total = data.total || 0
      this.courseList = data.data || []
    }
  }

  async myUploadEvent () {
    this.$refs.uploadModal.dialogVisible = true
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
