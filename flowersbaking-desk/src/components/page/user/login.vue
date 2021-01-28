<template>
  <div class="login">
    <div class="header">
      <vue-header name="arrow-left" title="登录" :handleClick="handleClick">
        <div class="caidan">
          <span
            class="iconfont icon-caidan"
            id="onmenu"
            @click="showNavbar"
          ></span>
        </div>
      </vue-header>
    </div>
    <nav class="headerbar-title" v-show="NavBar">
      <div class="headerbar-title-item">
        <router-link to="/">
          <i class="iconfont icon-shouye"></i>
          首页
        </router-link>
      </div>
      <div class="headerbar-title-item">
        <router-link
          v-if="navData.length > 0"
          :to="`/information/details/${navData[0].catid}/${navData[0].name}`"
        >
          <i class="iconfont iconfont icon-fenlei"></i>
          资讯
        </router-link>
      </div>
      <div class="headerbar-title-item">
        <router-link to="/shoppingCar">
          <i class="iconfont icon-gouwuche"></i>
          购物车
        </router-link>
      </div>
      <div class="headerbar-title-item">
        <router-link to="/mine">
          <i class="iconfont icon-wode"></i>
          我的
        </router-link>
      </div>
    </nav>

    <div class="login-box">
      <div class="loginform-item">
        <p>用户名</p>
        <input
          type="text"
          v-model="username"
          class="input"
          placeholder="请输入用户名"
        />
      </div>
      <div class="loginform-item">
        <p>用户密码</p>
        <input
          type="password"
          v-model="password"
          class="input"
          @keyup.13="Login"
          placeholder="请输入密码"
        />
      </div>
      <div class="loginform-button" @click="Login">
        <span>登录</span>
      </div>
      <div class="loginform-button reg" @click="goReg">
        <span>注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import vueHeader from "../../public/header";
import { getNav } from "../../../server/information";
import { login } from "../../../server/user";
import jwtDecode from "jwt-decode";
import { Notify, Toast } from "vant";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      NavBar: false,
      navData: [],
      username: "",
      password: "",
      flag: true,
      errObj: {},
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    showNavbar() {
      this.NavBar = !this.NavBar;
    },
    async getNavData() {
      const res = await getNav();
      this.navData = res;
    },
    goReg() {
      this.$router.push({ name: "reg" });
    },
    async Login() {
      let uReg = /^[a-zA-Z0-9_-]{4,16}$/;
      let pReg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[a-z])\S*$/;
      let uRes = uReg.test(this.username);
      let pRes = pReg.test(this.password);
      if (!uRes) {
        this.flag = false;
        this.errObj.username =
          "用户名格式错误：4到16位(字母，数字，下划线，减号)";
        Notify({ type: "danger", message: this.errObj.username });
        return;
      }
      if (!pRes) {
        this.flag = false;
        this.errObj.password =
          "密码格式错误：最少6位，包括至少1个小写字母，1个数字";
        Notify({ type: "danger", message: this.errObj.password });
      }
      if (this.flag) {
        const res = await login(this.username, this.password);
        if (res.code == 200) {
          const token = res.token;
          window.localStorage.setItem("token", token);
          const DecodeToken = jwtDecode(token);
          this.$store.commit("changeUser", DecodeToken);
          this.$store.commit("changeIsLogin", true);
          let self = this;
          Toast({
            message: "登录成功",
            position: "center",
            type: "success",
            onClose() {
              self.$router.replace({ name: "home" });
            },
          });
        } else if (res.code == 400) {
          let self = this;
          Toast({
            message: `登录失败${res.msg}`,
            position: "center",
            type: "fail",
          });
          this.username = "";
          this.password = "";
        }
      }
    },
  },
  mounted() {
    this.getNavData();
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  .caidan {
    box-sizing: border-box;
    padding-left: 5rem;
    #onmenu {
      font-size: 1.375rem;
    }
  }
  nav.headerbar-title {
    background-color: #ffffff;
    border: 1px solid #e9ecf0;
    box-shadow: 0 4px 12px 0 #e9ecf0;
    position: fixed;
    width: 6.9375rem;
    top: 3.75rem;
    right: 0.6875rem;
    padding: 1rem;
    display: block;
    z-index: 50;
    .headerbar-title-item {
      font-size: 0.875rem;
      a {
        display: inline-block;
        text-align: left;
        width: 100%;
        height: 2.8262rem;
        line-height: 2.8262rem;
      }
    }
  }
  nav.headerbar-title::before {
    position: absolute;
    content: "";
    top: -0.2415rem;
    left: 7.5331rem;
    background-color: #ffffff;
    height: 0.3225rem;
    width: 0.3225rem;
    transform: rotate(45deg);
  }
  .login-box {
    box-sizing: border-box;
    padding: 0 0.9375rem;
    padding-top: 10.25rem;
    .loginform-item {
      border-bottom: 2px solid #e9ecf0;
      margin-top: 0.9375rem;
      .input {
        font-size: 0.975rem;
        padding: 0.975rem 0;
      }
    }
    .loginform-button {
      margin-top: 1.875rem;
      padding: 0.69rem 0rem;
      width: 100%;
      border-radius: 15%/ 100% 100% 100% 100%;
      background-color: #884e22;
      color: #ffffff;
      text-align: center;
      font-size: 1.2075rem;
      margin-bottom: 1.38rem;
    }
    .reg {
      background-color: rgb(63, 26, 165);
    }
  }
}
</style>