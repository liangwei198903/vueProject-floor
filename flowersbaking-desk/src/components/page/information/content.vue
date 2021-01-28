<template>
  <div class="content">
    <section class="contentmain">
      <aside class="leftmenu">
        <van-sidebar v-model="activeKey" @change="onChange" badge="#fff">
          <van-sidebar-item v-for="item in navData" :key="item.catid" :title="item.name" :to="{name:'informationDetails',params:{catid:item.catid,name:item.name}}" />
        </van-sidebar>
      </aside>
      <section class="drawcont">
        <article class="drawcont-item">
          <router-view :key="key" />
        </article>
      </section>
    </section>
  </div>
</template>

<script>
import { getNav } from "../../../server/information";
export default {
  data() {
    return {
      activeKey: 0,
      navData: [],
    };
  },
  methods: {
    onChange(index) {
    },
    async getNavs() {
      const res = await getNav();
      this.navData = res;
    },
  },
  mounted(){
      this.getNavs()
  },
  computed:{
       key() { 
        var num=parseInt(Math.random()*100000).toString()
        return this.$route.name !== undefined? this.$route.name +num: this.$route +num
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  .contentmain {
    display: flex;
    justify-content: space-between;
    .leftmenu {
      display: inline-block;
      position: fixed;
      //   width: 21.06666667%;
      border-right: 1px solid #e9ecf0;
      background-color: #ffffff;
      height: 100%;
      overflow: hidden;
    }
    .drawcont {
      display: inline-block;
      width: 73%;
      background-color: #ffffff;
      height: 100%;
      padding: 0.6875rem;
      padding-bottom: 3.45rem;
      margin-left: 21%;
    }
  }
  .van-sidebar-item {
    background-color: #fff;
  }
  .van-sidebar-item--select {
    color: #ad2a70;
  }
  .van-sidebar-item--select::before {
    color: #ad2a70;
  }
}
</style>