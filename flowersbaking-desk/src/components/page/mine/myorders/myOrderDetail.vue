// 订单详情信息
<template>
  <div class="order-detail">
    <!-- 头部 -->
    <vue-header name="arrow-left" title="订单详情" :handleClick="handleClick">
      <div class="caidan">
        <span
          class="iconfont icon-caidan"
          id="onmenu"
          @click="showNavbar"
        ></span>
      </div>
    </vue-header>
    <nav class="headerbar-title" v-show="NavBar">
      <div class="headerbar-title-item">
        <router-link to="/">
          <i class="iconfont icon-shouye"></i>
          首页
        </router-link>
      </div>
      <div class="headerbar-title-item">
        <router-link
          v-if="navData.length > 0"
          :to="`/information/details/${navData[0].catid}/${navData[0].name}`"
        >
          <i class="iconfont iconfont icon-fenlei"></i>
          资讯
        </router-link>
      </div>
      <div class="headerbar-title-item">
        <router-link to="/shoppingCar">
          <i class="iconfont icon-gouwuche"></i>
          购物车
        </router-link>
      </div>
      <div class="headerbar-title-item">
        <router-link to="/mine">
          <i class="iconfont icon-wode"></i>
          我的
        </router-link>
      </div>
    </nav>
    <!-- 状态信息 -->
    <div class="detail">
      <div class="top">
        <div class="status">
          {{ orderDetailData.status_text }}
        </div>
      </div>
      <!-- 收货人信息 -->
      <div class="address-msg common">
        <div class="title">收货人信息</div>
        <div class="left">
          <van-icon
            name="location-o"
            color="rgb(219, 63, 63)"
            size="3.125rem"
          />
        </div>
        <div class="right">
          <div class="name-and-tel">
            <span class="name">{{ addressData.name }}</span>
            <span class="tel">{{ addressData.tel }}</span>
          </div>
          <div class="address-detail">
            <span class="province">
              {{ addressData.province }}
            </span>
            <span class="city">
              {{ addressData.city }}
            </span>
            <span class="county">
              {{ addressData.county }}
            </span>
            <span class="address">
              {{ addressData.addressDetail }}
            </span>
          </div>
        </div>
      </div>
      <!-- 订购人信息 -->
      <div class="buyer-information common">
        <div class="title">订购人信息</div>
        <div class="right">
          <div class="name-and-tel">
            <span class="name">{{ orderDetailData.subscriber_name }}</span>
            <span class="tel">{{ orderDetailData.subscriber_tel }}</span>
          </div>
        </div>
      </div>
      <!-- 贺卡留言信息 -->
      <div class="common greeting-message">
        <div class="title">贺卡留言信息</div>
        <div class="right">
          <div class="msg">
            {{
              orderDetailData.greeting_message == "该用户未填写"
                ? "未填写"
                : orderDetailData.greeting_message
            }}
          </div>
        </div>
      </div>
      <!-- 买家留言信息 -->
      <div class="common greeting-message">
        <div class="title">买家留言信息</div>
        <div class="right">
          <div class="msg">
            {{
              orderDetailData.buyer_message == "该用户未填写"
                ? "未填写"
                : orderDetailData.buyer_message
            }}
          </div>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="goods-list" v-if="orderDetailData !== {}">
        <div
          class="goods-item"
          v-for="item in orderDetailData.goods_details.goods"
          :key="item.id"
          @click="goGoodDetail(item.id)"
        >
          <div class="left">
            <img :src="serverIndex+item.src" alt="" />
          </div>
          <div class="right">
            <div class="right-top">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="material">
                {{ item.material }}
              </div>
            </div>
            <div class="right-bottom">
              <span class="price">
                <span class="price"> ￥{{ item.price }} </span>
                <span class="original-price">
                  ￥{{ item.original_price }}
                </span>
              </span>
              <span class="count"> ×{{ item.count ? item.count : 1 }} </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 订单信息 -->

      <div class="order-tiem">
        <div class="titel">订单信息</div>
        <div class="common">
          <span>订单编号：</span>
          <span>{{ orderDetailData.id }}</span>
        </div>
        <div class="common">
          <span>下单时间：</span>
          <span>{{ orderDetailData.submit_time }}</span>
        </div>
        <div class="common">
          <span>支付时间：</span>
          <span>{{ orderDetailData.pay_time }}</span>
        </div>
        <div class="common">
          <span>送达日期：</span>
          <span>{{ orderDetailData.delivery_date }}</span>
        </div>
        <div class="common">
          <span>送达时间段：</span>
          <span>{{ orderDetailData.delivery_time }}</span>
        </div>
        <div class="common">
          <span>支付方式：</span>
          <span>{{
            orderDetailData.pay_methods == 1 ? "微信" : "支付宝"
          }}</span>
        </div>
        <div class="common">
          <span>实际付款：</span>
          <span>￥{{ orderDetailData.real_pay }}</span>
        </div>
      </div>
    </div>
    <div class="margin-top"></div>
    <div class="footer">
      <div
        class="button"
        v-if="orderDetailData.status > 2 && orderDetailData.status < 4"
        @click="cancelOrder"
      >
        取消订单
      </div>
      <div
        class="button"
        v-if="orderDetailData.status == 0"
        @click="addShoppingCar"
      >
        加入购物车
      </div>
      <div class="button" v-if="orderDetailData.status == 4" @click="sureGoods">
        确定收货
      </div>
      <div
        class="button"
        v-if="orderDetailData.status == 5"
        @click="goComments"
      >
        去评价
      </div>
      <div
        class="button"
        v-if="orderDetailData.status == 6"
        @click="anotherList"
      >
        再来一单
      </div>
      <div
        class="button"
        v-if="orderDetailData.status == 1"
        @click="cancelRefund"
      >
        取消申请
      </div>
    </div>
  </div>
