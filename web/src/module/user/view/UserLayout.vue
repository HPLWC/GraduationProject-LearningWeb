<template>
  <div class="user_layout">
    <layout-header>{{ title }}</layout-header>

    <div data-flex="main:center" class="m-h-100 m-t-30">
      <el-menu
        :style="{ width: '200px' }"
        :default-active="route"
        @select="handleSelect"
        class="el-menu-vertical-demo div"
        active-text-color="#f9f9f9">
        <el-menu-item index="center">
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-menu-item index="collection">
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="attention">
          <span slot="title">我的关注</span>
        </el-menu-item>
      </el-menu>

      <div class="div m-l-10" :style="{ width: '1000px', minHeight: '233px' }">
        <router-view></router-view>
      </div>
    </div>

    <!--  页面底部  -->
    <layout-footer ref="LayoutFooter"></layout-footer>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'
import AttentUserList from '../fragment/AttentUserList'

export default @Component({ components: { LayoutHeader, LayoutFooter, AttentUserList } })
class Home extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  get title () {
    switch (this.route) {
      case 'center':
        return '个人中心'
      case 'collection':
        return '我的收藏'
      case 'attention':
        return '我的关注'
      default:
        return ''
    }
  }
  get route () {
    const arr = this.$route.path.split('/')
    return arr.length > 2 ? arr[2] : ''
  }
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    // this.getAllInfo()
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

  handleSelect (key) {
    this.$router.push(key)
  }
}
</script>

<style lang="scss" scoped>
  .user_layout /deep/ .el-menu {
    .is-active {
      background: #717171;
    }
  }
</style>
