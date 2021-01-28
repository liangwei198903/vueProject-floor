<template>
  <div class="information-list">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资讯设置</el-breadcrumb-item>
        <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>选取类别：</span>
          <el-select
            v-model="selected"
            placeholder="请选择"
            @change="selectChange"
          >
            <el-option
              v-for="item in NavList"
              :key="item.catid"
              :label="item.name"
              :value="item.catid"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-table :data="informationData" style="width: 100%">
            <el-table-column prop="id" label="编号"> </el-table-column>
            <el-table-column prop="title" label="文章标题" align="center">
            </el-table-column>
            <el-table-column prop="tag_name" label="副标题" align="center">
            </el-table-column>
            <el-table-column prop="title_text" label="文章简介" align="center">
            </el-table-column>
            <el-table-column
              prop="title_img"
              label="标题图片地址"
              align="center"
            >
              <template slot-scope="scope">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.title_img"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="创建时间" align="center">
            </el-table-column>
            <el-table-column
              prop="viewed_count"
              label="阅读数量"
              align="center"
            >
            </el-table-column>
            <el-table-column label="文章详情" align="center">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-search"
                  circle
                  @click="view(scope.row)"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="修改"
                  placement="top"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="modifyContent(scope.row)"
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除"
                  placement="top"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteArticle(scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="3"
              background
              :page-sizes="[3, 5, 10, 20]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              class="my-pagination"
            >
            </el-pagination>
        </div>
      </el-card>
    </div>
    <!--  对话框 -->
    <div class="dialog">
      <!-- 查看文章详情 -->
      <el-dialog
        :title="currentArticle.title"
        :visible.sync="viewArticle"
        width="40%"
      >
        <div>
          <img :src="serverIndex + currentArticle.title_img" alt="" />
          <div v-html="currentArticle.details"></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="viewArticle = false">取 消</el-button>
          <el-button type="primary" @click="viewArticle = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { serverIndex } from "../../server/serverIndex";
import {
  getNav,
  getAllInformation,
  deleteArticle,
} from "../../server/information";
export default {
  data() {
    return {
      NavList: [],
      selected: "",
      informationData: [],
      total: 0,
      currentPage: 1,
      size: 3,
      viewArticle: false,
      currentArticle: {},
      serverIndex: "",
    };
  },
  methods: {
    async getNav() {
      const res = await getNav();

      if (res.code == 200) {
        this.NavList = res.data;
        this.NavList.unshift({ catid: 0, name: "全部" });
      }
    },
    async getAllInformation(catid, size, currentPage) {
      const res = await getAllInformation(catid, size, currentPage);
      if (res.code == 200) {
        this.informationData = res.data;
        this.informationData.forEach((item) => {
          item.title_img = serverIndex + item.title_img;
        });
        this.size = res.size;
        this.total = res.total;
        this.$message({
          message: "获取数据成功",
          type: "success",
        });
      } else {
        this.$message.error("获取数据失败");
      }
    },
    selectChange() {
      this.getAllInformation(this.selected);
    },
    view(val) {
      console.log(val);
      this.currentArticle = val;
      this.viewArticle = true;
    },
    handleSizeChange(val) {
      let catid = this.selected;
      this.size = val;
      this.getAllInformation(catid, this.size, this.currentPage);
    },
    handleCurrentChange(val) {
      let catid = this.selected;
      this.currentPage = val;
      this.getAllInformation(catid, this.size, this.currentPage);
    },
    // 去修改文章页面
    modifyContent(val) {
      this.$router.push({ name: "modifyContent", params: { id: val.id } });
    },
    deleteArticle(val) {
      let id = val.id;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteArticle(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
          let catid = 0;
          this.getAllInformation(catid);
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
    this.serverIndex = serverIndex;
    this.getNav();
    let catid = 0;
    this.getAllInformation(catid);
  },
};
</script>

<style lang="scss" scoped>
.information-list {
  .card {
    margin-top: 20px;
  }
  .my-pagination{
    margin-top: 20px;
  }
}
</style>