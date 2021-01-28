<template>
  <div class="order-review">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>订单审核</span>
        </div>
        <div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  :data="props.row.goods_details.goods"
                  style="width: 100%"
                >
                  <el-table-column prop="id" label="商品编号" width="180">
                  </el-table-column>
                  <el-table-column prop="name" label="商品名称" width="180">
                  </el-table-column>
                  <el-table-column prop="price" label="商品单价" width="180">
                  </el-table-column>
                  <el-table-column prop="count" label="购买的数量" width="180">
                    <template slot-scope="scope">
                      <span>{{ scope.row.count ? scope.row.count : 1 }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="订单编号" prop="id"> </el-table-column>
            <el-table-column label="用户id" prop="uid"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="agree(scope.row)"
                  >同意</el-button
                >
                <el-button type="danger" @click="reject(scope.row)"
                  >拒绝</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <div class="my-pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 100]"
              :page-size="size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { selectOrderByStatus, changeOrderStatus } from "../../server/order";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      size: 10,
      currentPage: 1,
    };
  },
  methods: {
    async getTableData(status, size, currentPage) {
      const res = await selectOrderByStatus(status, size, currentPage);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.tableData = res.data.data;
        this.tableData.forEach((item) => {
          item.goods_details = JSON.parse(item.goods_details);
          item.address_detail = JSON.parse(item.address_detail);
        });
        this.total = res.data.total;
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
        this.tableData=[]
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableData(1, this.size, this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData(1, this.size, this.currentPage);
    },
    async agree(val) {
      let id = val.id;
      const res = await changeOrderStatus(0, id);
      if (res.code == 200) {
        this.$message({
          message: "订单审核已同意",
          type: "success",
        });
        this.getTableData(1, this.size, this.currentPage);
      }
      if (res.cdoe == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    async reject(val) {
      let id = val.id;
      const res = await changeOrderStatus(3, id);
      if (res.code == 200) {
        this.$message({
          message: "订单审核已同意",
          type: "success",
        });
        this.getTableData(1, this.size, this.currentPage);
      }
      if (res.cdoe == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
  },
  mounted() {
    this.getTableData(1, this.size, this.currentPage);
  },
};
</script>

<style lang="scss" scoped>
.order-review {
  .el-card,
  .my-pagination {
    margin-top: 20px;
  }
}
</style>