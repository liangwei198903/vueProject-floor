<template>
  <div class="goods-management">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>搜索商品：</span>
          <el-input
            v-model="keyword"
            placeholder="请输入内容"
            class="search-input"
            @input="search"
          ></el-input>

          <span class="select"> 选择分类 : </span>
          <span>
            <el-select
              v-model="select"
              @change="selectChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in goodTypeArr"
                :key="item.good_type_id"
                :label="item.type_name"
                :value="item.good_type_id"
              >
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="list">
          <el-table :data="tableData" v-loading="loading" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称:">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="商品现价:">
                    <span>{{ props.row.price }}</span>
                  </el-form-item>
                  <el-form-item label="商品原价:">
                    <span>{{ props.row.original_price }}</span>
                  </el-form-item>
                  <el-form-item label="商品标题图片:"> </el-form-item>
                  <img :src="props.row.src" alt="" class="title-img" />
                  <el-form-item label="描述:">
                    <span>{{ props.row.material }}</span>
                  </el-form-item>
                  <el-form-item label="包装:">
                    <span>{{ props.row.packaging }}</span>
                  </el-form-item>
                  <el-form-item label="配送:">
                    <span>{{ props.row.distribution }}</span>
                  </el-form-item>
                  <el-form-item label="附送:">
                    <span>{{ props.row.attached }}</span>
                  </el-form-item>
                  <el-form-item label="适合场景:"> </el-form-item>
                  <div>
                    <el-tag
                      v-for="(item, index) in props.row.suitable_scene"
                      :key="index"
                      class="my-tag"
                      type="success"
                      >{{ item | getSuitableName }}</el-tag
                    >
                  </div>
                  <el-form-item label="商品轮播图:"> </el-form-item>
                  <div>
                    <el-image
                      style="width: 150px; height: 150px"
                      :src="props.row.goodsSwiperArr[0]"
                      :preview-src-list="props.row.goodsSwiperArr"
                      lazy
                    >
                    </el-image>
                  </div>
                  <el-form-item label="商品详情介绍图:"> </el-form-item>
                  <div>
                    <el-image
                      style="width: 150px; height: 150px"
                      :src="props.row.goodsDetailsImgArr[0]"
                      :preview-src-list="props.row.goodsDetailsImgArr"
                      lazy
                    >
                    </el-image>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="商品 ID" prop="id" align="center">
            </el-table-column>
            <el-table-column label="商品名称" prop="name" align="center">
            </el-table-column>
            <el-table-column label="商品价格" prop="price" align="center">
            </el-table-column>
            <el-table-column label="描述" prop="material"> </el-table-column>
            <el-table-column label="售量" prop="sales" align="center">
            </el-table-column>
            <el-table-column label="首页显示">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isIndexShow"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeIndexShow(scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="编辑商品"
                  placement="bottom"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    circle
                    @click="modifyGoods(scope.row.id)"
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除商品"
                  placement="bottom"
                >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteGoods(scope.row.id)"
                  ></el-button>
                </el-tooltip>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="查看商品评论"
                  placement="bottom"
                >
                  <el-button
                    @click="goCommentsManagement(scope.row.id)"
                    type="info"
                    icon="el-icon-search"
                    circle
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="my-pagination"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { serverIndex } from "../../server/serverIndex";
import {
  getGoodsByLimit,
  gootdType,
  changeIsindexShow,
  getGoodsByKeyword,
  getGoodsBySelect,
  deleteGoods,
  getGoodsSuitableScene
} from "../../server/goodsManagement";
let self;
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      size: 10,
      keyword: "",
      goodTypeArr: [],
      typeNameArr: [],
      loading: false,
      select: "",
      suitable_sceneArr:[]
    };
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.judgmentWay();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.judgmentWay();
    },
    async getGoodsByLimit(size, currentPage) {
      this.loading = !this.loading;
      const res = await getGoodsByLimit(size, currentPage);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach((item) => {
          item.suitable_scene = item.suitable_scene.split(",");
          item.src = serverIndex + item.src;
          item.goodsSwiperArr = item.goodsSwiperArr.split(",");
          item.goodsSwiperArr.forEach((i, index) => {
            item.goodsSwiperArr[index] =
              serverIndex + item.goodsSwiperArr[index];
          });
          item.goodsDetailsImgArr = item.goodsDetailsImgArr.split(",");
          item.goodsDetailsImgArr.forEach((item2, index) => {
            item.goodsDetailsImgArr[index] =
              serverIndex + item.goodsDetailsImgArr[index];
          });
          if (item.isIndexShow == 0) {
            item.isIndexShow = false;
          }
          if (item.isIndexShow == 1) {
            item.isIndexShow = true;
          }
        });
        this.loading = !this.loading;
        this.$message({
          message: "数据获取成功",
          type: "success",
        });
        console.log(this.tableData);
      }
      if (res.code == 400) {
        this.loading = !this.loading;
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    async getGootdType() {
      const res = await gootdType();
      if (res.code == 200) {
        this.goodTypeArr = res.data;
        this.goodTypeArr.unshift({
          good_type_id: 0,
          type_name: "全部",
        });
        this.goodTypeArr.forEach((item) => {
          this.typeNameArr.push(item.type_name);
        });
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
      console.log(this.goodTypeArr);
      console.log(this.typeNameArr);
    },
    async changeIndexShow(val) {
      console.log(val);
      let id = val.id;
      let status = val.isIndexShow;
      const res = await changeIsindexShow(id, status);
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getGoodsByLimit(this.size, this.currentPage);
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    // 前往修改页
    modifyGoods(id) {
      this.$router.push({ name: "modifyGoods", params: { id } });
    },
    // 搜索框inpu事件
    async search() {
      this.loading = !this.loading;
      this.select = "";
      if (this.keyword.trim() == "") {
        this.loading = !this.loading;
        this.getGoodsByLimit(this.size, this.currentPage);
        return;
      }
      const res = await getGoodsByKeyword(
        this.keyword,
        this.size,
        this.currentPage
      );
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach((item) => {
          item.suitable_scene = item.suitable_scene.split(",");
          item.src = serverIndex + item.src;
          item.goodsSwiperArr = item.goodsSwiperArr.split(",");
          item.goodsSwiperArr.forEach((i, index) => {
            item.goodsSwiperArr[index] =
              serverIndex + item.goodsSwiperArr[index];
          });
          item.goodsDetailsImgArr = item.goodsDetailsImgArr.split(",");
          item.goodsDetailsImgArr.forEach((item2, index) => {
            item.goodsDetailsImgArr[index] =
              serverIndex + item.goodsDetailsImgArr[index];
          });
          if (item.isIndexShow == 0) {
            item.isIndexShow = false;
          }
          if (item.isIndexShow == 1) {
            item.isIndexShow = true;
          }
        });
        this.loading = !this.loading;
      }
      if (res.code == 400) {
        this.loading = !this.loading;
        this.$message({
          message: res.msg,
          type: "error",
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      }
    },
    // 获取适合场景
    async getGoodsSuitableScene(){
      const res = await getGoodsSuitableScene();
      res.data.forEach(item=>{
        this.suitable_sceneArr.push(item.sname)
      })
    },
    // 选择类别发生改变时的事件
    async selectChange() {
      this.loading = !this.loading;
      let select = this.select;
      this.keyword = "";
      console.log(select);
      if (select == 0) {
        this.loading = !this.loading;
        this.getGoodsByLimit(this.size, this.currentPage);
        return;
      }
      const res = await getGoodsBySelect(select, this.size, this.currentPage);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach((item) => {
          item.suitable_scene = item.suitable_scene.split(",");
          item.src = serverIndex + item.src;
          item.goodsSwiperArr = item.goodsSwiperArr.split(",");
          item.goodsSwiperArr.forEach((i, index) => {
            item.goodsSwiperArr[index] =
              serverIndex + item.goodsSwiperArr[index];
          });
          item.goodsDetailsImgArr = item.goodsDetailsImgArr.split(",");
          item.goodsDetailsImgArr.forEach((item2, index) => {
            item.goodsDetailsImgArr[index] =
              serverIndex + item.goodsDetailsImgArr[index];
          });
          if (item.isIndexShow == 0) {
            item.isIndexShow = false;
          }
          if (item.isIndexShow == 1) {
            item.isIndexShow = true;
          }
        });
        this.loading = !this.loading;
      }
      if (res.code == 400) {
        this.loading = !this.loading;
        this.$message({
          message: res.msg,
          type: "error",
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      }
    },
    // 判断是那种方式获取的数据
    judgmentWay(size, currentPage) {
      if (this.keyword !== "") {
        this.search();
      }
      if (this.select !== "") {
        this.selectChange();
      } else {
        this.getGoodsByLimit(this.size, this.currentPage);
      }
    },
    goCommentsManagement(id) {
      this.$router.push({ name: "commentsManagement", params: { id } });
    },
    async deleteGoods(id) {
      const res = await deleteGoods(id);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getGoodsByLimit(this.size, this.currentPage);
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
  },
  mounted() {
    this.getGoodsByLimit(this.size, this.currentPage);
    this.getGootdType();
    this.getGoodsSuitableScene()
  },
  created() {
    self = this;
  },
  filters: {
    getSuitableName(value) {
      return self.suitable_sceneArr[+value-1];
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 20px;
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
  .search-input {
    width: 300px;
  }
  .title-img {
    width: 150px;
  }
  .my-tag {
    margin-right: 5px;
  }
  .my-pagination {
    margin-top: 20px;
  }
  .select {
    margin-left: 40px;
  }
}
</style>