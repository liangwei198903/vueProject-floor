<template>
  <div class="swiper">
    <van-swipe
      :autoplay="3000"
      width="100%"
      height="11.875rem"
      class="my-vant-swiper"
    >
      <van-swipe-item v-for="(image, index) in bannerData" :key="index">
        <img v-lazy="image.src" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { serverIndex } from "../../../server/serverIndex";
import { getBanner } from "../../../server/home";
export default {
  data() {
    return {
      bannerData: [],
    };
  },
  methods: {
    async getBanners() {
      let res = await getBanner();
      this.bannerData = res;
      this.bannerData.forEach((item, index) => {
        this.bannerData[index].src = serverIndex + this.bannerData[index].src;
      });
    },
  },
  mounted() {
    this.getBanners();
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  margin-top: 3.125rem;
  width: 100%;
  height: 11.875rem;
  .my-vant-swiper {
    width: 100%;
    height: 11.875rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>