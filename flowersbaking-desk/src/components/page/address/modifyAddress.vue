// 修改地址
<template>
  <div class="modify-address">
    <vue-header
      name="arrow-left"
      title="修改收货地址"
      :handleClick="handleClick"
    />
    <div class="margin-top"></div>
    <div class="address-box">
      <van-address-edit
        show-delete
        :address-info="userInfo"
        :area-list="areaList"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :area-placeholder="areaPlaceholder"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import areaList from "./area";
import vueHeader from "../../public/header";
import {
  getAddressById,
  changeAddress,
  deleteAddress,
} from "../../../server/user";
import { Toast } from "vant";

export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      areaList,
      searchResult: [],
      userInfo: {},
      areaPlaceholder:"",
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    async onSave(content) {
      let address = `${content.province}${content.city}${content.county}${content.addressDetail}`;
      let baseUserInfo = this.userInfo;
      baseUserInfo.address = address;
      let token = localStorage.getItem("token");
      const res = await changeAddress(token, baseUserInfo);
      if (res.code == 200) {
        let self = this;
        Toast({
          message: "修改成功",
          position: "center",
          type: "success",
          onClose() {
            self.$router.push({ name: "shippingAddress" });
          },
        });
      }
    },

    async onDelete() {
      let token = localStorage.getItem("token");
      let id = this.$route.params.id;
      const res = await deleteAddress(token, id);
      if (res.code == 200) {
        let self = this;
        Toast({
          message: "删除成功",
          position: "center",
          type: "success",
          onClose() {
            self.$router.push({ name: "shippingAddress" });
          },
        });
      }
    },
    onChangeDetail(val) {},
    async getareaList() {
      const res = await getAddressById(this.$route.params.id);
      this.userInfo = res.data[0];
      this.areaPlaceholder=`${this.userInfo.province}/ ${this.userInfo.city}市 / ${this.userInfo.county}区`
    },
  },
  mounted() {
    this.getareaList();
  },
};
</script>

<style lang="scss" scoped>
.modify-address {
  width: 100%;
  height: 93vh;
  background-color: #fff;
  .margin-top {
    margin-top: 3.125rem;
  }
}
</style>