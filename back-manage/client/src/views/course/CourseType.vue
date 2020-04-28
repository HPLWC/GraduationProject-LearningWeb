<template>
  <div class="staff">
    <div class="staff-top">
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-button type="primary" size ="small" icon="el-icon-edit-outline" @click='onAddMoney()'>添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tables">
      <el-table
          :data="userData"
          border
          style="width: 100%">
        <el-table-column
            label="标题"
            align="center"
            width="250">
          <template slot-scope="scope">
<!--            <i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="描述"
            align="center"
            width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.decoration }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="创建时间"
            align="center"
            width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.addTime | moment }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="修改时间"
            align="center"
            width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updateTime | moment  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginations.pageIndex"
          :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize"
          :layout="paginations.layout"
          :total="paginations.total">
      </el-pagination>
    </div>
    <UserDialong :dialong="dialong" :form="form" @UserData="userInfo"></UserDialong>
  </div>
</template>

<script>
// @ is an alias to /src
import UserDialong from "../../components/UserDialong";
export default {
  name: "Staff",
  data() {
    return {
      userData: [], //数据存储
      dialong: {
        //弹出框
        show: false,
        title: "",
        option: "edit"
      },
      form: {   //添加和删除需要传递的字段名
        title: "",
        decoration: ""
      },
      paginations:{
        pageIndex:1, //当前页
        total:0, //总数
        pageSize:5, //一页显示多少
        pageSizes:[5,10,15,20], //每页显示多少条
        layout:'total, sizes, prev, pager, next, jumper'
      },
    };
  },
  methods: {
    userInfo() {
      let url = `/api/course/type/all?pageNum=${this.paginations.pageIndex}&pageSize=${this.paginations.pageSize}`
      this.$axios.get(url).then(res => {
        console.log(res)
        this.userData = res.data.data.data;
        this.paginations.total = res.data.data.total;
      }).catch(err => console.log(err));
    },
    handleEdit(index, row) {
      console.log(row)
      //编辑
      this.dialong = {
        title: "编辑信息",
        show: true,
        option:"edit"
      }
      this.form = {
        title: row.title,
        decoration: row.decoration,
        id: row.id,
        photo: row.photo
      }
    },
    handleDelete(index, row) {
      //删除数据
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: `/api/course/type/delete`,
            method: 'delete',
            data: { id: row.id }
          }).then(res => {
            console.log(res)
            if(res.data.success) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.userInfo();
            } else {
              this.$message({
                type: "error",
                message: res.data.data.message
              });
            }

          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onAddMoney() {
      //添加内容
      this.dialong = {
        title: "添加信息",
        show: true,
        option:"add"
      }
      this.form = {
        name: "",
        sex: "",
        state: "",
        hobby: "",
        marriage: "",
        birthday: "",
        address: ""
      }
    },
    handleSizeChange(val) {
      this.paginations.pageSize = val
      this.paginations.pageIndex = 1
      this.userInfo()
    },
    handleCurrentChange(val) {
      this.paginations.pageIndex = val
      this.userInfo()
    },

  },
  created() {
    this.userInfo();
  },
  components: {
    UserDialong
  }
}
</script>
<style scoped>
  .staff {
    margin: 10px;
  }
  .btnRight {
    float: right;
  }
  .page {
    float: right;
    margin-top: 20px;
  }
</style>
