<template>
  <div class="comments-management">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ goodName }}评论列表</span>
        </div>
        <div>
          <el-table :data="commentsData" style="width: 100%">
            <el-table-column prop="id" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="uid" label="用户Id" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户" width="180">
            </el-table-column>
            <el-table-column prop="comments_content" label="评论内容">
            </el-table-column>
            <el-table-column label="操作" width="280">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="修改评论内容"
                  placement="top"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="editcomments(scope.row)"
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除该条评论内容"
                  placement="top"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteComments(scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <el-dialog title="修改评论内容" :visible.sync="dialogVisible" width="30%">
        <div>
          <el-input type="textarea" v-model="comment" rows="7"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeComments">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getComments,
  getGoodsDetails,
  changeComments,
  deleteComment,
} from "../../server/goodsManagement";
export default {
  data() {
    return {
      commentsData: [],
      goodName: "",
      dialogVisible: false,
      comment: "",
      cid: "",
    };
  },
  methods: {
    async getComments() {
      let id = this.$route.params.id;
      const res = await getComments(id);
      if (res.code == 200) {
        this.commentsData = res.data;
        this.$message({
          message: "数据获取成功",
          type: "success",
        });
      }
      if (res.code == 400) {
        this.$message({
          message: "数据获取失败",
          type: "error",
        });
      }
    },
    async getGoodsDetails() {
      let id = this.$route.params.id;
      const res = await getGoodsDetails(id);
      if (res.code == 200) {
        this.goodName = res.data.name;
      }
      if (res.code == 400) {
        this.$message({
          message: "数据获取失败",
          type: "error",
        });
      }
    },
    editcomments(val) {
      this.dialogVisible = true;
      this.comment = val.comments_content;
      this.cid = val.id;
    },
    async changeComments() {
      let id = this.cid;
      let comment = this.comment;
      const res = await changeComments(id, comment);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.dialogVisible = false;
        this.getComments();
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    deleteComments(val) {
      let id = val.id;
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteComment(id);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getComments();
          }
          if (res.code == 400) {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
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
    this.getComments();
    this.getGoodsDetails();
  },
};
</script>

<style lang="scss" scoped>
.comments-management {
  .card {
    margin-top: 20px;
  }
}
</style>