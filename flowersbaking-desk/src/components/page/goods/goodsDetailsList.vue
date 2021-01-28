<template>
  <div class="goodsDetails">
    <div class="head">
      <vue-header
        name="arrow-left"
        :handleClick="handleClick"
        :title="goodsType[0].type_name"
        v-if="goodsType !== ''"
      />
      <vue-fliterNav />
    </div>
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import vueFliterNav from "./fliterNav";
import { getGoodsType } from "../../../server/goods";
export default {
  components: {
    vueHeader,
    vueFliterNav,
  },
  data() {
    return {
      goodsType: "",
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    async getGoodsTypes() {
      this.goodsType = await getGoodsType(this.$route.params.good_type);
    },
  },
  mounted() {
    this.getGoodsTypes();
  },
};
</script>

<style lang="scss" scoped>
</style>