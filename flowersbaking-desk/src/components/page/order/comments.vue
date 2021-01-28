// 评论组件
<template>
  <div class="comments">
    <!-- 头部 -->
    <vue-header name="arrow-left" title="评论商品" :handleClick="handleClick">
      <div class="release" @click="release">发布</div>
    </vue-header>
    <div class="comments-content">
      <div class="goods-list" v-if="orderDetailData !== {}">
        <div
          class="goods-item"
          v-for="item in orderDetailData.goods_details.goods"
          :key="item.id"
        >
          <div class="left">
            <img :src="serverIndex+item.src" alt="" />
          </div>
          <div class="right">
            <div class="right-top">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="material">
                {{ item.material }}
              </div>
            </div>
            <div class="right-bottom">
              <span class="price">
                <span class="price"> ￥{{ item.price }} </span>
                <span class="original-price">
                  ￥{{ item.original_price }}
                </span>
              </span>
              <span class="count"> ×{{ item.count ? item.count : 1 }} </span>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <textarea
          name=""
          id=""
          rows="5"
          placeholder="请输入评论内容"
          v-model="release_content"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import vueHeader from "../../public/header";
import {
  getOrderDetail,
  submitComments,
  reviewCompleted,
} from "../../../server/order";
import {serverIndex} from "../../../server/serverIndex"
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      orderDetailData: {
        goods_details: {
          goods: [],
        },
      },
      release_content: "",
      isRelease: Boolean,
      serverIndex:""
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    async getOrderDetailData() {
      let id = this.$route.params.id;
      const res = await getOrderDetail(id);
      this.orderDetailData = res.data[0];
      this.orderDetailData.goods_details = JSON.parse(
        this.orderDetailData.goods_details
      );
    },
    async release() {
      if (this.release_content == "") {
        Dialog({ message: "评论内容不能为空" });
        return;
      }
      let goodsArr = this.orderDetailData.goods_details.goods;
      let token = localStorage.getItem("token");
      goodsArr.forEach(async (item) => {
        let id = item.id;
        let res = await submitComments(id, this.release_content, token);
        if (res.code == 200) {
          this.isRelease = true;
        } else if (res.code == 400) {
          this.isRelease = false;
        }
      });
      if (this.isRelease) {
        let self = this;
        let id = this.orderDetailData.id;
        let token = localStorage.getItem("token");
        const res = await reviewCompleted(id, token);
        if (res.code == 200) {
          Toast({
            message: "感谢评论,订单已完成",
            position: "center",
            type: "success",
            onClose() {
              self.$router.go(-1);
            },
          });
        }
      }
    },
  },
  mounted() {
    this.getOrderDetailData();
    this.serverIndex=serverIndex
  },
};
</script>

<style lang="scss" scoped>
.comments {
  width: 100%;
  height: 100vh;
  .comments-content {
    padding-top: 3.125rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    .goods-list {
      margin-top: 0.69rem;
      width: 100%;
      box-sizing: border-box;
      padding: 0.69rem;
      background-color: #fff;
      .goods-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .left {
          width: 25%;
        }
        .right {
          width: 75%;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          .right-top {
            width: 100%;
            .material {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.875rem;
            }
          }
          .right-bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 20px;
              font-weight: 550;
              color: #ff734c !important;
            }
            .original-price {
              font-size: 14px;
              text-decoration: line-through;
              color: #b4babf;
              margin-left: 0.1725rem;
            }
          }
        }
      }
    }
  }
  .content {
    padding: 0.69rem;
    width: 100%;
    box-sizing: border-box;
    textarea {
      padding: 4px;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .release {
    box-sizing: border-box;
    padding-left: 3.75rem;
  }
}
</style>