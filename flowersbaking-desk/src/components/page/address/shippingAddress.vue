// 用户收货地址列表
<template>
  <div class="shipping-address">
    <vue-header
      class="hipping-address-header"
      name="arrow-left"
      title="收货地址列表"
      :handleClick="handleClick"
    />
    <div class="list" v-if="list.length > 0">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        switchable
        class="my-address-list"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
    <div class="noData" v-else>
      <div>
        <van-empty
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="空空如也"
        />
        <div class="goAdd">
          <a @click="goAddAddress">去添加地址</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import { Toast } from "vant";
import { getAddress } from "../../../server/user";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    onAdd() {
      this.$router.push({ name: "addAddress" });
    },
    onEdit(item, index) {
      this.$router.push({ name: "modifyAddress", params: { id: item.id } });
    },
    async getUserAddress() {
      let token = localStorage.getItem("token");
      const res = await getAddress(token);
      if (res.code == 200) {
        this.list = res.data;
        this.list.forEach((item) => {
          if (item.isDefault == 1) {
            item.isDefault = true;
          }
        });
      }
    },
    goAddAddress() {
      this.$router.push({ name: "addAddress" });
    },
  },
  mounted() {
    this.getUserAddress();
  },
};
</script>

<style lang="scss" scoped>
.shipping-address {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .hipping-address-header {
    position: static;
  }
  .list {
    width: 100%;
    background-color: #fff;
  }
  .noData {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .goAdd {
      width: 100%;
      a {
        text-align: center;
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        border-radius: 0.5rem;
        color: #fff;
        background-color: rgb(41, 30, 184);
      }
    }
  }
  .my-address-list {
    ::v-deep.van-icon-success {
      display: none !important;
    }
  }
}
</style>