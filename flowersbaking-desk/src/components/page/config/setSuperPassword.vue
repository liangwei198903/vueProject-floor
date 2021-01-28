<template>
  <div class="set-super-password">
    <div class="heade">
      <vue-header name="arrow-left" :title="title" :handleClick="handleClick" />
      <div class="inputSuperPassword" v-if="showInputSuperPassword">
        <div class="top">
          <van-password-input
            :value="value"
            :info="info"
            :error-info="errorInfo"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
        </div>
        <div class="keyboard">
          <van-number-keyboard
            v-model="value"
            :show="showKeyboard"
            @blur="showKeyboards"
          />
        </div>
      </div>
      <div class="inputSuperPassword" v-else>
        <div class="top">
          <van-password-input
            :value="againValue"
            :info="againInfo"
            :error-info="errorInfo"
            :focused="againShowKeyboard"
            @focus="againShowKeyboard = true"
          />
        </div>
        <div class="keyboard">
          <van-number-keyboard
            v-model="againValue"
            :show="againShowKeyboard"
            @blur="againShowKeyboards"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import vueHeader from "../../public/header";
import { Dialog, Toast } from "vant";
import { changeSuperPassword } from "../../../server/user";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      isSet: Boolean,
      title: "",
      value: "",
      showKeyboard: true,
      showInputSuperPassword: true,
      errorInfo: "",
      info: "",

      againValue: "",
      againShowKeyboard: true,
      againErrorInfo: "",
      againInfo: "再次输入超级密码",
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    againShowKeyboards() {
      this.againShowKeyboard = false;
    },
    showKeyboards() {
      this.showKeyboard = false;
    },
    async changeSuperPassword(value) {
      let token = localStorage.getItem("token");
      const res = await changeSuperPassword(token, value);
      let self = this;
      if (res.code == 200) {
        let token = res.token;
        localStorage.setItem("token", token);
        const DecodeToken = jwtDecode(token);
        this.$store.commit("changeUser", DecodeToken);
        Toast({
          message: "修改成功",
          position: "center",
          type: "success",
          onClose() {
            self.$router.go(-1);
          },
        });
      }
      if (res.code == 400) {
        Toast({
          message: `修改失败`,
          position: "center",
          type: "fail",
          onClose() {
            self.$router.go(-1);
          },
        });
      }
    },
  },
  mounted() {
    this.isSet =
      this.$store.state.user.superPassword == "000000" ? true : false;
    this.title =
      this.$store.state.user.superPassword == "000000"
        ? "设置超级密码"
        : "修改超级密码";
    this.info =
      this.$store.state.user.superPassword == "000000"
        ? "请设置您的6位数的超级密码"
        : "请输入您的6位数的超级密码";
  },
  watch: {
    value(value) {
      if (this.value.length === 6) {
        let self = this;
        if (this.isSet) {
          Dialog.confirm({
            title: "您设置的密码为",
            cancelButtonText: "重新输入",
            message: self.value,
          })
            .then(() => {
              // on confirm
              self.changeSuperPassword(value);
            })
            .catch(() => {
              self.value = "";
              self.againValue = "";
              self.showInputSuperPassword = true;
              self.againShowKeyboard = true;
            });
        } else {
          if (this.value !== this.$store.state.user.superPassword) {
            Toast({
              message: `超级密码输入错误,请重新输入`,
              position: "center",
              type: "fail",
              onClose() {
                self.value = "";
              },
            });
          } else {
            this.showInputSuperPassword = false;
          }
        }
      }
    },
    againValue(againValue) {
      if (this.againValue.length === 6) {
        let self = this;
        Dialog.confirm({
          title: "您设置的密码为",
          cancelButtonText: "重新输入",
          message: self.againValue,
        })
          .then(() => {
            // on confirm
            self.changeSuperPassword(againValue);
          })
          .catch(() => {
            self.value = "";
            self.againValue = "";
            self.showInputSuperPassword = true;
            self.againShowKeyboard = true;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.set-super-password {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .inputSuperPassword {
    padding-top: 200px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>