<template>
  <div class="productDetail">
    <div class="graphicDetails-head">产品详情</div>
    <div class="graphicDetails-body">
        <img v-for="(item,index) in imgArrs" :key="index" v-lazy="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgArr: { type: Array },
  },
  data() {
    return {
      imgArrs: [],
    };
  },
  mounted() {
    this.imgArrs = this.imgArr;
  },
};
</script>

<style lang="scss" scoped>
.productDetail {
  background-color: #fff;
  .graphicDetails-head {
    padding: 0.9725rem;
    font-size: 1.035rem;
  }
  .graphicDetails-body{
      width: 100%;
  }
}
</style>