<!-- 关注页面 -->
<template>
  <div class="contact">
    <div data-flex="dir:top" class="a-c m-t-20">
      <div v-for="item in userList" :key="item.id">
        <attent-user-list :data="item" @refresh="refresh"></attent-user-list>
      </div>
      <el-pagination
        v-if="userList.length > 0"
        class="m-v-20"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      <div class="f-20 m-v-50" v-if="userList.length === 0" :style="{height: '163px'}">你还没关注过任何人哦</div>
    </div>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import AttentUserList from '../fragment/AttentUserList'

export default @Component({ components: { LayoutHeader, LayoutFooter, AttentUserList } })
class Attention extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  userList = []
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
    const { data } = await this.$store.dispatch('getTheUserAttentions', {
      ...params,
      pageSize: this.pagination.pageSize,
      pageNum: this.pagination.current,
    })
    if (data) {
      this.pagination.total = data.total || 0
      this.userList = data.data || []
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
  refresh () {
    this.getAllInfo()
  }
}
</script>

<style lang="scss" scoped>
</style>
