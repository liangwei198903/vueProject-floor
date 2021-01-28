<template>
  <div class="my-echarts">
    <div
      class="main"
      ref="chart"
      :style="{ width: `${width}`, height: `${height}` }"
    ></div>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  props: {
    option: {
      type: Object,
      require,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {};
  },
  methods: {
    echartsInit() {
      //   基于准备好的dom，初始化echarts实例
      var main = this.$refs.chart;
      var myChart = echarts.init(main);
      //   绘制图表
      myChart.setOption(this.option);
    },
    echartsDispose() {
      var main = this.$refs.chart;
    },
  },
  mounted() {
    this.echartsInit();
  },
  watch: {
    option: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        // do something, 可使用this
        this.echartsDispose();
        this.echartsInit();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.my-echarts {
  width: 100%;
}
</style>