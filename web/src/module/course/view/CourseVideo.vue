<!-- 视频播放页 -->
<template>
  <div>
    <header-nav :bgc="true"></header-nav>
    <el-row type="flex" :gutter="20" class="p-h-100 m-t-20">
      <el-col :md="18" :sm="24">
        <!-- 标题部分 -->
        <div class="p-t-20 f-18">
          <p class="m-b-15 f-24">{{ courseInfo.title }}</p>
          <div data-flex="">
            <p data-flex="cross:center" class="m-b-0 f-14">
              <hpc-icon name="timeselect" size="20"></hpc-icon>
              <span class="m-l-5">发布时间：{{ courseInfo.addTime }}</span>
            </p>
            <p class="m-l-40 m-b-0 f-14">播放量：{{ courseInfo.play_num }}</p>
          </div>
        </div>
      </el-col>

      <el-col :md="6" :sm="1" class="hidden-xs-only hidden-sm-only">
        <div data-flex="cross:bottom" class="p-t-20 f-18">
          <div class="m-h-10">
            <hpc-icon name="defaultuser" :size="60" class="m-t-2 o-8"></hpc-icon>
          </div>
          <p class="m-b-15 p-r-30">主讲人：{{ userInfo.name }}</p>
          <el-button @click="attention(userInfo.id)" type="primary" class="m-b-10">{{ isAttention ? '已关注' : '关注' }}</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" :gutter="20" class="p-h-100 m-t-20">
      <el-col :md="18" :sm="24">
        <!-- 视频播放器 -->
        <hpc-video v-if="videoUrl.url" :videoUrl="videoUrl" :options="{ height: videoHeight }"></hpc-video>
      </el-col>

      <el-col :md="6" :sm="1" class="hidden-xs-only hidden-sm-only" :style="{ height: `calc(${videoHeight} - 70px)` }">
        <course-video-list :data="sections" :selectedKey="selectedKey" @checkList="checkList"></course-video-list>
      </el-col>
    </el-row>

    <!-- 评论 -->
    <div class="m-h-100 m-t-80 p-r-100 m-b-40">
      <list-view type="comment" :data="comment" :total="commentPage.total" @refresh="refresh"></list-view>
    </div>

    <!-- 底部 -->
    <layout-footer></layout-footer>
  </div>
</template>

<script>
import {Component, Watch, Vue} from 'vue-property-decorator'
import 'element-ui/lib/theme-chalk/display.css'
import HeaderNav from '../../common/fragment/HeaderNav'
import LayoutFooter from '../../common/view/LayoutFooter'
import CourseVideoList from '../fragment/CourseVideoList'
import ListView from '../fragment/ListView'

export default @Component({ components: { HeaderNav, LayoutFooter, CourseVideoList, ListView } })
class CourseVideo extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  videoHeight = '600px'
  videoUrl = {}
  selectedKey = ''
  isAttention = false

  courseInfo = {}
  userInfo = {}
  sections = []
  comment = []
  commentPage = {
    pageSizeOptions: ['10', '20', '30', '50'],
    current: 1, // 当前页数
    pageSize: 10,
    total: 0
  }
  /* vue-compute */
  /* vue-watch */
  @Watch('$route', {immediate: false, deep: true})
  change (newV) {
    const videoKey = newV.query.videoKey
    const res = this.sections.filter(item => item.id === videoKey)
    this.videoUrl = {
      url: res[0].video
    }

    this.getComment()
  }

  /* vue-lifecycle */
  created () {
    this.getCourseInfo()
    this.getSection()
    this.selectedKey = this.$route.query.videoKey
    this.getComment()
    this.isAttentionEvent()
  }
  /* vue-method */
  async getCourseInfo (params = {}) {
    Object.assign(params, { id: this.$route.query.id })
    const { data } = await this.$store.dispatch('getTheCourseInfo', {
      ...params
    })
    if (data) {
      this.courseInfo = data
      this.userInfo = data.userInfo || {}
    }
  }

  async getSection (params = {}) {
    Object.assign(params, { id: this.$route.query.id })
    const { data } = await this.$store.dispatch('getCourseAllSection', {
      ...params,
    })
    if (data) {
      this.sections = data.data
      const res = this.sections.filter(item => item.id === this.$route.query.videoKey)
      this.videoUrl = {
        url: res[0].video
      }
    }
  }

  async getComment (params = {}) {
    Object.assign(params, { id: this.$route.query.videoKey })
    const { data } = await this.$store.dispatch('getTheComment', {
      ...params,
    })
    if (data) {
      this.comment = data.data
      this.commentPage.total = data.total || 0
    }
  }

  async isAttentionEvent () {
    const params = {
      user_id: this.$ls.getObj('USER_INFO').id,
      attention_user_id: this.userInfo.id
    }
    const { data } = await this.$store.dispatch('getIsAttention', {
      ...params
    })
    if (data) {
      this.isAttention = data.data.isAttention
    }
  }

  /* 关注 */
  async attention (id) {
    const vuex = this.isAttention ? 'deleteAttention' : 'saveTheUserAttentions'
    const params = {
      user_id: this.$ls.getObj('USER_INFO').id,
      attention_user_id: id
    }
    const { data } = await this.$store.dispatch(vuex, params)
    if (data) {
      this.isAttentionEvent()
    }
  }

  /* 刷新 */
  refresh () {
    this.getComment()
  }

  /* 选中视频列表 */
  checkList (key) {
    this.selectedKey = key
  }
}
</script>

<style lang="scss" scoped>
  $height: 110px;

  .list-height {
    height: $height;
  }
</style>
