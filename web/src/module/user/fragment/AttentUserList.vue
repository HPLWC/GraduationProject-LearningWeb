<!-- 关注页面 -->
<template>
  <div class="contact m-h-20">
    <div data-flex="main:justify cross:center" class="p-h-20">
      <div data-flex="cross:center">
<!--        <img src="../../../assets/images/banner.png" alt="">-->
        <hpc-icon name="defaultuser" :size="70" class="m-t-2 o-8"></hpc-icon>
        <div class="f-18 m-l-30">
          <p>云小豆</p>
          <p class="f-14 m-t-5">家庭教师</p>
        </div>
      </div>
      <el-button>取消关注</el-button>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component({})
class Home extends Vue {
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
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>
