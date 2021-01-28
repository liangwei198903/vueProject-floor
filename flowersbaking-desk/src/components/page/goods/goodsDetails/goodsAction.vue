<template>
  <div class="goodsAction">
    <router-link to="/" class="navbottombar-one borderr link">
      <div class="icon">
        <van-icon name="home-o" class="center" size="1.875rem" />
      </div>
      <p class="center">首页</p>
    </router-link>
    <div class="border"></div>
    <router-link to="/shoppingCar" class="navbottombar-one borderr link">
      <div class="icon">
        <van-badge :content="carCount" class="center">
          <van-icon name="shopping-cart-o" class="center" size="1.875rem" />
        </van-badge>
      </div>
      <p class="center">购物车</p>
    </router-link>
    <div class="btn">
      <a class="my-btn shappingcar" @click="joinCar">加入购物车</a>
      <a class="my-btn buy" @click="buy">立即购买</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    joinCar: {
      type: Function,
      required: true,
    },
    carCount: {
      type: String,
    },
  },
  methods: {
    buy() {
      
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsAction {
  display: flex;
  position: fixed;
  bottom: 0;
  height: 3.75rem;
  left: 0;
  right: 0;
  background-color: #f7f9fa;
  .link {
    width: 14%;
    padding-top: 0.6875rem;
    box-sizing: border-box;
    .icon {
      width: 100%;
      box-sizing: border-box;
      padding-left: 0.875rem;
    }
    .center {
      font-size: 0.75rem;
      text-align: center;
      .van-badge--fixed {
        left: 0;
      }
    }
  }
  .border {
    height: 100%;
    border-right: 1px solid #e9ecf0;
  }
  .btn {
    display: flex;
    width: 72%;
    .my-btn {
      display: inline-block;
      width: 50%;
      line-height: 3.75rem;
      text-align: center;
      color: #fff;
    }
    .shappingcar {
      background-color: #ff734c;
    }
    .buy {
      background-color: red;
    }
  }
}
</style>