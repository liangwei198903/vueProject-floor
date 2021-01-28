<template>
  <div class="navbar">
    <el-menu
      default-active="/index"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
      unique-opened
    >
      <el-menu-item index="/index">
        <i class="el-icon-s-tools"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-menu-item index="/userManagement/averageUser">
        <i class="iconfont icon-yonghu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-shouyeguanli"></i>
          <span slot="title">首页管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/indexManagement/swiperManagement"
            ><i class="iconfont icon-lunbotu"></i>
            <span slot="title">轮播图列表</span></el-menu-item
          >
          <el-menu-item index="/indexManagement/uploadSwiper"
            ><i class="iconfont icon-tianjialunbotu"></i>
            <span slot="title">上传轮播图</span></el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-zixun"></i>
          <span slot="title">资讯设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/information/informationList">
            <i class="iconfont icon-zxgl"></i>
            <span slot="title">资讯管理</span>
          </el-menu-item>
          <el-menu-item index="/information/addInformation">
            <i class="iconfont icon-xiewenzhang"></i>
            <span slot="title">新建资讯</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-shangpin"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goodsManagement/goodsManagement">
            <i class="iconfont icon-shangpinguanli"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/goodsManagement/addGoods">
            <i class="iconfont icon-tianjiashangpingouwulan"></i>
            <span slot="title">新建商品</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="iconfont icon-dingdan-"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/orderManagement">
            <i class="iconfont icon-dingdanguanli35"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="/orderManagement/orderReview">
            <i class="iconfont icon-dingdanshenhe"></i>
            <span slot="title">订单审核</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/report">
        <i class="iconfont icon-baobiao"></i>
        <span slot="title">数据报表</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  .group-btn {
    width: 100%;
    margin-top: 20px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border: 0;
  }
  .iconfont {
    margin-right: 5px;
  }
}
</style>