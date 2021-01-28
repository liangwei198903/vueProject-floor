<template>
  <div class="quickFliter">
    <div class="fliter-list">
      <div
        class="fliter-item"
        :class="index == 0 ? 'flitercheck' : ''"
        v-for="(item, index) in nav"
        :key="index"
        @click="getComprehensive($event, index)"
        ref="fliterItem"
      >
        <a>
          {{ item }}
          <i class="iconfont icon-paixu-" v-show="index > 1"></i>
        </a>
      </div>
    </div>
    <vue-renderGoodeslist
      :goodsData="detailsData"
      v-if="detailsData.length > 0"
    />
  </div>
</template>

<script>
import { getsuitable_sceneData } from "../../../server/goods";
import { serverIndex } from "../../../server/serverIndex";
import vueRenderGoodeslist from "./renderGoodlist";
export default {
  components: {
    vueRenderGoodeslist,
  },
  data() {
    return {
      nav: ["综合", "售量", "价格"],
      detailsData: [],
      baseDataTailsData: [],
      isAscending: true,
    };
  },
  methods: {
    getComprehensive(e, index) {
      this.$refs.fliterItem.forEach((item) => {
        item.className = "fliter-item";
      });
      this.$refs.fliterItem[index].className = "fliter-item flitercheck";
      if (index == 0) {
        this.getDetailsData();
      }
      if (index == 1) {
        this.salesOrder();
      }
      if (index == 2) {
        this.isAscending = !this.isAscending;
        this.priceOrder();
      }
    },
    async getDetailsData() {
      this.detailsData = await getsuitable_sceneData(this.$route.params.sid);
      this.detailsData.forEach((item, index) => {
        this.detailsData[index].src = serverIndex + this.detailsData[index].src;
      });
      this.baseDataTailsData = this.detailsData;
    },
    salesOrder() {
      this.detailsData.sort((a, b) => {
        return b.sales - a.sales;
      });
    },
    priceOrder() {
      if (this.isAscending) {
        this.detailsData.sort((a, b) => {
          return b.price - a.price;
        });
      } else {
        this.detailsData.sort((a, b) => {
          return a.price - b.price;
        });
      }
    },
  },
  mounted() {
    this.getDetailsData();
  },
};
</script>

<style lang="scss" scoped>
.quickFliter {
  .fliter-list {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #fff;
    margin-top: 3.125rem;
    height: 2.8225rem;
    background-color: #fff;
  }
  .fliter-item {
    width: 33.33%;
    height: 2.8225rem;
    line-height: 2.8225rem;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }
  .flitercheck {
    a {
      color: #884e22;
    }
  }
}
</style>