// 脚部
<template>
  <div class="order-header">
    <div class="real-pay" v-if="orderData">
      实付款:￥{{ orderData.total.toFixed(2) }}
    </div>
    <div class="submit-orders" @click="submitOrders">提交订单</div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import { submitOrders } from "../../../server/order";
import { deleteItem } from "../../../server/shoppingCar";
import { serverIndex } from '../../../server/serverIndex';
export default {
  data() {
    return {
      orderData: {
        total: 0,
      },
    };
  },
  methods: {
    async submitOrders() {
      let addressId = sessionStorage.getItem("addressId");
      if (addressId == "") {
        Dialog.alert({
          message: "请，请添加或者选择地址",
        }).then(() => {
          // on close
        });
        return;
      }
      let payMethods = sessionStorage.getItem("payMethods");
      let greetingMessage = sessionStorage.getItem("greetingMessage");
      if (greetingMessage == "") {
        greetingMessage = "该用户未填写";
      }
      let buyerMessage = sessionStorage.getItem("buyerMessage");
      if (buyerMessage == "") {
        buyerMessage = "该用户未填写";
      }
      let orderData = sessionStorage.getItem("orderData");
      let delivery_date = sessionStorage.getItem("delivery_date");
      if (delivery_date == "") {
        Dialog.alert({
          message: "亲，请选择送达日期",
        }).then(() => {
          // on close
        });
        return;
      }
      let delivery_time = sessionStorage.getItem("delivery_time");
      let subscriberName = sessionStorage.getItem("subscriberName");
      if (subscriberName == "") {
        Dialog.alert({
          message: "亲，请填写订购人的姓名",
        }).then(() => {
          // on close
        });
        return;
      }
      let subscriberTel = sessionStorage.getItem("subscriberTel");
      if (subscriberTel == "") {
        Dialog.alert({
          message: "亲，请填写订购人的电话",
        }).then(() => {
          // on close
        });
        return;
      }
      let address_detail=sessionStorage.getItem("address_detail")
      let time = new Date().toLocaleString();
      let pay_time = time;
      let submit_time = time;
      let orderObj = {
        address_id: +addressId,
        pay_methods: +payMethods,
        greeting_message: greetingMessage,
        buyer_message: buyerMessage,
        goods_details: orderData,
        delivery_date: delivery_date,
        delivery_time: delivery_time,
        subscriber_name: subscriberName,
        subscriber_tel: subscriberTel,
        real_pay: this.orderData.total,
        address_detail,
        pay_time,
        submit_time,
        status: 3,
      };
      let token = localStorage.getItem("token");
      orderObj.goods_details=orderObj.goods_details.replace(serverIndex,'')
      const res = await submitOrders(token, orderObj);
      if (res.code == 200) {
        this.orderData.goods.forEach((item) => {
          deleteItem(item.id);
        });
        let self = this;
        Toast({
          message: "正在提交",
          position: "center",
          type: "loading",
          onClose() {
            sessionStorage.removeItem("orderData");
            self.$router.push({ name: "successfullySubmitOrder" });
          },
        });
      }
    },
  },
  mounted() {
    let orderData = sessionStorage.getItem("orderData");
    this.orderData = JSON.parse(orderData);
  },
};
</script>

<style lang="scss" scoped>
.order-header {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  .real-pay {
    width: 60%;
    background-color: #ffffff;
    color: #884e22;
    padding: 0.9375rem 0rem;
    display: flex;
    justify-content: center;
  }
  .submit-orders {
    width: 40%;
    background-color: #884e22;
    color: #ffffff;
    padding: 0.9375rem 0rem;
    text-align: center;
  }
}
</style>