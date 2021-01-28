<template>
  <div class="shoppingCar">
    <vue-header name="arrow-left" title="购物车" :handleClick="handleClick" />
    <!-- 购物车列表 -->
    <div class="margin-top"></div>
    <vue-shoppingCarList></vue-shoppingCarList>

    <div class="margin-bottom"></div>
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import vueShoppingCarList from "./shoppingCarList";
export default {
  components: {
    vueHeader,
    vueShoppingCarList,
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 3.125rem;
}
.margin-bottom {
  margin-bottom: 3.125rem;
}
</style>