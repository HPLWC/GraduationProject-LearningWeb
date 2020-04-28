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
        <el-button type="primary">
          <slot>上传文件</slot>
        </el-button>
        <p>{{ photo }}</p>
      </template>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'Uplolad',
    props: {
      imageUrl: {type: String, default: ''},
      isCir: {type: Boolean, default: true},
      isUploadPhoto: {type: Boolean, default: true},
    },
    data () {
      return {
        photo: ''
      }
    },
    watch: {
      imageUrl: {
        handler: function (newV, oldV) {
          this.photo = newV
          this.$emit('photoUrlEvent', this.photo)
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw)
      },
      async uploadImg (file) {
        let formData = new FormData()
        let upload = await file
        formData.append('typeOption', 'upload_image')
        formData.append('upload', upload)
        const data = await this.$axios.post(`/api/image/upload`, formData).then(res => {
          return res.data.data
        })
        // data.default = process.env.VUE_APP_BASE_URL + data.default

        let baseUrl = 'http://127.0.0.1:3000'
        data.default = baseUrl + '/' + data.default
        return { data }
      },

      async uploadSection (file) {
        let formData = new FormData()
        let upload = await file
        formData.append('typeOption', 'upload_section')
        formData.append('upload', upload)
        const data = await this.$axios.post(`/api/section/upload`, formData).then(res => {
          return res.data.data
        })
        // data.default = process.env.VUE_APP_BASE_URL + data.default

        let baseUrl = 'http://127.0.0.1:3000'
        data.default = baseUrl + '/' + data.default
        return { data }
      },

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
      },
      async uploadEvent (param) {
        const { data } = this.isUploadPhoto ? await this.uploadImg(param.file) : await uploadSection(params.file)
        if (data) {
          this.imageUrl = data.default
        }
      }
    }
  }
</script>

<style scoped>
  .upload_img >>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    /*border-radius: 50%;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .upload_img >>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .upload_img >>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .upload_img >>> .avatar {
    /*border-radius: 50%;*/
    width: 178px;
    height: 178px;
    display: block;
  }

  .border-rad >>> .avatar-uploader .el-upload {
    border-radius: 50%;
  }
  .border-rad >>> .avatar {
    border-radius: 50%;
  }
</style>