<template>
  <div class="order-nav">
    <div class="myorder-title">
      <p>我的订单</p>
      <p @click="goMyOrder('all')">全部订单></p>
    </div>
    <div class="myorder-menu">
      <div
        class="myorder-menu-item"
        v-for="(item, index) in orderNav"
        :key="index"
        @click="goMyOrder(index)"
      >
        <i class="iconfont" :class="item.icon"></i>
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderNav: [
        {
          text: "已付款",
          icon: "icon-daifukuan",
        },
        {
          text: "派送中",
          icon: "icon-daifahuo",
        },
        {
          text: "待评价",
          icon: "icon-pingjia",
        },
        {
          text: "已完成",
          icon: "icon-dingdan",
        },
      ],
    };
  },
  methods: {
    goMyOrder(index) {
      this.$router.push({ name: "myOrder", params: { status: index } });
    },
  },
};
</script>

<style lang="scss" scoped>
.order-nav {
  background-color: #ffffff;
  margin-left: 0.345rem;
  margin-bottom: 0.345rem;
  padding: 1.035rem;
  width: 89%;
  border-radius: 5px;
  .myorder-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.6875rem;
    border-bottom: 1px solid #e9ecf0;
  }
  .myorder-menu {
    display: flex;
    justify-content: space-around;
    margin-top: 0.975rem;
    .myorder-menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .iconfont {
        font-size: 1.375rem;
      }
    }
  }
}
</style>