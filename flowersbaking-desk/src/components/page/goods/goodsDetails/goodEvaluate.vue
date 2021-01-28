<template>
  <div class="goodEvaluate">
    <div class="comments-head">
      <div class="comments-head-title">
        <p>订单评价</p>
      </div>
      <div class="comments-head-body">
        <a>
          <span @click="goGoodsCommentsDetails"> 最近已有{{ evaluateData.length }}条评论 </span>
          <i class="iconfont icon-xialayou"></i>
        </a>
      </div>
    </div>
    <div class="comments-listbody" v-if="evaluateData.length > 0">
      <div
        class="comments-item"
        v-for="(item, index) in evaluateData.slice(0, 2)"
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
    <div class="noevaluae" v-else>暂无评价</div>
    <div class="morereviews" v-if="evaluateData.length > 0">
      <a>
        <div>
          <span @click="goGoodsCommentsDetails">查看更多评价</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { getComments } from "../../../../server/comments";
export default {
  props: {
    goodId: {
      type: Number,
    },
  },
  data() {
    return {
      evaluateData: [],
    };
  },
  methods: {
    async getComments() {
      let good_id = this.$route.params.good_id;
      const res = await getComments(good_id);
      this.evaluateData = res.data;
      this.evaluateData.forEach((item) => {
        item.userImg = "https://www.dinghuale.com/public/images/morenTou.png";
      });
    },
    goGoodsCommentsDetails(){
      let good_id = this.$route.params.good_id;
      this.$router.push({name:"goodsCommentsDetails",params:{id:good_id}})
    }
  },
  mounted() {
    this.getComments();
  },
};
</script>

<style lang="scss" scoped>
.goodEvaluate {
  background-color: #ffffff;
  margin-bottom: 0.5175rem;
  .comments-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.0625rem solid #e9ecf0;
    padding: 1.035rem;
    .comments-head-title {
      font-size: 1.09rem;
    }
    .comments-head-body {
      font-size: 0.7894rem;
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
  .morereviews {
    display: flex;
    padding-top: 1.035rem;
    padding-bottom: 2.07rem;
    justify-content: center;
    a {
      background: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      div {
        padding: 0.345rem;
        border: 1px solid #232628;
        font-size: 0.75rem;
        color: #232628;
      }
    }
  }
  .noevaluae {
    text-align: center;
    padding: 3.125rem 1.035rem;
  }
}
</style>