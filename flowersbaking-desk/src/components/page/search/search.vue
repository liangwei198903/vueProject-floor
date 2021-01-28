<template>
  <div class="search">
    <div class="header">
      <van-search
        v-model="keyword"
        shape="round"
        background="#fff"
        show-action
        action-text="返回"
        placeholder="搜索鲜花、蛋糕、礼品"
        :autofocus="true"
        @input="handleInput"
        @cancel="handleCancel"
      />
    </div>
    <div class="fast" v-if="goodsData.length == 0">
      <div class="title">热门搜索</div>
      <div class="keyword">
        <span
          class="searchingadvice-item"
          v-for="(item, index) in hotKeyword"
          :key="index"
          @click="hotworkSearch(item)"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div class="result" v-else>
      <vue-renderGoodlist v-if="goodsData.length>0" :goodsData="goodsData" />
    </div>
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import vueRenderGoodlist from "../goods/renderGoodlist";
import { getSearchHot, getSearch } from "../../../server/goods";
import { serverIndex } from "../../../server/serverIndex";
export default {
  components: {
    vueHeader,
    vueRenderGoodlist,
  },
  data() {
    return {
      keyword: "",
      isInput: true,
      hotKeyword: ["红玫瑰", "百合", "康乃馨", "99枝"],
      goodsData: [],
    };
  },
  methods: {
    handleInput() {
      var that = this;
      if (!that.isInput) {
        return;
      }
      if (this.keyword.trim() == "") {
        this.goodsData = [];
        return
      }
      that.isInput = false;
      setTimeout(() => {
        this.getSearch(this.keyword);
        that.isInput = true;
      }, 1000);
    },

    handleCancel() {
      this.$router.go(-1);
    },
    async getSearch(keyword) {
      this.goodsData = await getSearch(keyword);
      this.goodsData.forEach((item) => {
        item.src = serverIndex + item.src;
      });
    },
    async hotworkSearch(keyword) {
      this.goodsData = await getSearchHot(keyword);
      this.goodsData.forEach((item) => {
        item.src = serverIndex + item.src;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #fff;
  height: 100vh;
  .header {
    border-bottom: 2px solid #f1f3f6;
  }
  .fast {
    padding: 1.0313rem;
    box-sizing: border-box;
    .keyword {
      margin-top: 0.3125rem;
      .searchingadvice-item {
        padding: 0.5175rem;
        background-color: #e9ecf0;
        margin-bottom: 0.69rem;
        margin-right: 0.69rem;
        display: inline-block;
        font-size: 13px;
      }
    }
  }
}
</style>