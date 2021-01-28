<template>
  <div class="swiper-management">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>首页管理</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>轮播图列表</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="addSwiper"
            >去添加</el-button
          >
        </div>
        <div class="table">
          <el-table :data="bannerData" style="width: 100%">
            <el-table-column prop="id" label="轮播图编号" > </el-table-column>
            <el-table-column prop="src" label="详情" align='center'>
              <template slot-scope="scope">
                <img :src="scope.row.src" alt="" style="width: 400px" />
              </template>
            </el-table-column>
            <el-table-column label="操作" align='center'>
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="deleteImg(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getBanner, deleteSwiper } from "../../server/homeSwiper";
import { serverIndex } from "../../server/serverIndex";
export default {
  data() {
    return {
      bannerData: [],
    };
  },
  methods: {
    addSwiper() {
      this.$router.push({ name: "uploadSwiper" });
    },
    async getBanner() {
      const res = await getBanner();
      if (res.code == 200) {
        this.bannerData = res.data;
        this.bannerData.forEach((item) => {
          item.src = serverIndex + item.src;
        });
        this.$message({
          message: "获取成功",
          type: "success",
        });
      }
    },
    deleteImg(val) {
      let id = val.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res =await deleteSwiper(id);
          if (res.code == 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.getBanner();
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
    this.getBanner();
  },
};
</script>

<style lang="scss" scoped>
.swiper-management {
  .card {
    margin-top: 20px;
  }
}
</style>