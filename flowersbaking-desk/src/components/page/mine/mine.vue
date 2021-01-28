<template>
  <div class="mine">
    <!-- 头部 -->
    <vue-header name="arrow-left" title="个人中心" :handleClick="handleClick" />
    <!-- 内容区域 -->
    <vue-maincont />
  </div>
</template>

<script>
import vueNavbar from "../../public/navbar";
import vueHeader from "../../public/header"
import vueMaincont from "./maincont"
export default {
  components: {
    vueNavbar,
    vueHeader,
    vueMaincont
  },
  data(){
    return{
      
    }
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.mine{
  width: 100%;
}
</style>