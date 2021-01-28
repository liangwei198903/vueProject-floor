// 我的订单父组件
<template>
  <div class="my-order">
    <!-- 头部 -->
    <vue-header name="arrow-left" :title="title" :handleClick="handleClick" />
    <!-- 订单列表 -->
    <vue-myOrderList />
  </div>
</template>

<script>
import vueHeader from "../../../public/header";
import vueMyOrderList from "./myOrderList"
export default {
  components: {
    vueHeader,
    vueMyOrderList
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    handleClick() {
      this.$router.push({name:"mine"});
    },
    getTitle() {
      let status = this.$route.params.status;
      if (status == "all") {
        this.title = "全部订单";
      }
      if (status == 0) {
        this.title = "已付款订单";
      }
      if (status == 1) {
        this.title = "派送中的订单";
      }
      if (status == 2) {
        this.title = "待评论的订单";
      }
      if (status == 3) {
        this.title = "已完成的订单";
      }
    },
  },
  mounted() {
    this.getTitle();
  },
};
</script>

<style lang="scss" scoped>
.my-order {
  width: 100%;
  height: 100vh;
}
</style>