// 商品信息
<template>
  <div class="commodity-information">
    <div class="hekainfozongjia">
      <div class="flex-start">
        <div class="count">共 {{orderData.goods_count}} 件商品</div>
      </div>
      <div class="flex-start margin-top-small">
        <div class="count">运费￥0</div>
        <div class="count">
          商品总价:
          <span class="text-danger">￥{{orderData.total.toFixed(2)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: {
        total:0
      },
    };
  },
  mounted() {
    let orderData = sessionStorage.getItem("orderData");
    this.orderData = JSON.parse(orderData);
  },
};
</script>

<style lang="scss" scoped>
.commodity-information {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0.69rem;
  margin-bottom: 0.69rem;
  .hekainfozongjia {
    display: flex;
    flex-direction: column;
    width: 100%;
    .flex-start {
      display: flex;
      justify-content: flex-start;
      .count {
        display: flex;
        width: 50%;
        line-height: 1.3125rem;
        .text-danger {
          color: #ff2222;
        }
      }
    }
    .margin-top-small {
      margin-top: 0.625rem;
    }
  }
}
</style>