<!-- 个人中心页面 -->
<template>
  <div class="user_center">
    <div data-flex="main:center cross:top" class="a-c m-t-20 a-l">
      <img src="../../../assets/images/banner.png" alt="">
      <el-form ref="form" :model="form" label-width="120px" class="m-l-40 m-t-20" :style="{ width: '60%' }">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" class="m-t-15">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="未知"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" class="m-t-15">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="m-t-15">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="评价" class="m-t-15">
          <el-input type="textarea" v-model="form.common"></el-input>
        </el-form-item>
        <el-form-item class="m-t-15">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  form = {}
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.form = this.$ls.getObj('USER_INFO')
  }
  /* vue-method */
}
</script>

<style lang="scss" scoped>
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .user_center {
    /deep/ .el-form .el-form-item {
      flex: 0 1 100%;
      font-size: 20px;
      .el-form-item__label {
        font-size: 17px;
      }
    }
  }
</style>
