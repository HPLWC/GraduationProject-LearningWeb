<!-- 评论/视频目录页 -->
<template>
  <div>
    <h1 data-flex="cross:center" class="f-22 p-b-8 b-b">
      <hpc-icon name="view"></hpc-icon>
      <span class="m-l-10">{{ title }}</span>
      <hpc-icon name="add" v-if="isEditor" @click="addUploadSection" class="cp"></hpc-icon>
    </h1>
    <div>
      <template v-if="type==='comment'">
        <!-- 发表评论 -->
        <div data-flex="cross:top" class="m-v-20 w-100 b-b p-b-40">
          <div>
            <img v-if="$ls.getObj('USER_INFO').photo" :src="$ls.getObj('USER_INFO').photo" alt="" class="my_photo_ava">
            <hpc-icon v-else name="defaultuser" :size="50" class="m-t-2 o-8"></hpc-icon>
          </div>
          <div class="m-l-18 bx-b w-100">
            <div class="w-100">
              <textarea v-model="firstCommentText" name="comment" class="w-100 b-b b-t b-l b-r p-10 bx-b" :style="{ borderRadius: '4px' }"></textarea>
            </div>
            <el-button @click="putFirstComment" type="primary" class="m-t-10">发布</el-button>
          </div>
        </div>
      </template>

      <ul class="p-h-15 p-t-20">
        <template v-if="type==='comment'">
          <!-- 评论 -->
          <template v-if="data.length > 0">
            <li v-for="(item, key) in data" data-flex="cross:top" class="m-t-20 p-b-20 p-h-10 b-b" :key="item.id">
              <div>
                <img v-if="item.userInfo.photo" :src="item.userInfo.photo" alt="" class="my_photo_ava">
                <hpc-icon v-else name="defaultuser" :size="50" class="m-t-2 o-8"></hpc-icon>
              </div>
              <div class="m-l-18 bx-b w-100">
                <div>
                  <p class="m-b-10 f-16">{{ item.userInfo && item.userInfo.name }}</p>
                  <p class="o-7 p-r-100 f-18">{{ item.content }}</p>
                </div>
                <div>
                  <span class="m-r-20 o-8 f-12">2020/02/02</span>
                  <el-button type="text" @click="showReplyComment(item.userInfo.id, item.id, key)">回复</el-button>
                </div>
                <template>
                  <ul class="w-100">
                    <li v-for="replyItem in item.commentReply" data-flex="cross:top" class="m-t-20 p-b-20 p-h-10" :key="replyItem.id">
                      <div>
                        <img
                          v-if="replyItem.userInfo.photo"
                          :src="replyItem.userInfo.photo"
                          alt=""
                          class="my_photo_ava"
                          :style="{ width: '34px', height: '34px' }"
                        >
                        <hpc-icon v-else name="defaultuser" :size="40" class="o-8"></hpc-icon>
                      </div>
                      <div class="m-l-18 bx-b">
                        <div>
                          <p class="m-b-10 f-14 cp">
                            {{ replyItem.userInfo && replyItem.userInfo.name }}
                            @
                            {{ replyItem.toUserInfo && replyItem.toUserInfo.name }}
                          </p>
                          <p class="o-7 p-r-100 f-16">{{ replyItem.content }}</p>
                        </div>
                        <div>
                          <span class="m-r-20 o-8 f-12">2020/02/02</span>
                          <el-button type="text" @click="showReplyComment(replyItem.userInfo.id, item.id, key)">回复</el-button>
                        </div>
                      </div>
                    </li>
                    <!-- 发表评论 -->
                    <li v-if="isReplyComment[key]" data-flex="cross:top" class="m-t-20 p-b-20 p-h-10 w-100">
                      <div>
                        <img
                          v-if="$ls.getObj('USER_INFO').photo"
                          :src="$ls.getObj('USER_INFO').photo"
                          alt="" class="my_photo_ava"
                          style="width: 35px;height: 35px;">
                        <hpc-icon v-else name="defaultuser" :size="40" class="o-8"></hpc-icon>
                      </div>
                      <div class="m-l-18 bx-b w-100">
                        <div class="w-100">
                          <textarea v-model="replyCommentText" name="replyComment" class="w-100 b-b b-t b-l b-r p-10 bx-b" :style="{ borderRadius: '4px' }"></textarea>
                        </div>
                        <el-button @click="putReplyComment" type="primary" class="m-t-10">发布</el-button>
                      </div>
                    </li>
                  </ul>
                </template>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="a-c f-22 m-v-20">暂无评论</li>
          </template>
        </template>

        <template v-else-if="type==='catalog'">
          <!-- 目录 -->
          <template v-if="data.length > 0">
            <li v-for="item in data" data-flex="cross:center" class="catalog m-t-20 p-b-20 p-h-10 b-b" :key="item.id">
              <div>
                <hpc-icon name="video" class="o-8"></hpc-icon>
              </div>
              <div class="m-l-18 bx-b">
                <p class="m-b-15 f-18 cp t-hover" @click="toVideo(item.id)" :data-url="item.id">{{ item.title }}</p>
                <p class="o-7 p-r-100">{{ item.decoration }}</p>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="a-c f-22 m-v-20">暂无目录</li>
          </template>
        </template>
      </ul>

      <el-pagination
        v-if="data.length > 0"
        class="m-v-20 a-c"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.pageSizeOptions"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'

