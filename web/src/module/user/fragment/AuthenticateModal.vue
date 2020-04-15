<template>
  <el-dialog
    title="认证"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <div class="my_form">
      <el-form ref="form" :rules="rules" :model="form" :inline="false" label-width="120px" class="m-l-20 m-v-20">
        <el-form-item label="姓名" prop="username" class="m-t-15">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="学校名称" prop="school" class="m-t-15">
          <el-input v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item label="证明材料" prop="material" class="m-t-15">
          <hpc-upload :imageUrl="form.material" @photoUrlEvent="photoUrlEvent" :isUploadPhoto="false" :isUploadMp4="false">上传材料</hpc-upload>
        </el-form-item>
        <el-form-item class="m-t-15">
          <el-button type="primary" @click="authentication('form')">{{ isAdd ? '确认' : '修改' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component({})
class AuthenticateModal extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  dialogVisible = false
  isAdd = true
  form = {}
  rules = {
    username: [
      { required: true, message: '请输入姓名', trigger: 'change' },
    ],
    school: [
      { required: true, message: '请输入学校', trigger: 'change' },
    ],
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  async showModal () {
    this.dialogVisible = true
    this.isAdd = true
    const { data } = await this.$store.dispatch('getTheAuthentication', {
      email: this.$ls.getObj('USER_INFO').email
    })
    if (!this.$utils.isEmptyObject(data)) {
      this.form = data
      this.isAdd = false
    }
  }
  authentication (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        let vuex = this.isAdd ? 'saveAuthentication' : 'updateAuthentication'
        const { data } = await this.$store.dispatch(vuex, {
          ...this.form,
        })
        if (data) {
          this.$notify({
            type: 'success',
            title: '提示',
            message: this.isAdd ? '添加成功' : '修改成功'
          })
          this.dialogVisible = false
          this.$emit('refresh')
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
  handleClose () {
    this.$emit('refresh')
    this.dialogVisible = false
  }
  photoUrlEvent (url) {
    this.form.material = url
  }
}
</script>

<style lang="scss" scoped>
  .my_form {
  /deep/ .el-form .el-form-item {
    flex: 0 1 60%;
  }
  }
</style>
