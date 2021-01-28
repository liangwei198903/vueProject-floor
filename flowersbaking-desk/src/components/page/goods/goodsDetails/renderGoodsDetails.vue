<template>
  <div class="renderGoodsDetails">
    <div class="proinfo">
      <div class="proinfo-head">
        {{ goodsData.name }}
      </div>
      <div class="proinfo-body">
        <div class="proinfo-bodyleft">
          <p class="fontone redcolor">￥{{ goodsData.price }}</p>
          <p class="fonttwe">
            ￥<span class="price">
              {{ goodsData.original_price }}
            </span>
          </p>
        </div>
        <div class="proinfo-bodyright">
          <p class="fontthree">已售{{ goodsData.sales }}笔</p>
        </div>
      </div>
    </div>
    <div class="product-des">
      <div class="product-desitem">
        <div class="product-destitle">材料</div>
        <div class="product-desbody">
          {{ goodsData.material }}
        </div>
      </div>
      <div class="product-desitem">
        <div class="product-destitle">包装</div>
        <div class="product-desbody">
          {{ goodsData.packaging }}
        </div>
      </div>
      <div class="product-desitem">
        <div class="product-destitle">配送</div>
        <div class="product-desbody">
          {{ goodsData.distribution }}
        </div>
      </div>
      <div class="product-desitem">
        <div class="product-destitle">附送</div>
        <div class="product-desbody">
          {{ goodsData.attached }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
    },
  },
  data() {
    return {
      goodsData: [],
    };
  },
  created() {
    this.goodsData = this.goods;
  },
};
</script>
<style lang="scss" scoped>
.renderGoodsDetails {
  .proinfo {
    background-color: #ffffff;
    padding: 1.035rem;
    border-bottom: 1px solid #e9ecf0;
    .proinfo-head {
      display: flex;
      justify-content: space-between;
    }
    .proinfo-body {
      display: flex;
      justify-content: space-between;
      padding-top: 1.035rem;
      .proinfo-bodyleft {
        display: flex;
        align-items: center;
        .fonttwe {
          font-size: 0.875rem;
          text-decoration: line-through;
          color: #b4babf;
          margin-left: 0.1725rem;
        }
      }
      .proinfo-bodyright {
        display: flex;
        align-items: center;
        .fontthree {
          font-size: 10px;
        }
      }
      .fontone {
        font-size: 1.25rem;
        font-weight: 550;
      }
      .redcolor {
        color: #ff734c;
      }
    }
  }
  .product-des {
    background-color: #ffffff;
    padding: 0.345rem 1.035rem;
    margin-bottom: 0.5175rem;
    font-size: 0.9375rem;
    .product-desitem {
      display: flex;
      justify-content: space-between;
      .product-destitle {
        width: 14%;
        padding: 0.69rem 0rem;
      }
      .product-desbody {
        width: 84%;
        border-bottom: 0.0625rem solid #e9ecf0;
        padding: 0.69rem 0rem;
      }
    }
  }
}
</style>