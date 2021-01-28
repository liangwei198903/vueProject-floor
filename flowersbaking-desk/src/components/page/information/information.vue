<template>
  <div class="classification">
    <!-- 头部搜索栏 -->
    <vue-header @click="handleClick" />
    <vue-content />
  </div>
</template>

<script>
import vueHeader from "./header";
import vueContent from "./content";
export default {
  components: {
    vueHeader,
    vueContent,
  },
  methods: {
    handleClick() {
      this.$router.push({ name: "search" });
    },
  },
};
</script>

<style>
</style>