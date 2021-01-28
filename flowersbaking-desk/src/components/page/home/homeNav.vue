<template>
  <div class="homeFastNav">
    <div class="nav-list flex-default">
      <a
        class="nav-item"
        v-for="(item, index) in homeFastNavData"
        :key="index"
        @click="goDetails(item.good_type_id)"
      >
        <img  v-lazy="item.imgSrc" alt="" />
        <p>{{ item.name }}</p>
      </a>
    </div>
  </div>
</template>

<script>
import { serverIndex } from "../../../server/serverIndex";
import {getNav} from "../../../server/home"
export default {
  data() {
    return {
      homeFastNavData: [],
    };
  },
  methods: {
    async getFastNavs() {
      let res = await getNav();
      this.homeFastNavData = res;
      this.homeFastNavData.forEach((item,index)=>{
        this.homeFastNavData[index].imgSrc=serverIndex+this.homeFastNavData[index].imgSrc
      })
    },
    goDetails(item){
      this.$router.push({name:"goodsDetailsList",params:{good_type:item.toString()}})
    }
  },
  mounted() {
    this.getFastNavs();
  },
};
</script>

<style lang="scss" scoped>
.homeFastNav {
  width: 100%;
  .nav-list {
    padding: 0.9375rem;
    padding-top: 0;
    background-color: #fff;
    .nav-item {
      text-align: center;
      img {
        width: 2.5rem;
        display: inline-block;
      }
      p {
        margin: 0;
        padding: 0;
        color: #333;
        font-size: 0.875rem;
      }
    }
  }
  .flex-default {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>