</template>

<script>
import vueHeader from "../../../public/header";
import { getNav } from "../../../../server/information";
import {
  getOrderDetail,
  sureGoods,
  addSales,
  checkPending,
  cancelRefund,
} from "../../../../server/order";
import { getAddressById } from "../../../../server/user";
import { Dialog, Toast } from "vant";
import { joinCar } from "../../../../server/shoppingCar";
import { serverIndex } from "../../../../server/serverIndex"
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      NavBar: false,
      navData: [],
      addressData: {},
      orderDetailData: {
        goods_details: {
          goods: [],
        },
      },
      isAddSuccess: Boolean,
      serverIndex:""
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    showNavbar() {
      this.NavBar = !this.NavBar;
    },
    async getNavData() {
      const res = await getNav();
      this.navData = res;
    },
    async getOrderDetailData() {
      let id = this.$route.params.id;
      const res = await getOrderDetail(id);
      if (res.code == 200) {
        this.orderDetailData = res.data[0];
        this.orderDetailData.goods_details = JSON.parse(
          this.orderDetailData.goods_details
        );
        if (this.orderDetailData.status == 0) {
          this.orderDetailData.status_text = "已取消";
        }
        if (this.orderDetailData.status == 1) {
          this.orderDetailData.status_text = "待审核";
        }
        if (this.orderDetailData.status == 2) {
          this.orderDetailData.status_text = "待付款";
        }
        if (this.orderDetailData.status == 3) {
          this.orderDetailData.status_text = "已付款";
        }
        if (this.orderDetailData.status == 4) {
          this.orderDetailData.status_text = "派送中";
        }
        if (this.orderDetailData.status == 5) {
          this.orderDetailData.status_text = "待评价";
        }
        if (this.orderDetailData.status == 6) {
          this.orderDetailData.status_text = "已完成";
        }
        this.getAddressData();
      }
    },
    async getAddressData() {
      let address_id = this.orderDetailData.address_id;
      const res = await getAddressById(address_id);
      this.addressData = res.data[0];
    },
    cancelOrder() {
      let self = this;
      let token = localStorage.getItem("token");
      let id = this.orderDetailData.id;
      Dialog.confirm({
        title: "取消订单",
        confirmButtonText: "残忍的确定",
        cancelButtonText: "我再想想",
        message: "亲，您真的要取消订单吗？",
      }).then(async () => {
        const res = await checkPending(id, token);
        if (res.code == 200) {
          Toast({
            message: "提交成功",
            position: "center",
            type: "success",
            onClose() {
              self.$router.go(0);
            },
          });
        }
      });
    },
    async cancelRefund() {
      let self = this;
      let token = localStorage.getItem("token");
      let id = this.orderDetailData.id;
      const res = await cancelRefund(id, token);
      if (res.code == 200) {
        Toast({
          message: "取消成功",
          position: "center",
          type: "success",
          onClose() {
            self.$router.go(0);
          },
        });
      }
    },
    anotherList() {
      let goods = JSON.stringify(this.orderDetailData.goods_details);
      this.$store.commit("changeOrderData", goods);
      sessionStorage.setItem("orderData", goods);
      this.$router.push({ name: "fillOrder" });
    },
    async sureGoods() {
      let time = new Date().toLocaleString();
      Dialog.confirm({
        title: "确定收货",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        message: "亲,您确定收到了吗？",
      }).then(async () => {
        let id = this.orderDetailData.id;
        let token = localStorage.getItem("token");
        this.orderDetailData.goods_details.goods.forEach(async (item) => {
          let res = await addSales(item.id, token, item.count);
        });
        const res = await sureGoods(id, token,time);
        if (res.code == 200) {
          let self = this;
          Toast({
            message: "收货成功",
            position: "center",
            type: "success",
            async onClose() {
              const res = await self.getOrderDetailData();
            },
          });
        }
      });
    },
    goComments() {
      let id = this.orderDetailData.id;
      this.$router.push({ name: "comments", params: { id: id } });
    },
    goGoodDetail(id) {
      this.$router.push({ name: "goodsDetails", params: { good_id: id } });
    },
    // 再来一单
    addShoppingCar() {
      let arr = this.orderDetailData.goods_details.goods;
      let token = localStorage.getItem("token");
      arr.forEach(async (item) => {
        const res = await joinCar(token, item.goods_id, item.price, item.count);
        if (res.code == 200) {
          this.isAddSuccess = true;
        } else if (res.code == 400) {
          this.isAddSuccess = false;
        }
      });
      if (this.isAddSuccess) {
        let self = this;
        Toast({
          message: "添加购物成功",
          position: "center",
          type: "success",
          onClose() {
            self.$router.push({ name: "shoppingCar" });
          },
        });
      }
    },
  },
  mounted() {
    this.getNavData();
    this.getOrderDetailData();
    this.serverIndex=serverIndex
  },
};
</script>

