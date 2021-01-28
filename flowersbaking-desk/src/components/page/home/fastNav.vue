<template>
  <div class="fastNav">
    <div class="imgNav-title">
      <p class="imgNav-title-txt">一秒选花</p>
    </div>
    <div class="imgNav-list flex-default">
      <a
        class="imgNav-item"
        v-for="item in imgNavData.slice(0, 3)"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        <img v-lazy="item.src" alt="" />
        <p class="imgNav-text" :class="`bg-${item.id}`">{{ item.title }}</p>
      </a>
    </div>
    <div class="imgNav-list flex-default">
      <a
        v-for="item in imgNavData.slice(3)"
        :key="item.id"
        class="imgNav-item-2 bg-4"
        @click="handleClick(item.id)"
      >
        <p class="imgNav-text">{{ item.title }}</p>
        <img v-lazy="item.src" alt="" />
      </a>
    </div>
  </div>
</template>

<script>
import {serverIndex} from "../../../server/serverIndex"
import { getImgNav } from "../../../server/home";
export default {
  data() {
    return {
      imgNavData: [],
    };
  },
  methods: {
    async getImgNav() {
      const res = await getImgNav();
      this.imgNavData = res;
      this.imgNavData.forEach((item,index)=>{
        this.imgNavData[index].src=serverIndex+this.imgNavData[index].src
      })
    },
    handleClick(id){
      this.$router.push({name:"quick-select",params:{sid:id}})
    }
  },
  mounted() {
    this.getImgNav();
  },
};
</script>

<style lang="scss" scoped>
.fastNav {
  background-color: #fff;
  width: 100%;
  margin-top: 0.625rem;
  padding: 0.625rem;
  box-sizing: border-box;
  .imgNav-title {
    margin-bottom: 0.625rem;
    .imgNav-title-txt {
      border-left: 0.1875rem solid rgb(136, 78, 34);
      padding-left: 0.625rem;
      height: 0.9375rem;
      font-weight: 600;
      color: rgb(136, 78, 34);
      font-size: 0.3rem;
      line-height: 0.9375rem;
    }
    .imgNav-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.625rem 0;
    }
  }
  .imgNav-item {
    width:30%;
    height: 7.8125rem;
    overflow: hidden;
    border-radius: 0.3125rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
      -ms-interpolation-mode: bicubic;
    }
    p {
      height: 1.875rem;
      width: 100%;
      line-height: 1.875rem;
      text-align: center;
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      font-weight: 600;
      letter-spacing: 0.04rem;
    }
    p.bg-1 {
      background-color: rgb(255, 175, 178);
    }
    p.bg-2 {
      background-color: rgb(126, 178, 84);
    }
    p.bg-3 {
      background-color: rgb(241, 191, 147);
    }
  }
  .imgNav-item-2 {
    margin-top: 0.625rem;
    width: 5.3125rem;
    height: 6.625rem;
    border-radius: 0.3125rem;
    text-align: center;
    background-color: rgb(243, 235, 227);
    p.imgNav-text {
      text-align: center;
      font-weight: 600;
      color: rgb(136, 78, 34);
      padding-top: 0.2rem;
      padding-bottom: 0.1rem;
    }
  }
}
</style>