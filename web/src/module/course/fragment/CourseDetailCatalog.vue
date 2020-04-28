<!-- 目录 -->
<template>
  <div>
    <list-view type="catalog" :userId="courseDetail.userInfo && courseDetail.userInfo.id" @uploadSection="uploadSection" :data="data" :total="pagination.total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" @refresh="refresh"></list-view>

    <upload-section-modal ref="uploadSectionModal" @refresh="refresh"></upload-section-modal>
  </div>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'
import ListView from './ListView'
import UploadSectionModal from './UploadSectionModal'

export default @Component({ components: { ListView, UploadSectionModal } })
class CourseDetailCatalog extends Vue {
  /* vue-props */
  @Prop() id
  @Prop({ type: Object, default: {} }) courseDetail
  /* vue-vuex */
  /* vue-data */
  data = []
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
    this.init()
  }
  /* vue-method */
  async init (params = {}) {
    Object.assign(params, { id: this.id })
    const { data } = await this.$store.dispatch('getCourseAllSection', {
      ...params,
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current,
    })
    if (data) {
      this.data = data.data || []
      this.pagination.total = data.total || 0

      this.$emit('firstData', this.data)
    }
  }
  uploadSection () {
    this.$refs.uploadSectionModal.dialogVisible = true
  }

  handleCurrentChange (val) {
    this.pagination = val
    this.init()
  }
  handleSizeChange (val) {
    this.pagination = val
    this.init()
  }
  refresh () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
</style>