<style lang="scss" scoped>
.order-detail {
  width: 100%;
  height: 100vh;
  .caidan {
    box-sizing: border-box;
    padding-left: 5rem;
    #onmenu {
      font-size: 1.375rem;
    }
  }
  nav.headerbar-title {
    background-color: #ffffff;
    border: 1px solid #e9ecf0;
    box-shadow: 0 0.25rem 0.75rem 0 #e9ecf0;
    position: fixed;
    width: 6.9375rem;
    top: 3.75rem;
    right: 0.6875rem;
    padding: 1rem;
    display: block;
    z-index: 50;
    .headerbar-title-item {
      font-size: 0.875rem;
      a {
        display: inline-block;
        text-align: left;
        width: 100%;
        height: 2.8262rem;
        line-height: 2.8262rem;
      }
    }
  }
  nav.headerbar-title::before {
    position: absolute;
    content: "";
    top: -0.2415rem;
    left: 7.5331rem;
    background-color: #ffffff;
    height: 0.3225rem;
    width: 0.3225rem;
    transform: rotate(45deg);
  }
  .detail {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .top {
      height: 9.375rem;
      box-sizing: border-box;
      padding-top: 3.125rem;
      width: 100%;
      background: rgb(238, 62, 8);
      display: flex;
      align-items: center;
      .status {
        width: 100%;
        box-sizing: border-box;
        padding-left: 3.125rem;
        font-size: 1.5625rem;
        color: #ffffff;
      }
    }
    .common {
      margin-top: 0.69rem;
      width: 100%;
      box-sizing: border-box;
      padding: 0.69rem;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      .title {
        width: 100%;
        margin-left: 5%;
        box-sizing: border-box;
      }
      .left {
        width: 15%;
        display: flex;
        align-items: center;
      }
      .right {
        box-sizing: border-box;
        padding: 11.04px 0;
        width: 85%;
        font-size: 0.75rem;
        .name {
          margin-right: 0.9375rem;
        }
      }
    }
    .buyer-information {
      .right {
        margin-left: 5%;
      }
    }
    .greeting-message {
      .right {
        .msg {
          margin-left: 5%;
        }
      }
    }
    .goods-list {
      margin-top: 0.69rem;
      width: 100%;
      box-sizing: border-box;
      padding: 0.69rem;
      background-color: #fff;
      .goods-item {
        display: flex;
        justify-content: space-between;
        padding: 11.04px 0;
        .left {
          width: 25%;
        }
        .right {
          width: 75%;
          box-sizing: border-box;
          padding-left: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          .right-top {
            width: 100%;
            .material {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.875rem;
            }
          }
          .right-bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 20px;
              font-weight: 550;
              color: #ff734c !important;
            }
            .original-price {
              font-size: 14px;
              text-decoration: line-through;
              color: #b4babf;
              margin-left: 0.1725rem;
            }
          }
        }
      }
    }
  }
  .order-tiem {
    margin-top: 0.69rem;
    padding: 0.69rem 5%;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 3.75rem;
    .common {
      padding: 0.3125rem 0;
      margin-top: 0;
      display: flex;
      justify-content: space-between;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 3.125rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.3125rem;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.75rem;
    .button {
      height: 1.875rem;
      width: 5rem;
      text-align: center;
      border-radius: 0.3125rem;
      border: 1px solid #666;
      line-height: 1.875rem;
      margin: 0 0.1875rem;
    }
  }
  .hidden {
    display: none;
  }
}
</style>