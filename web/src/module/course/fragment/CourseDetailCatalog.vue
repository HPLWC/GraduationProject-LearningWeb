<!-- 目录 -->
<template>
  <list-view type="catalog" :data="data" :total="pagination.total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></list-view>
</template>

<script>
import {Component, Prop, Vue} from 'vue-property-decorator'
import ListView from './ListView'

export default @Component({ components: { ListView } })
class CourseDetailCatalog extends Vue {
  /* vue-props */
  @Prop() id
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
    console.log(this.pagination)
    Object.assign(params, { id: this.id })
    const { data } = await this.$store.dispatch('getCourseAllSection', {
      ...params,
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current,
    })
    console.log(this.pagination, 22)
    if (data) {
      console.log(data)
      this.data = data.data || []
      this.pagination.total = data.total || 0
    }
  }
  handleCurrentChange (val) {
    this.pagination = val
    this.init()
  }
  handleSizeChange (val) {
    this.pagination = val
    this.init()
  }
}
</script>

<style lang="scss" scoped>
</style>
