<template>
  <div class="contact">
    <layout-header>联系我们</layout-header>

    <div data-flex="dir:top" class="m-h-100 p-h-40 m-b-100 m-t-60 m-b-5 f-20">
      <el-row :gutter="80" class="p-h-100">
        <el-col :lg="8" :md="8" :sm="12" class="m-t-20">
          <el-card class="box-card">
            <div>
              微信
            </div>
            <div class="w-100 m-t-20">
              <img src="../../../assets/images/wechat.png" alt="">
            </div>
          </el-card>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" class="m-t-20">
          <el-card class="box-card">
            <div>
              QQ
            </div>
            <div class="w-100 m-t-20">
              <img src="../../../assets/images/QQ.jpg" alt="">
            </div>
          </el-card>
<!--          <img src="../../../assets/images/banner.png" alt="">-->
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" class="m-t-20">
          <el-card class="box-card">
            <div>
              微博
            </div>
            <div class="w-100 m-t-20">
              <img src="../../../assets/images/weibo.jpg" alt="">
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!--  页面底部  -->
    <layout-footer ref="LayoutFooter"></layout-footer>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'
import LayoutHeader from '../../common/view/LayoutHeader'
import LayoutFooter from '../../common/view/LayoutFooter'

export default @Component({ components: { LayoutHeader, LayoutFooter } })
class Contact extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  .contact {
    img {
      left: 0;
      width: 100%;
      height: 100%;
      /*max-width: 100%;*/
      object-fit: cover;
      /*position: absolute;*/
    }
  }
</style>
