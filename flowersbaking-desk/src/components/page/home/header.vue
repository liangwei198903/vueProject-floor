<template>
  <div class="header" :style="{background:background}">
    <div class="left">
      <van-icon :name="name" size="1.875rem" @click="handleClick" v-if="name!==''" />
    </div>
    <div class="content"><img class="my-logo" :src="logoSrc" alt=""></div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {serverIndex} from "../../../server/serverIndex"
export default {
  props: {
    handleClick: {
      type: Function,
      required: true,
    },
    name: {
      type: String,
       default: "",
    },
    background:{
      type: String,
      default: "#fff",
    }
  },
  data(){
    return{
      logoSrc:""
    }
  },
  mounted(){
    this.logoSrc=serverIndex+"/img/common/logo.png"
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 3.125rem;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  z-index: 1000;
  justify-content: space-between;
  .left,
  .content,
  .right {
    height: 100%;
    line-height: 3.125rem;
  }
  .left {
    box-sizing: border-box;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
  .left,
  .right {
    width: 30%;
  }
  .content {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .my-logo{
      width: 4.0625rem;
      height: 3.125rem;
      text-align: center;
    }
  }
}
</style>