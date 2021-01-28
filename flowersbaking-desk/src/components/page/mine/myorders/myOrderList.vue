// 订单列表
<template>
  <div class="my-order-list">
    <div v-if="orderList.length > 0" class="order-list">
      <div
        class="order-item"
        v-for="item in orderList"
        :key="item.id"
        @click="goOrderDetail(item.id)"
      >
        <div class="status">
          <span :style="item.code | getStatusClass">
            {{ item.status }}
          </span>
          <span
            class="delete"
            v-if="item.code == 0 || item.code == 6"
            @click.stop="deleteOrder(item.id)"
          >
            <van-icon :name="delIco" size="0.875rem" />
          </span>
        </div>
        <div class="item-detail">
          <div class="left">
            <img :src="serverIndex+item.goods_details.goods[0].src" alt="" />
          </div>
          <div class="right">
            <div class="names">
              <span
                class="name-item"
                v-for="(item2, index) in item.goods_details.goods"
                :key="index"
              >
                {{ item2.name }}
                <span v-show="index !== item.goods_details.goods.length - 1"
                  >|</span
                >
              </span>
            </div>
            <div class="item-content">
              <span class="goods-count">
                商品总数量：×{{ item.goods_details.goods_count }}
              </span>
              <span class="order-price">
                ￥{{ item.goods_details.total }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-data">
      <van-empty description="暂无订单" />
    </div>
  </div>
</template>

<script>
import { getOrderList, deleteOrder } from "../../../../server/order";
import { serverIndex } from "../../../../server/serverIndex";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      orderList: [],
      delIco: "",
      serverIndex:""
    };
  },
  methods: {
    async getOrderList() {
      const token = localStorage.getItem("token");
      let status = this.$route.params.status + 3;
      if (status == "all3") {
        status = status.replace("3", "");
      }
      const res = await getOrderList(token, status);
      this.orderList = res.data;
      // 0：已取消:1：:待审核 2：待付款 3 :已付款  4:派送中  5：待评价  6：已完成
      this.orderList.forEach((item) => {
        item.code = item.status;
        if (item.status == 0) {
          item.status = "已取消";
        }
        if (item.status == 1) {
          item.status = "待审核";
        }
        if (item.status == 2) {
          item.status = "待付款";
        }
        if (item.status == 3) {
          item.status = "已付款";
        }
        if (item.status == 4) {
          item.status = "派送中";
        }
        if (item.status == 5) {
          item.status = "待评价";
        }
        if (item.status == 6) {
          item.status = "已完成";
        }
        item.goods_details = JSON.parse(item.goods_details);
      });
    },
    goOrderDetail(id) {
      this.$router.push({ name: "myOrderDetail", params: { id } });
    },
    deleteOrder(id) {
      let self = this;
      Dialog.confirm({
        message: "您确认删除该订单吗？",
      })
        .then(async () => {
          // on confirm
          const res = await deleteOrder(id);
          if (res.code == 200) {
            Toast({
              message: "删除成功",
              position: "center",
              type: "success",
              onClose() {
                self.getOrderList();
              },
            });
          }
          if (res.code == 400) {
            Toast({
              message: res.msg,
              position: "center",
              type: "fail",
            });
          }
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {
    this.getOrderList();
    this.serverIndex=serverIndex
    this.delIco = serverIndex + "/img/common/delete-icon.png";
  },
  filters: {
    getStatusClass(status) {
      if (status == 0) {
        return {
          color: "#CCCCCC",
        };
      }
      if (status == 1) {
        return {
          color: "#99CCFF",
        };
      }
      if (status == 2) {
        return {
          color: "#66CC99",
        };
      }
      if (status == 3) {
        return {
          color: "rgb(250, 67, 106)",
        };
      }
      if (status == 4) {
        return {
          color: "#CC3399",
        };
      }
      if (status == 5) {
        return {
          color: "#FF9900",
        };
      }
      if (status == 6) {
        return {
          color: "#99CC33",
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-order-list {
  box-sizing: border-box;
  padding-top: 3.125rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .order-list {
    padding-bottom: 0.69rem;
    .order-item {
      width: 95%;
      margin: 0 auto;
      padding: 0.69rem;
      box-sizing: border-box;
      margin-top: 0.9375rem;
      background-color: #fff;
      border-radius: 0.3125rem;
      .status {
        text-align: right;
        height: 1.3125rem;
        span {
          line-height: 1.3125rem;
          display: inline-block;
          height: 100%;
        }
        .delete {
          padding: 5px 0 5px 18px;
          font-size: 16px;
          color: #909399;
          position: relative;
        }
        .delete::after {
          content: "";
          width: 0;
          height: 15px;
          border-left: 1px solid #dcdfe6;
          position: absolute;
          left: 10px;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      }
      .item-detail {
        display: flex;
        .left {
          width: 25%;
        }
        .right {
          width: 75%;
          padding: 0.69rem;
          padding-right: 0;
          .names {
            width: 100%;
          }
          .item-content {
            margin-top: 1.25rem;
            display: flex;
            justify-content: space-between;
            span.order-price {
              color: #ff2222;
            }
          }
        }
      }
    }
  }

  .no-data {
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    padding-top: 9.375rem;
  }
  .delete {
    display: inline-block;
    width: 0.875rem;
    height: 1.3125rem;
    .van-icon-delete-o {
      width: 100%;
      height: 100%;
    }
  }
}
</style>