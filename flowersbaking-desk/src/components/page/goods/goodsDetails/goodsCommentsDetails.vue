// 商品评论详情列表
<template>
  <div class="goodsCommentsDetails">
    <vue-header name="arrow-left" title="客户评论" :handleClick="handleClick" />
    <div class="list">
      <div class="list-top">
        <span>最近已有</span>
        <span class="redFont">{{ evaluateData.length }}</span>
        <span>人评价</span>
      </div>
      <div class="comments-listbody" v-if="evaluateData.length > 0">
        <div
          class="comments-item"
          v-for="(item, index) in evaluateData"
          :key="index"
        >
          <div class="comments-item-head">
            <div class="comments-itemhead-userinfo">
              <div class="comments-itemhead-touxiang">
                <img :src="item.userImg" alt="" />
              </div>
              <div class="comments-itemhead-name">
                {{ item.username }}
              </div>
            </div>
            <div class="comments-itemhead-star">
              <i class="iconfont icon-shoucang-copy"></i>
            </div>
          </div>
          <div class="comments-item-body">
            <div class="comments-itembody-text">
              {{ item.comments_content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueHeader from "../../../public/header";
import { getComments } from "../../../../server/comments";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      evaluateData: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    async getComments() {
      let good_id = this.$route.params.id;
      const res = await getComments(good_id);
      this.evaluateData = res.data;
      this.evaluateData.forEach((item) => {
        item.userImg = "https://www.dinghuale.com/public/images/morenTou.png";
      });
    },
  },
  mounted() {
    this.getComments();
  },
};
</script>

<style lang="scss" scoped>
.goodsCommentsDetails {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  .list {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 3.125rem;
    .list-top {
      padding: 1.035rem 0.69rem;
      box-sizing: border-box;
      border-bottom: 1px solid #e4e4e4;
      color: #555;
      .redFont {
        color: #f60;
      }
    }
    .comments-listbody {
      .comments-item {
        padding: 0.345rem 1.035rem;
        border-bottom: 0.0625rem solid #e9ecf0;
        .comments-item-head {
          display: flex;
          justify-content: space-between;
          padding: 0.69rem 0;
          .comments-itemhead-userinfo {
            display: flex;
            .comments-itemhead-touxiang {
              width: 1.3799rem;
            }
            .comments-itemhead-name {
              padding-left: 1.25rem;
            }
          }
        }
        .comments-item-body {
          padding-top: 0.345rem;
          padding-bottom: 0.69rem;
        }
      }
    }
  }
}
</style>