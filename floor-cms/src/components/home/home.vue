<template>
  <div class="home">
    <el-container>
      <el-header
        ><div class="my-header">
          <div class="title">最美鲜花后台管理系统</div>
          <div class="login-out-btn">
            <el-button type="warning" @click="loginOut" round
              >退出登录</el-button
            >
          </div>
        </div></el-header
      >
      <el-container>
        <el-aside width="202px">
          <vue-navBar />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import vueNavBar from "./navBar";
import { auditOrderCount } from "../../server/order";
import { checkToken } from "../../server/login";
export default {
  components: {
    vueNavBar,
  },
  methods: {
    loginOut() {
      this.$router.push({ name: "login" });
    },
    async auditOrderCount() {
      const res = await auditOrderCount();
      if (res.code == 200) {
        if (res.data.count > 0) {
          this.$notify({
            title: "警告",
            message: `你有${res.data.count}个订单需要审核`,
            type: "warning",
          });
        }
      }
    },
    // 检查token是否有效
    async checkToken() {
      let token = sessionStorage.getItem("token");
      const res = await checkToken(token);
      if (res.code == 401) {
        this.$message({
          message: res.msg,
          type: "error",
        });
        sessionStorage.removeItem("token");
        this.$router.replace({ name: "login" });
      }
    },
  },
  mounted() {
    this.auditOrderCount();
    this.checkToken();
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .el-header,
  .el-footer {
    background-color: rgb(17, 71, 172);
    color: #fff;
    text-align: center;
    height: 10vh;
  }
  .el-header {
    width: 100%;
    height: 100%;
    .my-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 100%;
    border-right: 1px solid #666;
  }

  .el-main {
    background-color: #fff;
    color: #333;
    height: 100%;
  }

  .el-container {
    height: 93vh;
  }

  body > .el-container {
    height: 100vh;
  }
}
</style>
