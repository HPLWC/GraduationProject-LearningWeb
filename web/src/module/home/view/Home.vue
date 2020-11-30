<template>
  <div class="home-page">
    <layout-header :height="700"></layout-header>

    <!--  第二层：介绍功能  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">选择易上课</div>
      <div class="w-100 m-h-100 p-h-100 bx-b" data-flex="main:justify box:mean">
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-s-platform f-50"></i></div>
          <div class="f-18 m-b-10">覆盖面积广</div>
          <div>易上课作为线上课程，各个地区只要有网络，即可使用，覆盖面积广</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-s-promotion f-50"></i></div>
          <div class="f-18 m-b-10">涵盖范围大</div>
          <div>易上课主要服务于教育群体，但并不局限于此，各行各业都可以上传自己想上传的视频供大家讨论学习。</div>
        </div>
        <div v-hover data-observer="hover-animate" class="m-h-60 p-20" data-flex="dir:top cross:center">
          <div class="p-30"><i class="el-icon-share f-50"></i></div>
          <div class="f-18 m-b-10">时间局限性小</div>
          <div>易上课是作为全天候上线的网站，任何时间任何地点，只要有网络就可以学习，只要有问题就可以评论。</div>
        </div>
      </div>
    </div>

    <!--  第三层：吹吹水  -->
    <div class="m-t-50 bg_lg">
      <div class="f-24 f-b p-v-50 a-c c-white o-9">
        <p>一切不以为了解决学生问题为目标的视频都是耍流氓！</p>
        <p>一站学习，一套课程，一份收获</p>
      </div>
    </div>

    <!--  第四层：内容介绍  -->
    <div class="m-t-50" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20">我能学到什么？</div>
      <template >
        <el-row v-for="(typeArr, key) in courseType" :gutter="80" class="w-100 p-h-100" :key="key">
          <el-col v-for="type in typeArr" :md="8" :sm="12" class="m-t-20" :key="type.id">
            <icon-card :value="type"></icon-card>
          </el-col>
          <!--<el-col :md="8" :sm="12" class="m-t-20">
            <icon-card></icon-card>
          </el-col>
          <el-col :md="8" :sm="12" class="m-t-20">
            <icon-card></icon-card>
          </el-col>
          <el-col :md="8" :sm="12" class="m-t-20">
            <icon-card></icon-card>
          </el-col>
          <el-col :md="8" :sm="12" class="m-t-20">
            <icon-card></icon-card>
          </el-col>
          <el-col :md="8" :sm="12" class="m-t-20">
            <icon-card></icon-card>
          </el-col>-->
        </el-row>
      </template>
    </div>

    <!--  第五层：最新课程  -->
    <div class="m-t-50 p-b-40 bg_deep" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20 m-t-20">最新课程</div>
      <el-row :gutter="80" class="w-100 p-h-100">
        <el-col v-for="info in courseInfo" :md="8" :sm="12" :key="info.id">
          <new-course :value="info" @click="toCourseDetail(info.id)"></new-course>
        </el-col>
      </el-row>
      <div class="f-16 cp m-t-30 t-hover">
        <a @click="allCourse">全部课程 ></a>
      </div>
    </div>

    <!--  第六层：用户评价  -->
    <div class="m-t-10 p-b-40" data-flex="dir:top cross:center">
      <div class="f-24 f-b p-v-20 m-t-20 m-b-10">用户评价</div>
      <div class="m-h-80 w-100 p-h-100 bx-b">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(item, key) in common" :key="key">
            <div data-flex="dir:top cross:center">
              <img v-if="item.photo" :src="item.photo" alt="" :style="{ width: '150px', height: '150px', borderRadius: '50%' }">
<!--              <img v-else src="" alt="" :style="{ width: '150px', height: '150px', borderRadius: '50%' }">-->
              <hpc-icon v-else name="defaultuser" :size="160" class="m-t-2 o-8"></hpc-icon>
              <p class="f-b f-18 m-v-10">{{ item.name }}</p>
              <p class="m-t-10 f-16 a-c" :style="{ maxWidth: '600px' }">{{ item.common }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!--  第七层：页面底部  -->
    <layout-footer ref="LayoutFooter"></layout-footer>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import LayoutHeader from '../../common/view/LayoutHeader.vue'
import LayoutFooter from '../../common/view/LayoutFooter.vue'
import IconCard from '../fragment/IconCard.vue'
import NewCourse from '../fragment/NewCourse.vue'

@Component({ components: { LayoutHeader, LayoutFooter, IconCard, NewCourse } })
export default class Home extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  courseType = []
  courseInfo = []
  common = []
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  async created () {
    const allType = await this.getAllType()
    this.courseType = this.$utils.toTwoArray(allType, 3)

    this.courseInfo = await this.getAllInfo()
    this.getAllCommon()
  }
  /* vue-method */
  async getAllType () {
    const { data } = await this.$store.dispatch('getCourseAllType', { pageSize: 6 })
    return data && data.data || []
  }
  async getAllInfo () {
    const { data } = await this.$store.dispatch('getCourseAllInfo', { pageSize: 3 })
    return data && data.data || []
  }
  async getAllCommon () {
    const { data } = await this.$store.dispatch('getUserInfoCommon', { is_used_comment: 1 })
    if (data) {
      this.common = data || []
    }
  }
  // 跳转到全部课程
  allCourse () {
    this.$router.push('/course/list')
  }
  toCourseDetail (id: string | number) {
    id = id.toString()
    this.$router.push({ path: '/course/detail', query: { id: id } })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/vars.scss";
  .home-page {

    .bg_lg {
      background: linear-gradient(135deg, #51cadd, $color-primary);
    }

    .bg_deep {
      background: #efeff4;
    }
  }
</style>
