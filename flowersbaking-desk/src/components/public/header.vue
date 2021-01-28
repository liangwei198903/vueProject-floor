<template>
  <div class="header" :style="{background:background}">
    <div class="left">
      <van-icon :name="name" size="1.875rem" @click="handleClick" v-if="name!==''" />
    </div>
    <div class="content">{{ title }}</div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    handleClick: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      default: "",
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
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>