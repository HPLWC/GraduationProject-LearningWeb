<template>
  <div :class="{ 'upload_img': isUploadPhoto, 'border-rad': isCir && isUploadPhoto }">
    <el-upload
    class="avatar-uploader"
    action="/"
    :http-request="uploadEvent"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
      <template v-if="isUploadPhoto">
        <img v-if="photo" :src="photo" class="avatar">
<!--      <hpc-icon v-else name="defaultuser" :size="100" class="m-t-2 o-8"></hpc-icon>-->
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </template>

      <template v-else>
        <el-button type="primary">上传视频</el-button>
        <p>{{ photo }}</p>
      </template>
    </el-upload>
  </div>
</template>

<script>
import {Component, Prop, Watch, Vue} from 'vue-property-decorator'

export default @Component
class HpcUpload extends Vue {
  /* vue-props */
  @Prop({type: String, default: ''}) imageUrl
  @Prop({type: Boolean, default: true}) isCir
  @Prop({type: Boolean, default: true}) isUploadPhoto
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

    const isMp4 = file.type === 'video/mp4'

    if (this.isUploadPhoto) {
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    } else {
      if (!isMp4) {
        this.$message.error('上传视频只能是 mp4 格式!')
      }
      return isMp4
    }
  }
  async uploadEvent (param) {
    let vuex = this.isUploadPhoto ? 'uploadImg' : 'uploadSection'
    const { data } = await this.$store.dispatch(vuex, param.file)
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
      /*border-radius: 50%;*/
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
      /*border-radius: 50%;*/
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .border-rad /deep/ {
    .avatar-uploader .el-upload {
      border-radius: 50%;
    }
    .avatar {
      border-radius: 50%;
    }
  }
</style>
