<template>
  <div class="shopping-car-list">
    <div v-if="cardata.length > 0" class="car">
      <div
        class="shopping-car-item"
        v-for="(item, index) in cardata"
        :key="item.id"
      >
        <div class="checkbox">
          <input
            type="checkbox"
            v-model="item.ischecked"
            @click="handleChange(item)"
          />
        </div>
        <van-swipe-cell class="mygoods-card">
          <van-card
            :num="item.count"
            :price="item.g_price"
            :desc="item.name"
            :title="item.material"
            class="goods-card"
            :thumb="item.src"
            :origin-price="item.original_price"
          />
          <template #right>
            <div class="card-right">
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="showDelete(item.id)"
              />
              <van-button
                square
                text="修改数量"
                type="info"
                class="delete-button"
                @click="showChangeCount(item, index)"
              />
            </div>
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <div class="noData" v-else>
      <div class="img">
        <van-empty
          class="custom-image"
          :image="carImg"
          image-size="8.75rem"
          description="购物车暂无商品"
        />
        <div class="selected-items">
          <router-link :to="{ name: 'home' }">去逛逛</router-link>
        </div>
      </div>
    </div>

    <van-submit-bar :price="total" button-text="去结算" @submit="submitOrder">
      <div @click="checkall">
        <input type="checkbox" v-model="checked" class="checkall" />
        <span class="checkall-span">全选</span>
      </div>
    </van-submit-bar>

    <van-dialog
      v-model="changeCount"
      title="修改数量"
      class="changeCount-box"
      show-cancel-button
      @confirm="submitCount"
    >
      <div>
        <ul class="showChangeCount-ul">
          <li class="jia" @click="add">+</li>
          <li>
            <input type="text" v-model="count" />
          </li>
          <li class="jia jian" @click="less">-</li>
        </ul>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { serverIndex } from "../../../server/serverIndex";
import { getCarData, deleteItem,updateCount } from "../../../server/shoppingCar";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      cardata: [],
      checked: false,
      total: 0,
      carImg: "/img/common/nocar.png",
      changeCount: false,
      count: 0,
      goodsIndex: 0,
      carId:0
    };
  },
  methods: {
    handleChange(item) {
      item.ischecked = !item.ischecked;
      this.checked = false;
    },
    checkall() {
      this.checked = !this.checked;
      this.cardata.forEach((item) => {
        item.ischecked = this.checked;
      });
    },
    totalPrice() {
      let total = 0;
      this.cardata.forEach((item) => {
        if (item.ischecked) {
          total += item.count * item.price;
        }
      });
      this.total = total * 100;
    },
    async getCarDatas() {
      const token = localStorage.getItem("token");
      const res = await getCarData(token);
      res.data.forEach((item) => {
        item.src = serverIndex + item.src;
        item.ischecked = false;
      });
      this.cardata = res.data;
    },
    showDelete(id) {
      Dialog.confirm({
        message: "亲，您确定要删除该商品吗？",
      })
        .then(async () => {
          // on confirm
          const res = await this.deleteItem(id);
          if (res.code == 200) {
            this.getCarDatas();
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    async deleteItem(id) {
      const res = await deleteItem(id);
      return res;
    },
    showChangeCount(item, index) {
      this.goodsIndex = index;
      this.changeCount = true;
      this.count = item.count;
      this.carId=item.id
    },
    async submitCount() {
      let index =this.goodsIndex
      this.cardata[index].count=this.count;
      let carId=this.carId;
      let count =this.count;
      let token =localStorage.getItem("token")
      const res =await updateCount(token,carId,count);
    },
    add() {
      this.count++;
    },
    less() {
      if (this.count <= 1) return;
      this.count--;
    },
    submitOrder() {
      let order = {
        total: this.total / 100,
        goods_count: 0,
        goods: [],
      };
      this.cardata.forEach((item) => {
        order.goods_count += item.count;
        if (item.ischecked) {
          order.goods.push(item);
        }
      });
      if (order.total == 0) {
        Toast.fail("亲，请勾选商品");
      } else {
        this.$store.commit("changeOrderData", order);
        sessionStorage.setItem("orderData", JSON.stringify(order));
        this.$router.push({ name: "fillOrder" });
      }
    },
  },
  mounted() {
    this.totalPrice();
    this.carImg = serverIndex + this.carImg;
    let token = localStorage.getItem("token");
    if (token) {
      this.getCarDatas();
    }
  },
  watch: {
    cardata: {
      handler(val) {
        this.totalPrice();
        let flag = true;
        this.cardata.forEach((item) => {
          if (!item.ischecked) {
            flag = item.ischecked;
          }
        });
        this.checked = flag;
      },
      // 这里是关键，代表递归监听 demo 的变化
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.shopping-car-list {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #e4e4e4;
  margin-bottom: 3.125rem;
  .shopping-car-item {
    display: flex;
    justify-content: space-between;
    .checkbox {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mygoods-card {
      width: 90%;
      .goods-card {
        margin: 0;
        background-color: #fff;
        .van-card__title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.875rem;
          color: #000;
        }
        .van-card__desc {
          font-size: 1rem;
          color: #646566;
          margin-top: 0.3125rem;
        }
        .van-card__price-integer,
        .van-card__price-currency {
          font-size: 20px;
          font-weight: 550;
          color: #ff734c !important;
        }
        .van-card__origin-price {
          font-size: 14px;
          text-decoration: line-through;
          color: #b4babf;
          margin-left: 0.1725rem;
        }
      }
      .card-right {
        display: flex;
        flex-wrap: wrap;
        width: 5.625rem;
        height: 100%;
        align-items: center;
        .delete-button {
          display: block;
          width: 100%;
          height: 45%;
        }
      }
    }
  }
  .checkall-span {
    box-sizing: border-box;
    padding-left: 0.9375rem;
  }
  .checkall:checked {
    background: #1673ff;
  }
  .checkall {
    width: 25px;
    height: 25px;
    background-color: #ffffff;
    border: solid 1px #dddddd;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    position: relative;
    display: inline-block;
    vertical-align: top;
    cursor: default;
    -webkit-appearance: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-transition: background-color ease 0.1s;
    transition: background-color ease 0.1s;
  }
  .checkall:checked::after {
    content: "";
    top: 5px;
    left: 5px;
    position: absolute;
    background: transparent;
    border: #fff solid 2px;
    border-top: none;
    border-right: none;
    height: 6px;
    width: 10px;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .noData {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .img {
      width: 100%;
    }
    .selected-items {
      display: flex;
      justify-content: center;
      padding-bottom: 1.875rem;
      a {
        width: 5rem;
        text-align: center;
        height: 1.9375rem;
        line-height: 1.9375rem;
        padding: 0.1rem 0.8rem;
        background-color: #884e22;
        color: #ffffff;
        font-weight: 550;
        border-radius: 30% / 100% 100% 100% 100%;
      }
    }
  }
  .changeCount-box {
    div {
      display: flex;
      justify-content: center;
      .showChangeCount-ul {
        width: 35%;
        display: flex;
        padding: 0.9375rem 0;
        li.jia {
          border-right: none;
          cursor: pointer;
          color: #999;
          width: 30px;
          padding: 0;
          background-color: #f5f5f5;
        }
        li.jian {
          border-right: 1px solid #ddd;
        }
        li {
          float: left;
          text-align: center;
          line-height: 30px;
          height: 30px;
          border: 1px solid #ddd;
          font-size: 20px;
          padding: 0 8px;
          input {
            width: 30px;
            font-size: 16px;
            border: none;
            line-height: 24px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>