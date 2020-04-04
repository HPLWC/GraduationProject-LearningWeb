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
        <el-form-item label="简介" class="m-t-15" prop="decoration">
          <el-input type="textarea" v-model="form.decoration"></el-input>
        </el-form-item>
        <el-form-item label="排序" class="m-t-15" prop="section_num">
          <el-input-number type="textarea" v-model="form.section_num"></el-input-number>
        </el-form-item>
        <el-form-item label="视频" class="m-t-15" prop="video">
          <hpc-upload :imageUrl="form.video" @photoUrlEvent="photoUrlEvent" :isUploadPhoto="false"></hpc-upload>
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
class UploadSectionModal extends Vue {
  /* vue-props */
  /* vue-vuex */
  /* vue-data */
  dialogVisible = false

  form = {
    section_num: 1
  }
  rules = {
    title: [
      { required: true, message: '请输入标题', trigger: 'change' },
    ],
    decoration: [
      { required: true, message: '请输入简介', trigger: 'change' },
    ],
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  /* vue-method */
  submitForm (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        console.log({...this.form}, 2333)
        const { data } = await this.$store.dispatch('saveCourseSection', {
          ...this.form,
          course_info_id: this.$route.query.id
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

  handleClose () {
    this.dialogVisible = false
  }
  photoUrlEvent (url) {
    this.form.video = url
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
