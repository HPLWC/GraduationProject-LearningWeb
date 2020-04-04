<!-- 课程介绍卡片 -->
<template>
  <div data-flex="" class="course-detail-card div p-20">
    <el-row :gutter="60" class="w-100">
      <el-col :md="14" :sm="14">
        <img v-if="data.photo" :src="data.photo" alt="" class="w-100" :style="{ objectFit: 'cover', maxHeight: '300px' }">
        <img v-else src="../../../assets/images/banner.png" alt="默认图片" class="w-100" :style="{ objectFit: 'cover', maxHeight: '300px' }">
      </el-col>
      <el-col :md="10" :sm="10" class="p-5">
        <h1 class="f-22 p-b-10 b-b">[{{ data.courseType && data.courseType.title }}]{{ data.title }}</h1>
        <div>
          <p class="m-t-18 m-b-5 f-18">课程介绍</p>
          <div class="o-8" :style="{ lineHeight: '1.7' }">{{ data.decoration || '暂无简介' }}</div>
        </div>
        <div>
          <p class="m-t-18 m-b-5 f-18">主讲人:   {{ data.userInfo && data.userInfo.name || '暂无' }}</p>
<!--          <div class="o-8" :style="{ lineHeight: '1.7' }">{{ data.userInfo.name || '暂无' }}</div>-->
        </div>
        <div class="a-l m-t-20" data-flex="cross:center">
          <el-button type="primary" size="medium" @click="$emit('click')" :disabled="!hasCatalog">开始学习</el-button>
          <div class="m-l-20">
            <hpc-icon @click="collectionEvent" name="el-icon-star-on" :style="{ color: isCollect ? '#ffe838' : '#aaa' }"></hpc-icon>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'

export default @Component
class CourseDetailCard extends Vue {
  /* vue-props */
  @Prop({ type: Object, default: {} }) data
  @Prop({ type: Boolean, default: false }) hasCatalog
  /* vue-vuex */
  /* vue-data */
  isCollect = false
  btnDisabled = false
  /* vue-compute */
  /* vue-watch */
  @Watch('hasCatalog')
  change (newV) {
    this.btnDisabled = newV
  }
  /* vue-lifecycle */
  created () {
    this.isCollectEvent()
  }
  /* vue-method */
  async collectionEvent () {
    let vuex = this.isCollect ? 'deleteCollection' : 'saveCollection'
    const { data } = await this.$store.dispatch(vuex, {
      user_id: this.$ls.getObj('USER_INFO').id,
      course_info_id: this.$route.query.id
    })
    if (data) {
      this.isCollectEvent()
    }
  }
  async isCollectEvent () {
    const params = {
      user_id: this.$ls.getObj('USER_INFO').id,
      course_info_id: this.$route.query.id
    }
    const { data } = await this.$store.dispatch('getIsCollection', {
      ...params
    })
    if (data) {
      this.isCollect = data.data.isCollect
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-detail-card {
    /deep/ .el-icon-star-on {
      font-size: 32px;
      cursor: pointer;
    }
    /deep/ .el-icon-star-off {
      font-size: 28px;
    }
  }
</style>
