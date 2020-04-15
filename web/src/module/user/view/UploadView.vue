<!-- 我的上传 -->
<template>
  <div class="contact">
    <div data-flex="dir:top" class="a-c m-b-20" v-if="$ls.getObj('USER_INFO').role !== 2">
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

    <div data-flex="dir:top" class="a-c m-b-20" v-else>
      <p class="f-20 m-t-20">
        您还未认证教师身份,
        <span class="t-hover cp" @click="showAuthenticate">点此认证</span>
      </p>
    </div>

    <!-- 上传视频 -->
    <upload-modal ref="uploadModal" @refresh="refresh" v-if="$ls.getObj('USER_INFO').role !== 2"></upload-modal>
    <!-- 认证身份 -->
    <authenticate-modal ref="authenticateModal" @refresh="refresh" v-else></authenticate-modal>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import UploadModal from '../fragment/UploadModal'
import AuthenticateModal from '../fragment/AuthenticateModal'
import NewCourse from '../../home/fragment/NewCourse'

export default @Component({ components: { LayoutHeader, LayoutFooter, UploadModal, AuthenticateModal, NewCourse } })
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
  showAuthenticate () {
    this.$refs.authenticateModal.showModal()
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
