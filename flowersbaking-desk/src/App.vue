<template>
  <div id="app">
    <transition name="van-fade">
      <router-view />
    </transition>
    <vue-Navbar v-if="/(home)|(information)|(mine)/.test($route.name)" />
  </div>
</template>
<script>
import vueNavbar from "./components/public/navbar";
import jwtDecode from "jwt-decode";
import { checkToken } from "./server/user";
export default {
  components: {
    vueNavbar,
  },
  methods: {
    async checkToken() {
      const token = window.localStorage.getItem("token");
      if (token) {
        const res = await checkToken(token);
        if (res.code == 401) {
          localStorage.removeItem("token");
          this.$store.commit("changeUser", {});
          this.$store.commit("changeIsLogin", false);
        } else {
          let DecodeToken =jwtDecode(token)
          this.$store.commit("changeUser", DecodeToken);
          this.$store.commit("changeIsLogin", true);
        }
      }
    },
  },
  created() {
    this.checkToken();
  },
};
</script>
