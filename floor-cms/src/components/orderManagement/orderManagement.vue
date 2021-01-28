<template>
  <div class="order-management">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="my-span">搜索订单</span>
            <el-input
              v-model="keyword"
              style="width: 280px; margin-left: 20px"
              placeholder="请输入订单id"
              prefix-icon="el-icon-search"
              clearable
              @input="search"
            ></el-input>
            <span class="my-span status-search">按订单状态搜索</span>
            <el-select
              v-model="selectValue"
              placeholder="请选择"
              style="margin-left: 20px"
              @change="selectChange"
            >
              <el-option
                v-for="item in selectOoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%" class="my-table">
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
                    <el-table-column
                      prop="count"
                      label="购买的数量"
                      width="180"
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.count ? scope.row.count : 1 }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                label="编号"
                align="center"
              ></el-table-column>
              <el-table-column prop="uid" label="购买的用户id" align="center">
              </el-table-column>
              <el-table-column
                prop="submit_time"
                label="订单提交时间"
                align="center"
              >
              </el-table-column>
              <el-table-column label="订单状态" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.status | getStatusMsg }}</span>
                </template>
              </el-table-column>
              <el-table-column label="订单时间线" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="ShoworderTimeLineDialog(scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="贺卡信息" width="100" align="center">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看修改贺卡信息"
                    placement="top"
                  >
                    <el-button
                      @click="showGreeting_messageBox(scope.row)"
                      size="mini"
                      >查看修改</el-button
                    >
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="买家留言" width="100" align="center">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看修改买家留言信息"
                    placement="top"
                  >
                    <el-button
                      @click="showBuyer_messageBox(scope.row)"
                      size="mini"
                      >查看修改</el-button
                    >
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="delivery_date"
                label="期望送达日期"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="delivery_time"
                label="期望送达时间"
                align="center"
              >
              </el-table-column>
              <el-table-column label="订购人信息" width="100" align="center">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看修改订购人信息"
                    placement="top"
                  >
                    <el-button @click="showSubscriberMsg(scope.row)" size="mini"
                      >查看修改</el-button
                    >
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="收货人信息" width="100" align="center">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看修改收货人人信息"
                    placement="top"
                  >
                    <el-button @click="showConsigneeBox(scope.row)" size="mini"
                      >查看修改</el-button
                    >
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                prop="pay_methods"
                label="支付方式"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.pay_methods == 1 ? "微信" : "支付宝"
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="real_pay" label="支付金额" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="发货"
                    placement="top"
                  >
                    <el-button
                      type="primary"
                      icon="el-icon-box"
                      circle
                      @click="showDeliveryBox(scope.row)"
                      :disabled="scope.row.status !== 3"
                      size="mini"
                    ></el-button>
                  </el-tooltip>

                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="删除订单"
                    placement="top"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      @click="deleteOrder(scope.row.id)"
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
            :page-sizes="[10, 20, 40, 80]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-card>
      </div>
    </div>

    <div class="dialog">
      <!-- 订购人信息窗口 -->
      <el-dialog
        title="订购人信息"
        :visible.sync="showSubscriberMsgBox"
        width="30%"
      >
        <div>
          <el-form
            label-position="top"
            label-width="80px"
            :model="showSubscriber"
          >
            <el-form-item label="姓名">
              <el-input v-model="showSubscriber.subscriber_name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="showSubscriber.subscriber_tel"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showSubscriberMsgBox = false">取 消</el-button>
          <el-button type="primary" @click="submitSubscriberMsg"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 收货人信息窗口 -->
      <el-dialog title="收货人信息" :visible.sync="showConsignee" width="30%">
        <div>
          <el-form label-position="top" label-width="80px" :model="consignee">
            <el-form-item label="收货人姓名">
              <el-input v-model="consignee.name"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话">
              <el-input v-model="consignee.tel"></el-input>
            </el-form-item>
            <el-form-item label="地区">
              <el-input v-model="consignee.address"></el-input>
            </el-form-item>
            <el-form-item label="详情地址">
              <el-input v-model="consignee.addressDetail"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showConsignee = false">取 消</el-button>
          <el-button type="primary" @click="submitConsignee">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 贺卡信息窗口 -->
      <el-dialog
        title="贺卡信息"
        :visible.sync="showGreeting_message"
        width="30%"
      >
        <div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="showSubscriber.greeting_message"
            maxlength="30"
            rows="5"
            show-word-limit
          >
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showGreeting_message = false">取 消</el-button>
          <el-button type="primary" @click="showConsignee = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 贺卡留言 -->
      <el-dialog title="贺卡留言" :visible.sync="showBuyer_message" width="30%">
        <div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="showSubscriber.buyer_message"
            maxlength="30"
            rows="5"
            show-word-limit
          >
          </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showBuyer_message = false">取 消</el-button>
          <el-button type="primary" @click="showBuyer_message = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 展示订单时间线 -->
      <el-dialog
        title="订单时间线"
        :visible.sync="orderTimeLineDialog"
        width="30%"
      >
        <div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-dialog>
      <!-- 展示发货窗口 -->
      <el-dialog title="发货" :visible.sync="DeliveryDialog" width="30%">
        <div>
          <el-date-picker
            v-model="showSubscriber.deliver_time"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DeliveryDialog = false">取 消</el-button>
          <el-button type="primary" @click="Delivery">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getOrderAllByLimit,
  changeOrderData,
  changeOrderStatus,
  deleteOrder,
  searchOrder,
  selectOrderByStatus,
} from "../../server/order";
let self;
export default {
  data() {
    return {
      tableData: [],
      keyword: "",
      size: 10,
      total: 0,
      currentPage: 1,
      showSubscriberMsgBox: false,
      //   订购人信息
      showSubscriber: {},
      //   收货人信息
      consignee: {},
      showConsignee: false,
      showBuyer_message: false,
      showGreeting_message: false,
      statusArr: [
        "已取消",
        "待审核",
        "待付款",
        "已付款",
        "派送中",
        "待评价",
        "已完成",
      ],
      orderTimeLineDialog: false,
      activities: [],
      DeliveryDialog: false,
      deliver_time: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      selectOoptions: [
        {
          value: "all",
          label: "全部",
          disabled: true,
        },
      ],
      selectValue: "",
    };
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.judge();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.judge();
    },
    async getOrderAllByLimit(size, currentPage) {
      const res = await getOrderAllByLimit(size, currentPage);
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
      }
    },
    // 展示订购人信息窗口
    showSubscriberMsg(val) {
      this.showSubscriberMsgBox = true;
      this.showSubscriber = val;
    },

    // 提交修改的订购人的信息
    submitSubscriberMsg() {
      let obj = this.showSubscriber;
      this.changeOrderData(obj);
      this.showSubscriberMsgBox = false;
      this.showSubscriber = {};
    },
    // 展示收货人信息窗口
    showConsigneeBox(val) {
      this.showConsignee = true;
      this.consignee = val.address_detail;
    },
    // 提交修改的收货人信息
    submitConsignee() {
      let obj = this.showSubscriber;
      this.changeOrderData(obj);
      this.showSubscriber = {};
      this.showConsignee = false;
    },
    // 展示贺卡留言窗口
    showGreeting_messageBox(val) {
      this.showGreeting_message = true;
      this.showSubscriber = val;
    },
    // 提交修改的贺卡留言
    submitGreetingMessage() {
      let obj = this.showSubscriber;
      this.changeOrderData(obj);
      this.showSubscriber = {};
      this.showGreeting_message = false;
    },
    // 展示买家留言窗口
    showBuyer_messageBox(val) {
      this.showBuyer_message = true;
      this.showSubscriber = val;
    },
    // 展示订单时间线的窗口
    ShoworderTimeLineDialog(val) {
      this.activities = [
        {
          content: "用户提交订单",
          timestamp: val.submit_time,
        },
        {
          content: "用户已付款付款",
          timestamp: val.pay_time,
        },
      ];
      if (val.deliver_time !== "待发货")
        this.activities.push({
          content: "订单准备派送",
          timestamp: val.deliver_time,
        });
      if (val.received_time !== "待发货") {
        this.activities.push({
          content: "订单已签收",
          timestamp: val.received_time,
        });
      }
      this.orderTimeLineDialog = true;
    },
    // 展示发货窗口
    showDeliveryBox(val) {
      this.DeliveryDialog = true;
      this.showSubscriber = val;
    },
    // 发货
    async Delivery() {
      this.showSubscriber.deliver_time = new Date(
        this.showSubscriber.deliver_time
      ).toLocaleString();
      let obj = this.showSubscriber;
      this.changeOrderData(obj);
      const res = await changeOrderStatus(4, obj.id);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
      this.DeliveryDialog = false;
    },
    // 修改订单数据的函数
    async changeOrderData(obj) {
      obj.address_detail = JSON.stringify(obj.address_detail);
      obj.goods_details = JSON.stringify(obj.goods_details);
      const res = await changeOrderData(obj);
      if (res.code == 200) {
        this.getOrderAllByLimit(this.size, this.currentPage);
        this.$message({
          message: res.msg,
          type: "success",
        });
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
    // 删除订单
    deleteOrder(id) {
      console.log(id);
      let self = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteOrder(id);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          }
          if (res.code == 400) {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
          self.getOrderAllByLimit(this.size, this.currentPage);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 搜索
    async search() {
      let keyword = this.keyword;
      this.selectValue = "";
      this.size = 10;
      this.currentPage = 1;
      if (keyword.trim() == "") {
        this.getOrderAllByLimit(this.size, this.currentPage);
      }
      if (keyword.trim() !== "") {
        const res = await searchOrder(keyword, this.size, this.currentPage);
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
          this.tableData = [];
          this.total = 0;
        }
      }
    },
    getSelectOoptions() {
      this.statusArr.forEach((item, index) => {
        this.selectOoptions.push({
          value: index,
          label: item,
        });
      });
    },
    async selectChange() {
      this.size = 10;
      this.currentPage = 1;
      if (this.selectValue == "all") {
        this.getOrderAllByLimit(this.size, this.currentPage);
      } else {
        const res = await selectOrderByStatus(
          this.selectValue,
          this.size,
          this.currentPage
        );
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
          this.tableData = [];
          this.total = 0;
        }
      }
    },
    // 是那个要进行下一页跳转
    judge() {
      if (this.keyword !== "") {
        this.search();
      }
      if (this.selectValue !== "") {
        this.selectChange();
      } else {
        this.getOrderAllByLimit(this.size, this.currentPage);
      }
    },
  },
  mounted() {
    this.getOrderAllByLimit(this.size, this.currentPage);
  },
  created() {
    self = this;
    this.getSelectOoptions();
  },
  filters: {
    getStatusMsg(val) {
      return self.statusArr[val];
    },
  },
  watch: {
    selectValue() {
      if (this.selectValue !== "") {
        this.selectOoptions[0].disabled = false;
      }
      if (this.selectValue == "") {
        this.selectOoptions[0].disabled = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 20px;
  .my-table {
    font-size: 12px;
    margin-bottom: 20px;
  }
  .my-span {
    font-size: 14px;
  }
  .status-search {
    margin-left: 20px;
  }
}
</style>