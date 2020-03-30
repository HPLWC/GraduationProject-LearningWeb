<template>
  <div class="upload_img">
    <el-upload
    class="avatar-uploader"
    action="/"
    :http-request="uploadImgEvent"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
      <img v-if="photo" :src="photo" class="avatar">
<!--      <hpc-icon v-else name="defaultuser" :size="100" class="m-t-2 o-8"></hpc-icon>-->
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'

export default @Component
class HpcIcon extends Vue {
  /* vue-props */
  @Prop({type: String, default: ''}) imageUrl
  /* vue-vuex */
  /* vue-data */
  photo = ''
  /* vue-compute */
  /* vue-watch */
  @Watch('imageUrl', { immediate: true })
  changeEvent (newV) {
    this.photo = newV
    this.$emit('photoUrlEvent', this.photo)
  }
  /* vue-lifecycle */
  /* vue-method */
  handleAvatarSuccess (res, file) {
    // this.imageUrl = URL.createObjectURL(file.raw)
  }
  beforeAvatarUpload (file) {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
  }
  async uploadImgEvent (param) {
    console.log(param)
    const { data } = await this.$store.dispatch('uploadImg', param.file)
    console.log(data)
    if (data) {
      this.imageUrl = data.default
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload_img /deep/ {
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      border-radius: 50%;
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
