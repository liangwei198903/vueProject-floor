<template>
  <div class="maincont" :style="{ backgroundImage: `url(${bg})` }">
    <div class="login">
      <p>你好！<span v-show="$store.state.isLogin">{{$store.state.user.username}}</span> 欢迎来到本店</p>
      <div class="maincont-login-but margin-top-small" v-show="!$store.state.isLogin">
        <a @click="goLogin">登录/注册</a>
      </div>
    </div>
    <div class="myorder">
        <vue-order />
    </div>
    <vue-personalmenu />
  </div>
</template>

<script>
import { serverIndex } from "../../../server/serverIndex";
import vueOrder from "./orderNav";
import vuePersonalmenu from "./personalmenu"
export default {
  components: {
    vueOrder,
    vuePersonalmenu
  },
  data() {
    return {
      bg: "",
    };
  },
  methods:{
    goLogin(){
      this.$router.push({name:"login"})
    }
  },
  created() {
    this.bg = serverIndex + "/img/mine/bg.png";
  },
};
</script>

<style lang="scss" scoped>
.maincont {
  margin-top: 50px;
  width: 100%;
  height: 90vh;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100vw auto;
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 1.725rem 0rem;
    color: #fff;
    .maincont-login-but {
      width: 32%;
      padding: 0.5125rem 0rem;
      background-color: #fff;
      border-radius: 30% / 100% 100% 100% 100%;
      text-align: center;
    }
    .margin-top-small {
      margin-top: 10px;
    }
  }
}
</style>