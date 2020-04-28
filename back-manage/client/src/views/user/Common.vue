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
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="用户姓名"
            align="center"
            width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userInfo && scope.row.userInfo.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="是否启用评论"
            align="center"
            width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.is_used_comment ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="评论"
            align="center"
            width="500">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userInfo && scope.row.userInfo.common }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <!--            <el-button-->
            <!--                size="mini"-->
            <!--                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button
                size="mini"
                :type="scope.row.is_used_comment ? 'danger': 'primary'"
                v-if="scope.row.role !== 0"
                @click="handleDelete(scope.$index, scope.row)">{{ scope.row.is_used_comment ? '不显示' : '显示' }}</el-button>
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
import UserDialong from '../../components/UserDialong'
export default {
  name: 'Common',
  data () {
    return {
      userData: [], // 数据存储
      dialong: {
        // 弹出框
        show: false,
        title: '',
        option: 'edit'
      },
      form: { // 添加和删除需要传递的字段名
        title: '',
        decoration: ''
      },
      paginations: {
        pageIndex: 1, // 当前页
        total: 0, // 总数
        pageSize: 5, // 一页显示多少
        pageSizes: [5, 10, 15, 20], // 每页显示多少条
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
  },
  methods: {
    userInfo () {
      let url = `/api/user/info/all?pageNum=${this.paginations.pageIndex}&pageSize=${this.paginations.pageSize}`
      this.$axios.get(url).then(res => {
        console.log(res)
        this.userData = res.data.data.data
        this.paginations.total = res.data.data.total
      }).catch(err => console.log(err))
    },
    handleEdit (index, row) {
      console.log(row)
      // 编辑
      this.dialong = {
        title: '编辑信息',
        show: true,
        option: 'edit'
      }
      this.form = {
        title: row.title,
        decoration: row.decoration,
        id: row.id,
        photo: row.photo
      }
    },
    handleDelete (index, row) {
      // 停用启用数据
      row.is_used_comment = 1 - row.is_used_comment
      this.$axios({
        url: `/api/user/admin/info/update`,
        method: 'post',
        data: {
          email: row.username,
          is_used_comment: row.is_used_comment
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.userInfo()
      })
    },
    onAddMoney () {
      // 添加内容
      this.dialong = {
        title: '添加信息',
        show: true,
        option: 'add'
      }
      this.form = {
        name: '',
        sex: '',
        state: '',
        hobby: '',
        marriage: '',
        birthday: '',
        address: ''
      }
    },
    handleSizeChange (val) {
      this.paginations.pageSize = val
      this.paginations.pageIndex = 1
      this.userInfo()
    },
    handleCurrentChange (val) {
      this.paginations.pageIndex = val
      this.userInfo()
    }

  },
  created () {
    this.userInfo()
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
