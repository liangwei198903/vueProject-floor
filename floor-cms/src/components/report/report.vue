<template>
  <div class="report">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="select-box">
      <span> 选择类别： </span>
      <el-select
        v-model="selectValue"
        placeholder="请选择"
        @change="selectChange"
      >
        <el-option
          v-for="item in selectOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <vue-myecharts :option="goodsSalesOption" width="100%" height="500px"></vue-myecharts>
  </div>
</template>

<script>
import { getGoodsTitle } from "../../server/goodsManagement";
import { getGoodsSales } from "../../server/report";
import vueMyecharts from "../public/myEcharts";
export default {
  components: {
    vueMyecharts,
  },
  data() {
    return {
      goodsSalesOption: {
        title: {
          text: "爱情鲜花",
        },
        tooltip: {},
        xAxis: {
          data: [],
          label: {
            show: true,
            position: "top",
          },
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [],
          },
        ],
      },
      selectOption: [],
      selectValue: "爱情鲜花",
      goodsTitleName: "",
    };
  },
  methods: {
    async getGoodsSales(id) {
      const res = await getGoodsSales(id);
      let data = res.data;
      data.forEach((item) => {
        this.goodsSalesOption.xAxis.data.push(item.name);
        this.goodsSalesOption.series[0].data.push(item.sales);
      });
    },
    async getGoodsTitle() {
      const res = await getGoodsTitle();
      let data = res.data;
      data.forEach((item) => {
        this.selectOption.push({
          value: item.good_tag_id,
          label: item.name,
        });
      });
    },
    getGoodsTitleName(id) {
      this.selectOption.forEach((item) => {
        if (id == item.value) {
          this.goodsTitleName = item.label;
        }
      });
    },
    selectChange() {
      this.getGoodsTitleName(this.selectValue);
      this.goodsSalesOption = {
        title: {
          text: "爱情鲜花",
        },
        tooltip: {},
        xAxis: {
          data: [],
          label: {
            show: true,
            position: "top",
          },
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [],
          },
        ],
      };
      console.log(this.goodsTitleName);
      this.goodsSalesOption.title.text = this.goodsTitleName;
      this.getGoodsSales(this.selectValue);
    },
  
  },
  mounted() {
    this.getGoodsSales(1);
    this.getGoodsTitle();
    this.getDataOption();
  },
};
</script>

<style lang="scss" scoped>
.report {
  .header,
  .select-box {
    margin-bottom: 30px;
  }
}
</style>