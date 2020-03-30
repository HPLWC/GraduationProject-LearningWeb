<!-- 个人中心页面 -->
<template>
  <div class="user_center">
    <div data-flex="main:center cross:top" class="a-c m-t-20 a-l">
      <div>
        <hpc-upload :imageUrl="form.photo" @photoUrlEvent="photoUrlEvent"></hpc-upload>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="120px" class="m-l-40 m-t-20" :style="{ width: '60%' }">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" class="m-t-15" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="未知"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" class="m-t-15" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="m-t-15" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" class="m-t-15" prop="decoration">
          <el-input type="textarea" v-model="form.decoration"></el-input>
        </el-form-item>
        <el-form-item label="评价" class="m-t-15" prop="common">
          <el-input type="textarea" v-model="form.common"></el-input>
        </el-form-item>
        <el-form-item class="m-t-15">
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
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
  photoUrl = ''

  data () {
    let isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入电话号码')
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        const isPhone = reg.test(value)
        value = Number(value) // 转换为数字
        if (typeof value === 'number' && !isNaN(value)) { // 判断是否为数字
          value = value.toString() // 转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) { // 判断是否为11位手机号
            callback(new Error('手机号码格式如:138xxxx8754'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入电话号码'))
        }
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'change' },
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' },
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'change' },
          { validator: isMobileNumber, trigger: 'change' }
        ],
        email: [
          { type: 'email', required: true, message: '请填写正确格式', trigger: 'change' }
        ],
      }
    }
  }
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.form = this.$ls.getObj('USER_INFO')
  }
  /* vue-method */
  submitForm (formName) {
    this.$refs[formName].validate(async (valid) => {
      if (valid) {
        const { data } = await this.$store.dispatch('updateUserInfo', {
          ...this.form,
          photo: this.photoUrl
        })
        if (data) {
          this.$store.commit('SET_USER_INFO', data)
          this.form = this.$ls.getObj('USER_INFO')
          this.$notify({
            type: 'success',
            title: '提示',
            message: '修改成功'
          })
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
  photoUrlEvent (url) {
    this.photoUrl = url
    this.form.photo = url
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 85px;
    height: 85px;
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
