<template>
  <div class="header">
    <van-search
      v-model="value"
      shape="round"
      background="#fff"
      placeholder="搜索鲜花、蛋糕、礼品"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 2px solid #f1f3f6;
}
</style>