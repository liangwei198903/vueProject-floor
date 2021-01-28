<template>
  <div class="goodsDetails">
    <div class="header">
      <vue-header
        name="arrow-left"
        :title="goodData.name"
        :handleClick="handleClick"
      >
        <div class="caidan">
          <span
            class="iconfont icon-caidan"
            id="onmenu"
            @click="showNavbar"
          ></span>
        </div>
      </vue-header>
    </div>
    <div class="swiper">
      <van-swipe
        :autoplay="3000"
        width="100%"
        height="23.4375rem;"
        class="my-vant-swiper"
      >
        <van-swipe-item v-for="(image, index) in swiperData" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
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
    <!-- 商品简介 -->
    <vueRenderGoodsDetails v-if="isReady" :goods="goodData" />
    <!-- 商品数量 -->
    <div class="product-des">
      <div class="product-destitle">数量</div>
      <div class="product-count">
        <ul class="nmb_jj fl">
          <li class="jian" @click="clickJian">-</li>
          <li>
            <input type="text" class="srkk" v-model="count" />
          </li>
          <li class="jian" @click="clickjia">+</li>
        </ul>
      </div>
    </div>
    <!-- 订单评价部分 -->
    <vue-evaluate v-if="goodId != ''" :goodId="goodData.id" />
    <!-- 产品详情 -->
    <vue-productDetail
      v-if="goodsDetailsImgArr.length > 0"
      :imgArr="goodsDetailsImgArr"
    />
    <div class="list-div"></div>
    <div class="footer">
      <!-- <vue-goodsAction :joinCar="joinCars" :carCount="carCount.toString()" /> -->
      <van-goods-action>
        <van-goods-action-icon
          icon="home-o"
          text="首页"
          :to="{ name: 'home' }"
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :badge="carCount"
          :to="{ name: 'shoppingCar' }"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="joinCars"
        />
        <van-goods-action-button type="danger" text="立即购买" @click="buy" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { getGoodsDetails } from "../../../../server/goods";
import { getCarCount, joinCar } from "../../../../server/shoppingCar";
import { getNav } from "../../../../server/information";
import { serverIndex } from "../../../../server/serverIndex";
import vueHeader from "../../../public/header";
import vueGoodsAction from "./goodsAction";
import vueRenderGoodsDetails from "./renderGoodsDetails";
import vueEvaluate from "./goodEvaluate";
import vueProductDetail from "./productDetail";
import { Toast, Dialog } from "vant";
export default {
  components: {
    vueHeader,
    vueGoodsAction,
    vueRenderGoodsDetails,
    vueEvaluate,
    vueProductDetail,
  },
  data() {
    return {
      goodData: {},
      swiperData: [],
      goodsDetailsImgArr: [],
      navData: [],
      goodId: "",
      isReady: false,
      NavBar: false,
      count: 1,
      carCount: "0",
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    async getGoodData() {
      let id = this.$route.params.good_id;
      this.goodData = await getGoodsDetails(id);
      this.isReady = true;
      this.swiperData = this.goodData.goodsSwiperArr.split(",");
      this.goodsDetailsImgArr = this.goodData.goodsDetailsImgArr.split(",");
      this.goodsDetailsImgArr.forEach((item, index) => {
        this.goodsDetailsImgArr[index] = serverIndex + item;
      });
      this.swiperData.forEach((item, index) => {
        this.swiperData[index] = serverIndex + item;
      });
    },
    async getNavData() {
      const res = await getNav();
      this.navData = res;
    },
    showNavbar() {
      this.NavBar = !this.NavBar;
    },
    clickJian() {
      if (this.count == 0) return;
      this.count--;
    },
    clickjia() {
      this.count++;
    },
    async joinCars() {
      const token = localStorage.getItem("token");
      const id = this.goodData.id;
      const price = this.goodData.price;
      let count = this.count;
      if (token) {
        if (count == 0) return;
        const res = await joinCar(token, id, price, count);
        let slef = this;
        if (res.code == 201) {
          Dialog.alert({
            message: "购物车商品数量增加",
          }).then(() => {
            slef.getCarCounts();
          });
        }
        if (res.code == 200) {
          Toast({
            message: "加入购物车成功",
            position: "center",
            type: "success",
          });
          this.getCarCounts()
        }
      } else {
        this.$router.push({ name: "login" });
      }
    },
    async getCarCounts() {
      const token = localStorage.getItem("token");
      const res = await getCarCount(token);
      this.carCount = res.data;
    },
    buy() {
      let order = {
        total: 0,
        goods_count: this.count,
        goods: [],
      };
      order.goods.push(this.goodData);
      order.goods.forEach((item) => {
        order.total = order.goods_count * item.price;
        item.src = serverIndex + item.src;
      });
      if (order.goods_count == 0) {
        Toast.fail("亲，最小商品数量为0！");
        return;
      } else {
        this.$store.commit("changeOrderData", order);
        sessionStorage.setItem("orderData", JSON.stringify(order));
        this.$router.push({ name: "fillOrder" });
      }
    },
  },
  mounted() {
    this.goodId = this.$route.params.good_id.toString();
    this.getGoodData();
    this.getNavData();
    let token = localStorage.getItem("token");
    if (token) {
      this.getCarCounts();
    }
  },
};
</script>

<style lang="scss" scoped>
.goodsDetails {
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
    box-shadow: 0 4px 12px 0 #e9ecf0;
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
  .footer {
    display: flex;
    justify-content: space-between;
  }
  .list-div {
    margin-bottom: 3.75rem;
  }
  .product-des {
    background-color: #ffffff;
    padding: 0.345rem 0.975rem;
    margin-bottom: 0.5175rem;
    font-size: 0.9688rem;
    display: flex;
    .product-destitle {
      width: 14%;
      padding: 0.69rem 0rem;
      line-height: 2rem;
    }
    .product-count {
      box-sizing: border-box;
      width: 86%;
      padding: 0.69rem 0;
      .nmb_jj {
        overflow: hidden;
        margin-left: 0.625rem;
        display: flex;
        .jian {
          border-right: none;
          cursor: pointer;
          color: #999;
          width: 2rem;
          padding: 0;
          background-color: #f5f5f5;
          text-align: center;
          line-height: 2rem;
          border-right: 1px solid #ddd;
        }
        li {
          float: left;
          text-align: center;
          line-height: 1.875rem;
          height: 1.875rem;
          border: 1px solid #ddd;
          font-size: 20px;
        }
        .srkk {
          width: 1.875rem;
          font-size: 1rem;
          border: none;
          line-height: 1.5rem;
          text-align: center;
        }
      }
    }
  }
  .swiper {
    margin-top: 3.125rem;
    width: 100%;
    height: 23.4375rem;
    .my-vant-swiper {
      width: 100%;
      height: 23.4375rem;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>