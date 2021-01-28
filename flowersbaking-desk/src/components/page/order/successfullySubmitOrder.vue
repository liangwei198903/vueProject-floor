<template>
  <div class="successfully-submit-order">
    <div class="header">
      <vueHeader
        name="arrow-left"
        title="支付成功"
        :handleClick="handleClick"
      />
    </div>
    <div class="content">
      <van-empty description="支付成功" image-size="5rem" :image="imgSrc">
        <div class="btn-box">
          <van-button class="btn" type="danger" @click="goOrder" >查看订单</van-button>
          <van-button class="btn" type="default" @click="goHome">返回主页</van-button>
        </div>
      </van-empty>
    </div>
  </div>
</template>

<script>
import { serverIndex } from "../../../server/serverIndex";
import vueHeader from "../../public/header";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      imgSrc: "/img/common/success.png",
    };
  },
  methods: {
    handleClick() {
        this.$router.go(-2)
    },
    goOrder(){
        this.$router.replace({ name: "myOrder", params: { status: 0 } });
    },
    goHome(){
        this.$router.replace({name:"home"})
    }
  },
  mounted() {
    this.imgSrc = serverIndex + this.imgSrc;
  },
};
</script>

<style lang="scss" scoped>
.successfully-submit-order {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .content {
      padding-top: 50px;
      box-sizing: border-box;
      height: 100%;
    .btn-box {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .btn {
        width: 18.75rem;
        height: 2.5rem;
        border-radius: 0.3125rem;
        margin-top: 0.69rem;
      }
    }
  }
}
</style>