<template>
  <div class="nofind">
    <el-dialog
      :title="dialong.title"
      type="primary"
      size="small"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :visible.sync="dialong.show"
    >
      <el-form :model="form" ref="formdoalog" :rules="formdialog" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="decoration">
          <el-input type="textarea" v-model="form.decoration"></el-input>
        </el-form-item>
        <el-form-item label="上传" prop="photo">
<!--          <el-input v-model="form.decoration"></el-input>-->
          <uplolad :imageUrl="form.photo" @photoUrlEvent="photoUrlEvent" :isCir="false"></uplolad>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialong.show = false">取 消</el-button>
        <el-button type="primary" @click="addHandle('formdoalog')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Uplolad from './Uplolad'
// @ is an alias to /src
export default {
  name: "UserDialong",
  data() {
    return {
      formdialog: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        decoration: [{ required: true, message: "描述不能为空", trigger: "blur" }]
      }
    };
  },
  props: {
    dialong: Object,
    form: Object
  },
  methods: {
    photoUrlEvent (value) {
      this.form.photo = value
    },
    addHandle(formdoalog) {
      this.$refs[formdoalog].validate(valid => {
        if (valid) {
          // console.log(this.form)
          let url = this.dialong.option === "add" ? 'course/type/save' : `/course/type/update`;

          if(this.dialong.option === 'add') {
            this.$axios.post(`/api/${url}`, this.form).then(res => {
              this.$message({
                type: "success",
                message: "数据添加成功"
              })
              this.dialong.show = false;
              this.$emit("UserData");
              //清空内容
              this.form = "";
            });
          } else {
            console.log(this.form)
            this.$axios.put(`/api/${url}`, this.form).then(res => {
              this.$message({
                type: "success",
                message: "数据修改成功"
              })
              this.dialong.show = false;
              this.$emit("UserData");
              //清空内容
              this.form = "";
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    Uplolad
  }
};
</script>
<style scoped>
</style>
