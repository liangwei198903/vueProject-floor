// 支付方式
<template>
  <div class="pay-way">
    <div class="titel">支付方式</div>
    <div class="template-checkbox payment-checkbox" @click="setPayMethods(1)">
      <div>
        <i class="pay-methods wx"></i>
        <span class="text"> 微信 </span>
      </div>
      <div class="template-checkbox-arrow" v-if="payMethods == 1">
        <i class="iconfont icon-dui text-primary"></i>
      </div>
    </div>
    <div class="template-checkbox payment-checkbox" @click="setPayMethods(2)">
      <div>
        <i class="pay-methods zfb"></i>
        <span class="text"> 支付宝 </span>
      </div>
      <div class="template-checkbox-arrow" v-if="payMethods == 2">
        <i class="iconfont icon-dui text-primary"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payMethods: 1,
    };
  },
  methods: {
    setPayMethods(i) {
      this.payMethods = i;
      sessionStorage.setItem("payMethods",this.payMethods)
    },
  },
  mounted(){
    sessionStorage.setItem("payMethods",this.payMethods)
  }
};
</script>

<style lang="scss" scoped>
.pay-way {
  padding: 0.69rem;
  margin-bottom: 0.69rem;
  background-color: #ffffff;
  border-radius: 5px;
  .titel {
    padding-bottom: 6px;
  }
  .template-checkbox {
    padding: 4px 0 !important;
    display: flex;
    justify-content: space-between;
    font-size: 0.966rem;
    border-top: 1px solid #f7f9fa;
    background-color: #fff;
    .pay-methods {
      width: 1.375rem;
      height: 1.375rem;
      display: inline-block;
      vertical-align: bottom;
    }
    .wx {
      background: url(https://www.dinghuale.com/public/images/weixin.png)
        no-repeat center;
      background-size: cover;
    }
    .zfb {
      background: url(https://www.dinghuale.com/public/images/zhifuboa.png)
        no-repeat center;
      background-size: cover;
    }
    .text {
      padding-left: 0.9375rem;
    }
    .template-checkbox-arrow {
      padding-top: 3px;
      margin-left: 8px;
      box-sizing: border-box;
      .text-primary {
        color: #ff734c;
        font-size: 0.9656rem;
      }
    }
  }
}
</style>