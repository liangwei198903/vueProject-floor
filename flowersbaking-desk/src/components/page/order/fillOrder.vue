// 订单页父组件
<template>
  <div class="submit-order">
    <div class="header">
      <vue-header
        name="arrow-left"
        title="填写订单"
        :handleClick="handleClick"
      />
    </div>
    <div class="content">
      <!-- 主体内容 -->
      <vue-checkAddress />
    </div>
    <div class="margin-top"></div>
    <vue-orderFooter />
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import vueCheckAddress from "./orderContent";
import vueOrderFooter from "./orderFooter";
export default {
  components: {
    vueHeader,
    vueCheckAddress,
    vueOrderFooter,
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
  },
  destroyed(){
    sessionStorage.removeItem("addressId");
    sessionStorage.removeItem("delivery_date");
    sessionStorage.removeItem("delivery_time")
    sessionStorage.removeItem("subscriberName");
    sessionStorage.removeItem("subscriberTel");
    sessionStorage.removeItem("greetingMessage");
    sessionStorage.removeItem("buyerMessage");
    sessionStorage.removeItem("payMethods")
  }
};
</script>

<style lang="scss" scoped>
.submit-order {
  .header {
    margin-bottom: 3.75rem;
  }
  .content {
    width: 95%;
    margin: 0 auto;
  }
  .margin-top{
    margin-top: 3.75rem;
  }
}
</style>