export default @Component
class ListView extends Vue {
  /* vue-props */
  // 种类： catalog目录页  comment评论页
  @Prop({ type: String, default: 'catalog' }) type
  @Prop({ type: Array, default: () => [] }) data
  @Prop({ type: Number, default: 0 }) total
  @Prop({ type: String, default: '' }) userId
  /* vue-vuex */
  /* vue-data */
  firstCommentText = '' // 首评论
  replyCommentText = '' // 回复评论
  isReplyComment = [] // 是否显示二级评论
  replyCommentInfo = {} // 二级评论信息

  photo = ''
  isEditor = false

  pagination = {
    pageSizeOptions: ['10', '20', '30', '50'],
    current: 1, // 当前页数
    pageSize: 10,
    total: 0
  }
  /* vue-compute */
  get title () {
    if (this.type === 'catalog') return `课程目录（${this.total}章）`
    else if (this.type === 'comment') return `评论(${this.total})`
    else return ''
  }
  /* vue-watch */
  @Watch('total', {deep: true, immediate: true})
  onChangeValue (newV) {
    this.pagination.total = newV
    this.isReplyComment.length = newV
  }

  /* vue-life */
  async created () {
    const { data } = await this.$store.dispatch('userInfo')

    if (data) {
      this.isEditor = data.id === this.userId && this.type === 'catalog'
    }
    console.log(data)
  }

  /* vue-method */
  async putFirstComment () {
    const params = {
      user_id: this.$ls.getObj('USER_INFO').id,
      section_id: this.$route.query.videoKey,
      content: this.firstCommentText
    }
    const { data } = await this.$store.dispatch('saveTheFirstComment', {
      ...params
    })
    if (data) {
      this.$notify({
        type: 'success',
        title: '提示',
        message: '发送成功'
      })
      this.firstCommentText = ''
      this.$emit('refresh', true)
    }
  }

  /* 发布二级评论 */
  async putReplyComment () {
    const params = {
      user_id: this.$ls.getObj('USER_INFO').id,
      content: this.replyCommentText,
      to_user_id: this.replyCommentInfo.user_id,
      comment_id: this.replyCommentInfo.comment_id
    }

    const {data} = await this.$store.dispatch('saveTheSecondComment', {
      ...params
    })
    if (data) {
      this.$notify({
        type: 'success',
        title: '提示',
        message: '发送成功'
      })
      this.replyCommentText = ''
      this.$emit('refresh', true)
    }
  }

  handleSizeChange (val) {
    this.pagination.pageSize = val
    this.pagination.current = 1
    this.$emit('handleSizeChange', this.pagination)
  }
  handleCurrentChange (val) {
    this.pagination.current = val
    this.$emit('handleCurrentChange', this.pagination)
  }

  toVideo (id) {
    this.$router.push({ path: '/course/video', query: { id: this.$route.query.id, videoKey: id } })
  }

  showReplyComment (userId, commentId, key) {
    this.isReplyComment.splice(0, this.isReplyComment.length)
    this.isReplyComment.length = this.total
    this.isReplyComment.fill(false)
    this.isReplyComment.splice(key, 1, true)

    this.replyCommentInfo = {
      user_id: userId,
      comment_id: commentId
    }
  }

  /* 上传文件 */
  addUploadSection () {
    this.$emit('uploadSection')
  }
}
</script>

<style lang="scss" scoped>
  .catalog:hover {
    /*background: #c0c4cc;*/
  }
</style>
