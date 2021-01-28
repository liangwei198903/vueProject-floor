<template>
  <div class="informationDetail">
    <div class="header">
      <vue-header
        name="arrow-left"
        :title="data.title"
        :handleClick="handleClick"
      />
    </div>
    <div class="content">
      <img :src="data.title_img" alt="" />
      <div class="text" v-html="data.details"></div>
    </div>
    <div class="margin-bottom"></div>
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import { getArticleitem } from "../../../server/information";
import { serverIndex } from "../../../server/serverIndex";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    async getArticleitems() {
      let id = this.$route.params.infoId;
      this.data = await getArticleitem(id);
      this.data.title_img = serverIndex + this.data.title_img;
    },
  },
  mounted() {
    this.getArticleitems();
  },
};
</script>

<style lang="scss" scoped>
.informationDetail {
  background-color: #fff;
  height: 100%;
  .content {
    margin-top: 3.125rem;
    font-size: 0.9375rem;
    box-sizing: border-box;
    padding:0.9375rem ;
    padding-top: 0;
    img {
      height: 18.75rem;
    }
    .text {
        padding-top: 10px;
      p.mytext {
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 28px;
        letter-spacing: 1px;
        color: #666666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
        overflow: hidden;
        text-indent: 2em;
      }
    }
  }
  .margin-bottom{
    margin-bottom: 3.125rem;
  }
}
</style>