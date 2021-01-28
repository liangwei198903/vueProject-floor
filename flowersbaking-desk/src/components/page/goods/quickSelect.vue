<template>
  <div class="quick-select">
     <div class="head">
      <vue-header
        name="arrow-left"
        :handleClick="handleClick"
        :title="goodsType.sname"
        v-if="goodsType !=''"
      />
    </div>
    <vue-quickFliter />
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import { getsuitable_scene } from "../../../server/goods";
import vueQuickFliter from "./quickFliter"
export default {
  components: {
    vueHeader,
    vueQuickFliter
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
      this.goodsType = await getsuitable_scene(this.$route.params.sid);
    },
  },
  mounted() {
    this.getGoodsTypes();
  },
};
</script>

<style lang="scss" scoped>
</style>