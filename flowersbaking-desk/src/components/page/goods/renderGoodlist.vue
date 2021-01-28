<template>
  <div class="renderGoodlist">
    <div class="goods-list">
      <div
        class="goods-list-item"
        v-for="item in detailsData"
        :key="item.id"
        @click="goGoodsDetails(item.id)"
      >
   
        <a>
          <div class="goods-item-pic">
            <img v-lazy="item.src" alt="" :key="item.src" />
          </div>
          <div class="goods-item-des">
            <p class="minifont">
              {{ item.name }}
            </p>
            <div class="salsList">
              <p class="redfont">￥{{ item.price }}</p>
              <p class="blackfont">销量{{ item.sales }}笔</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsData: {
      type: Array,
    },
  },
  data() {
    return {
      detailsData: [],
    };
  },
  methods: {
    goGoodsDetails(id) {
      this.$router.push({ name: "goodsDetails", params: { good_id: id } });
    },
  },
  mounted() {
    this.detailsData = this.goodsData;
  },
  watch: {
    goodsData() {
      this.detailsData = this.goodsData;
    },
  },
};
</script>

<style lang="scss" scoped>
.renderGoodlist {
  width: 100%;
  padding: 0.6875rem;
  box-sizing: border-box;
  background-color: #e9ecf0;
  .goods-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .goods-list-item {
      width: 49%;
      background-color: #ffffff;
      border-radius: 0.3125rem;
      margin-bottom: 1vh;
      a {
        text-decoration: none;
        color: #333;
        font-family: "Microsoft YaHei", Tahoma, Arial, sans-serif;
        display: block;
        .goods-item-pic {
          img {
            width: 100%;
          }
        }
        .goods-item-des {
          width: 100%;
          padding: 0.6875rem;
          box-sizing: border-box;
          .minifont {
            font-size: 0.875rem;
            overflow: hidden;
            margin: 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #777777;
          }
          .salsList {
            display: flex;
            margin: 0;
            justify-content: space-between;
            .redfont {
              color: #ff734c;
              margin: 0;
            }
            .blackfont {
              color: #ccc;
              margin: 0;
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
}
</style>