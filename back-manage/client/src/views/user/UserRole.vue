<template>
  <div class="staff">
    <div class="staff-top">
      <el-form :inline="true">
        <el-form-item class="btnRight">
<!--          <el-button type="primary" size ="small" icon="el-icon-edit-outline" @click='onAddMoney()'>添加</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="tables">
      <el-table
          :data="userData"
          border
          style="width: 100%">
        <el-table-column
            label="用户名"
            align="center"
            width="250">
          <template slot-scope="scope">
            <!--            <i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.user && scope.row.user.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="权限"
            align="center"
            width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.user && scope.row.user.role }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="姓名"
            align="center"
            width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="学校"
            align="center"
            width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.school }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="资料"
            align="center"
            width="200">
          <template slot-scope="scope">
            <a style="margin-left: 10px" :href="scope.row.material">{{ scope.row.material }}</a>
          </template>
        </el-table-column>
        <el-table-column
            label="状态"
            align="center"
            width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ statusType(scope.row.status) }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="创建时间"
            align="center"
            width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.addTime | moment }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="修改时间"
            align="center"
            width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.updateTime | moment  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.status===0">
              <el-button
                  size="mini"
                  type="success"
                  @click="handleDelete(1, scope.row)">通过</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(2, scope.row)">拒绝</el-button>
            </template>
<!--            <template v-else>-->
<!--              <el-button-->
<!--                  size="mini"-->
<!--                  type="danger"-->
<!--                  @click="handleDelete(scope.$index, scope.row)">{{ statusTypeBtn(scope.row.status) }}</el-button>-->
<!--            </template>-->
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
<!--    <UserDialong :dialong="dialong" :form="form" @UserData="userInfo"></UserDialong>-->
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
        let url = `/api/user/authentication/all?pageNum=${this.paginations.pageIndex}&pageSize=${this.paginations.pageSize}`
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
        //停用启用数据
        this.$axios({
          url: `/api/user/admin/authentication/update`,
          method: 'put',
          data: {
            id: row.id,
            user_id: row.user.id,
            status: index
          }
        }).then(res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.userInfo();
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

      statusType(status) {
        switch (status) {
          case 0:
            return '申请中'
          case 1:
            return '成功'
          case 2:
            return '拒绝'
          default:
            return ''
        }
      },
      statusTypeBtn(status) {
        switch (status) {
          case 0:
            return '申请中'
          case 1:
            return '成功'
          case 2:
            return '拒绝'
          default:
            return ''
        }
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
