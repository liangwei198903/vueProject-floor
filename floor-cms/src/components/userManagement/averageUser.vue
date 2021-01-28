<template>
  <div class="user">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>
            <el-input
              style="width: 300px"
              v-model="searchValue"
              placeholder="请输入关键字"
              @input="handleSearch"
            ></el-input>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </span>
        </div>
        <div class="text item">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="用户编号"> </el-table-column>
            <el-table-column prop="username" label="用户名"> </el-table-column>
            <el-table-column prop="isOnline" label="是否允许登录">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isOnline"
                  active-color="#13ce66"
                  active-value
                  inactive-color="#ff4949"
                  @change="handleChange(scope.row)"
                  :disabled="scope.row.username == 'root' ? true : false"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="permissions" label="权限">
              <template slot-scope="scope">
                <span>
                  {{ scope.row.permissions == 0 ? "普通用户" : "超级管理员" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="superPassword" label="超级密码">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="修改用户信息"
                  placement="top"
                >
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    circle
                    :disabled="scope.row.username == 'root' ? true : false"
                    @click="showModifyInformation(scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除用户"
                  placement="top"
                >
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    circle
                    @click="deleteUser(scope.row)"
                    :disabled="scope.row.username == 'root' ? true : false"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[3, 5, 10, 20]"
              :page-size="size"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <div class="my-dialog">
      <!-- 修改信息的窗口 -->
      <el-dialog title="修改信息" :visible.sync="modifyInformation" width="30%">
        <div class="modifyInformation-box">
          <el-form
            label-position="top"
            label-width="80px"
            :model="modifyInformationFrom"
          >
            <el-form-item label="id">
              <el-input
                v-model="modifyInformationFrom.id"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="modifyInformationFrom.username"></el-input>
            </el-form-item>
            <el-form-item label="是否允许登录">
              <el-switch
                v-model="modifyInformationFrom.isOnline"
                active-color="#13ce66"
                active-value
                inactive-color="#ff4949"
                :disabled="
                  modifyInformationFrom.username == 'root' ? true : false
                "
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="超级密码">
              <el-input
                type="password"
                v-model="modifyInformationFrom.superPassword"
                maxlength="6"
                minlength="6"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeModifyInformation">取 消</el-button>
          <el-button type="primary" @click="submitModifyInformationFrom"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

 <script>
import {
  getAllUser,
  changeOnline,
  changeUserData,
  getUserByKeyWord,
  deleteUser,
} from "../../server/userManagement";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      size: 3,
      modifyInformation: false,
      modifyInformationFrom: {
        id: 0,
        username: "",
        isOnline: false,
      },
      baseModifyInformationFrom: {
        id: 0,
        username: "",
        isOnline: false,
      },
      searchValue: "",
    };
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.getUserData(val, this.currentPage);
    },
    handleCurrentChange(val) {
      this.getUserData(this.size, val);
      this.currentPage = val;
    },
    async getUserData(size, currentPage) {
      const res = await getAllUser(size, currentPage);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.$message({
          message: "数据获取成功",
          type: "success",
        });
        this.tableData.forEach((item) => {
          if (item.isOnline == 1) {
            item.isOnline = true;
          } else {
            item.isOnline = false;
          }
        });
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    async handleChange(val) {
      console.log(val);
      let id = val.id;
      let status = val.isOnline;
      const res = await changeOnline(id, status);
      if (res.code == 200) {
        this.$message({
          message: "状态更改成功",
          type: "success",
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
      this.getUserData(this.size, this.currentPage);
    },
    showModifyInformation(val) {
      this.modifyInformation = true;
      this.modifyInformationFrom = val;
    },
    closeModifyInformation() {
      this.modifyInformationFrom = this.baseModifyInformationFrom;
      this.modifyInformation = false;
    },
    async submitModifyInformationFrom() {
      console.log(this.modifyInformationFrom);
      let id = this.modifyInformationFrom.id;
      let username = this.modifyInformationFrom.username;
      let isOline = this.modifyInformationFrom.isOnline;
      let superPassword = this.modifyInformationFrom.superPassword;
      const res = await changeUserData(id, username, isOline, superPassword);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
      this.closeModifyInformation();
    },
    async handleSearch() {
      let keyword = this.searchValue;
      if (keyword.trim() == "") {
        this.getUserData(this.size, this.currentPage);
        return;
      } else {
        let res = await getUserByKeyWord(keyword, this.size, this.currentPage);
        if (res.code == 200) {
          this.tableData = res.data.data;
          this.tableData.forEach((item) => {
            if (item.isOnline == 1) {
              item.isOnline = true;
            } else {
              item.isOnline = false;
            }
          });
          this.total = res.data.total;
          this.$message({
            message: "数据获取成功",
            type: "success",
          });
        }
        if (res.code == 400) {
          this.tableData = res.data.data;
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      }
    },
    deleteUser(val) {
      let id = val.id;
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteUser(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          if (res.code == 400) {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
          this.getUserData(this.size, this.currentPage);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getUserData(this.size, this.currentPage);
  },
};
</script>

<style lang="scss" scoped>
.user {
  .card {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 20px;
  }
  .my-dialog {
    .modifyInformation-box {
      .el-form-item {
        margin-bottom: 12px;
      }
    }
  }
}
</style>