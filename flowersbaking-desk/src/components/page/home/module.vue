<template>
  <div class="module">
    <div class="module-title">
      <p>
        {{ title }}
      </p>
      <span class="module-title-line"></span>
    </div>
    <div class="module-list flex-default">
      <a class="pro-item" v-for="item in data" :key="item.id" @click="gogoodsDetails(item.id)">
        <img v-lazy="item.src" alt="" />
        <p class="one-txt-cut">{{ item.name }}</p>
        <div class="pro-bottom flex-default">
          <p class="pro-price">￥{{ item.price.toFixed(2) }}</p>
          <span class="font24 color-9">销量{{ item.sales }}笔</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { serverIndex } from "../../../server/serverIndex";
import { getModule } from "../../../server/home";
export default {
  props: {
    title: {
      type: String,
    },
    tagId:{
      type: String,
    }
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async getData() {
      const res = await getModule(this.tagId);
      res.forEach((item,index)=>{
        if(item.isIndexShow==1){
          res[index].src = serverIndex + res[index].src;
          this.data.push(item)
        }
      })
    },
    gogoodsDetails(id){
      this.$router.push({name:"goodsDetails",params:{good_id:id}})
    }
  },
  mounted() {
    this.getData();
  },
};

</script>

<style lang="scss" scoped>
.module {
  margin-top: 0.625rem;
  padding-top: 0.9375rem;
  padding-bottom: 0.9375rem;
  background-color: #fff;
  .module-title {
    text-align: center;
    font-weight: 600;
    padding-bottom: 0.9375rem;
    // margin-top: 2vh;
    p {
      font-size: 1.0313rem;
    }
    .module-title-line {
      display: block;
      width: 4rem;
      height: 0.1875rem;
      border-radius: 0.0938rem;
      background-color: rgb(136, 78, 34);
      margin: 0.1rem auto;
    }
  }
  .module-list {
    flex-wrap: wrap;
    padding: 0 1.035rem;
    a.pro-item {
      width: 49%;
      background-color: #fff;
      border-radius: 0.1rem;
      margin-top: 0.3rem;
      border-radius: 10px;
      .one-txt-cut {
        color: #666;
        margin: 0.345rem 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .flex-default {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .pro-price {
          font-size: 0.9784rem;
          color: #f43;
          font-weight: 600;
        }
        .color-9 {
          color: #999;
        }
        .font24 {
          font-size: 13.248px;
        }
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