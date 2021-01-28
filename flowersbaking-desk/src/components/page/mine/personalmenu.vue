<template>
  <div class="personalmenu">
    <div class="personalmenu-top">
      <div
        class="personalmenu-item iss"
        v-for="(item, index) in orderNav"
        :key="index"
        @click="go(index)"
      >
        <div class="personalmenu-item">
          <i class="iconfont myicon" :class="item.icon"></i>
          <span>{{ item.text }}</span>
        </div>
        <i class="iconfont icon-xialayou is-you"></i>
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
          text: "优惠券",
          icon: "icon-youhuiquan",
        },
        {
          text: "收货地址",
          icon: "icon-4",
        },
        {
          text: "设置",
          icon: "icon-shezhi",
        },
      ],
    };
  },
  methods: {
    go(index) {
      if (index == 1) {
        this.$router.push({ name: "shippingAddress" });
      }
      if (index == 2) {
        this.$router.push({ name: "config" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.personalmenu {
  background-color: #ffffff;
  margin-left: 0.345rem;
  margin-bottom: 0.345rem;
  padding: 0.975rem;
  width: 89%;
  border-radius: 5px;
  .personalmenu-top {
    .personalmenu-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 16px;
      color: #333;
      width: 100%;
      .personalmenu-item {
        display: flex;
      }
    }
  }
  .iss {
    padding: 8px 0;
    border-bottom: 1px solid #e9ecf0;
    justify-content: space-between;
  }
  .myicon {
    font-size: 1.375rem;
    padding-right: 0.9375rem;
    box-sizing: border-box;
  }
}
</style>