// 添加地址
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
        :area-list="areaList"
        show-set-default
        show-search-result
        save-button-text="添加"
        delete-button-text="取消"
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
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
import { getAddressById, addAddress } from "../../../server/user";
import { Toast } from "vant";

export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    async onSave(content) {
      let obj = content;
      let address = `${content.province}${content.city}${content.county}${content.addressDetail}`;
      obj.address = address;
      delete obj.postalCode;
      delete obj.country;
      delete obj.areaCode;
      let token = localStorage.getItem("token");
      const res = await addAddress(token, obj);
      if (res.code == 200) {
        let self = this;
        Toast({
          message: "添加成功",
          position: "center",
          type: "success",
          onClose() {
            self.$router.go(-1);
          },
        });
      }
    },

    onDelete() {
      this.$router.go(-1);
    },
    onChangeDetail(val) {},
  },
  mounted() {},
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