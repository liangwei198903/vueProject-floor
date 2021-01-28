<template>
  <div class="navbar">
    <router-link class="mylink" to="/home" :class="{home:this.$route.fullPath.includes('/home')}">
      <div>
        <i class="iconfont icon-shouye"></i>
      </div>
      <span class="text"> 首页 </span>
    </router-link>
    <router-link class="mylink" v-if="data.length>0" :to="`/information/details/${data[0].catid}/${data[0].name}`" :class="{information:this.$route.fullPath.includes('/information')}">
      <div>
        <i class="iconfont iconfont icon-fenlei"></i>
      </div>
      <span class="text"> 资讯 </span>
    </router-link>
    <router-link class="mylink" to="/shoppingCar" :class="{shoppingCar:this.$route.fullPath.includes('/shoppingCar')}">
      <div>
        <i class="iconfont icon-gouwuche"></i>
      </div>
      <span class="text"> 购物车 </span>
    </router-link>
    <router-link class="mylink" to="/mine" :class="{mine:this.$route.fullPath.includes('/mine')}">
      <div>
        <i class="iconfont icon-wode"></i>
      </div>
      <span class="text"> 我的 </span>
    </router-link>
  </div>
</template>

<script>
import { getNav } from "../../server/information";
export default {
  data() {
    return {
      active: 0,
      data: [],
    };
  },
  methods: {
    async getData() {
      const res = await getNav();
      this.data = res;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss">
.navbar {
  position: fixed;
  bottom: 0;
  left:0;
  z-index: 1000;
  height: 3.125rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  box-sizing: border-box;
  padding:0.1875rem 0;
  .mylink {
    width: 25%;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    div {
      width: 100%;
      i {
        font-size: 1.5rem;
      }
    }
  }
  .home,.information,.shoppingCar,.mine {
    div {
      i {
        color: #ad2a70;
      }
    }
    .text {
      color: #ad2a70;
    }
  }
}
</style>