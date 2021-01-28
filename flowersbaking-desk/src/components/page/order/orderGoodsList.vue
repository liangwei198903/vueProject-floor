// 商品信息+图片
<template>
  <div class="order-goodsList">
    <div class="productinfo-cont">
      <div class="productinfo-top" v-for="item in orderData.goods" :key="item.id">
        <div class="productinfo-top-left">
          <div class="productinfo-topleft-img">
            <img
              :src="item.src"
            />
          </div>
          <div class="productinfo-topleft-text">
            <p>{{item.name}}</p>
            <p>x&nbsp;{{item.count?item.count:1}}</p>
          </div>
        </div>
        <div class="productinfo-top-right">
          <p class="price">￥<span>{{item.price.toFixed(2)}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderData: [],
      goods_cound:0,
    };
  },
  mounted() {
    let orderData = sessionStorage.getItem("orderData");
    this.orderData = JSON.parse(orderData);
    this.goods_cound=this.orderData.goods_count
  },
};
</script>

<style lang="scss" scoped>
.order-goodsList {
  padding: 0.69rem;
  margin-bottom: 0.69rem;
  background-color: #ffffff;
  border-radius: 5px;
  .productinfo-cont {
    border-bottom: 1px solid #f7f9fa;
    .productinfo-top {
      display: flex;
      justify-content: space-between;
      .productinfo-top-left {
        display: flex;
        padding: 0.975rem 0;
        .productinfo-topleft-img {
          width: 4.4688rem;
          margin-right: 0.69rem;
        }
        .productinfo-topleft-text {
          color: #000;
        }
      }
      .productinfo-top-right {
        display: flex;
        align-items: center;
        font-weight: 550;
        color: #000;
      }
    }
  }
}
</style>