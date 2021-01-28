<template>
  <div class="home">
    <!-- 头部 -->
    <vue-header :name="headerName" :handleClick="handleClick" />
    <!-- 轮播图 -->
    <vue-swiper />
    <!-- 导航区域 -->
    <div class="index-ensure flex-default">
      <div class="ensure-item flex-center">
        <van-icon name="checked" size=".24rem" />
        <span class="text"> 品牌鲜花网 </span>
      </div>
      <div class="ensure-item flex-center">
        <van-icon name="checked" size=".24rem" />
        <span class="text"> 实拍秀 </span>
      </div>
      <div class="ensure-item flex-center">
        <van-icon name="checked" size=".24rem" />
        <span class="text"> 1小时送达 </span>
      </div>
      <div class="ensure-item flex-center">
        <van-icon name="checked" size=".24rem" />
        <span class="text"> 50w+好评 </span>
      </div>
    </div>
    <vue-homeNav />
    <!-- 快速导航 -->
    <vue-fastNav />
    <!-- 模块区域 -->
    <div class="module">
      <vue-module
        v-for="item in GoodsType"
        :key="item.good_tag_id"
        :title="item.name"
        :tagId="item.good_tag_id.toString()"
      />
    </div>
    <div class="last-div"></div>
    <vue-navbar />
  </div>
</template>

<script>
import vueHeader from "./header";
import vueSwiper from "./headerSwiper";
import vueHomeNav from "./homeNav";
import vueFastNav from "./fastNav";
import vueModule from "./module";
import { getGoodsType } from "../../../server/home";
import vueNavbar from "../../public/navbar";
export default {
  components: {
    vueHeader,
    vueSwiper,
    vueHomeNav,
    vueFastNav,
    vueModule,
    vueNavbar,
  },
  data() {
    return {
      headerName: "search",
      bannerData: [],
      GoodsType: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.push({ name: "search" });
    },
    async getGoodsType() {
      this.GoodsType = await getGoodsType();
    },
  },
  mounted() {
    this.getGoodsType();
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  margin: 0 auto;
  .index-ensure {
    width: 100%;
    padding: 0.9375rem;
    background-color: #fff;
    box-sizing: border-box;
    .text {
      font-size: 0.24rem;
    }
  }
  .flex-default {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .last-div {
    margin-bottom: 3.125rem;
  }
}
</style>