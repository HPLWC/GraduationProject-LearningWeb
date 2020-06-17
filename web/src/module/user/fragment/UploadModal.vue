<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <div class="my_form">
      <el-form ref="form" :rules="rules" :model="form" :inline="false" label-width="120px" class="m-l-20 m-t-20">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类型" class="m-t-15" prop="type_id">
          <el-select v-model="form.type_id" filterable placeholder="请选择">
            <el-option
              v-for="item in courseTypeOptions"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" class="m-t-15" prop="decoration">
          <el-input type="textarea" v-model="form.decoration"></el-input>
        </el-form-item>
        <el-form-item label="封面" class="m-t-15" prop="photo">
          <hpc-upload :imageUrl="form.photo" @photoUrlEvent="photoUrlEvent" :isCir="false"></hpc-upload>
        </el-form-item>
        <el-form-item class="m-t-15">
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

export default @Component({})
class UploadModal extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  dialogVisible = false
  courseTypeOptions = []

  form = {}
  rules = {
    title: [
      { required: true, message: '请输入标题', trigger: 'change' },
    ],
    type_id: [
      { required: true, message: '请选择种类', trigger: 'change' },
    ],
    decoration: [
      { required: true, message: '请输入简介', trigger: 'change' },
    ],
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  async created () {
    this.courseTypeOptions = await this.getAllType()
  }
  /* vue-method */
  async getAllType () {
    const { data } = await this.$store.dispatch('getCourseAllNameType')
    return data || []
  }
  handleClose () {
    this.$emit('refresh')
    this.dialogVisible = false
  }
  photoUrlEvent (value) {
    this.form.photo = value
  }

  submitForm (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        const { data } = await this.$store.dispatch('saveCourseInfo', {
          ...this.form,
          user_id: this.$ls.getObj('USER_INFO').id,
        })
        if (data) {
          this.$notify({
            type: 'success',
            title: '提示',
            message: '添加成功'
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
}
</script>

<style lang="scss" scoped>
  .my_form {
    /deep/ .el-form .el-form-item {
      flex: 0 1 60%;
    }
  }
</style>
