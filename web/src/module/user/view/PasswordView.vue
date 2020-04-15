<!-- 密码修改页面 -->
<template>
  <div class="password_view">
    <div data-flex="main:center cross:top" class="a-c m-t-16 a-l">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="m-l-40 m-t-20" :style="{ width: '80%' }">
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" class="m-t-15" prop="password_new">
          <el-input type="password" v-model="form.password_new"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="m-t-15" prop="password_new2">
          <el-input type="password" v-model="form.password_new2"></el-input>
        </el-form-item>
        <el-form-item class="m-t-15">
          <el-button type="primary" @click="submitForm('form')">确认</el-button>
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
class PasswordView extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  form = {}

  rules = {
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    password_new: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
    password_new2: [
      { required: true, message: '请确认新密码', trigger: 'blur' }
    ],
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  submitForm (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        if (this.form.password_new !== this.form.password_new2) {
          this.$notify({
            type: 'error',
            title: '提示',
            message: '两次密码不一致'
          })
          return
        }

        const { data } = await this.$store.dispatch('updateUserPassword', {
          ...this.form,
          email: this.$ls.getObj('USER_INFO').email
        })
        if (data.success === false) {
          this.$notify({
            type: 'error',
            title: '提示',
            message: data.message
          })
        } else {
          this.$notify({
            type: 'success',
            title: '提示',
            message: '修改成功'
          })
          this.form = {}
        }
      } else {
        this.$notify({
          type: 'error',
          title: '提示',
          message: '请按要求输入正确项'
        })
        return false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .password_view {
    /deep/ .el-form .el-form-item {
      flex: 0 1 100%;
      font-size: 18px;
      .el-form-item__label {
        font-size: 16px;
      }
    }
  }
</style>
