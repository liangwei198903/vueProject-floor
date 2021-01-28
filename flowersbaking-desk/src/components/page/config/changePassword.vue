<template>
  <div class="changePassword">
    <div class="heade">
      <vue-header
        name="arrow-left"
        title="个人中心"
        :handleClick="handleClick"
      />
    </div>
    <div class="inputSuperPassword" v-if="showInputSuperPassword">
      <div class="top">
        <van-password-input
          :value="value"
          info="请输入您的6位数的超级密码"
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
    <div class="changeUserPassword" v-else>
      <div class="login">
        <div class="login-form">
          <van-form @submit="onSubmit">
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
            />
            <van-field
              v-model="repeatPassword"
              type="password"
              name="重复密码"
              label="重复密码"
              placeholder="重复密码"
            />
            <div style="margin: 16px">
              <van-button round block color="#ff5f16" native-type="submit">
                修改
              </van-button>
            </div>
          </van-form>
        </div>
        <van-notify v-model="showMsg" type="danger">
          <van-icon name="close" style="margin-right: 4px" />
          <span>{{ msg }}</span>
        </van-notify>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import vueHeader from "../../public/header";
import { changePassWrod } from "../../../server/user";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      value: "",
      showKeyboard: true,
      errorInfo: "",
      showInputSuperPassword: true,
      password: "",
      repeatPassword: "",
      showMsg: false,
      msg: "",
    };
  },
  methods: {
    handleClick() {
      this.$router.go(-1);
    },
    showKeyboards() {
      this.showKeyboard = false;
    },
    onSubmit() {
      if (this.password == "") {
        (this.showMsg = true), (this.msg = "密码不能为空");
        setTimeout(() => {
          this.showMsg = false;
          this.msg = "";
        }, 2000);
        return;
      }
      if (this.repeatPassword == "") {
        (this.showMsg = true), (this.msg = "重复密码不能为空");
        setTimeout(() => {
          this.showMsg = false;
          this.msg = "";
        }, 2000);
        return;
      }
      if (this.repeatPassword !== this.password) {
        (this.showMsg = true), (this.msg = "两次输入的密码不一致");
        setTimeout(() => {
          this.showMsg = false;
          this.msg = "";
        }, 2000);
        return;
      } else {
        this.changePassword();
      }
    },
    async changePassword() {
      let token = localStorage.getItem("token");
      const res = await changePassWrod(token, this.password);
      let self = this;
      if (res.code == 200) {
        Toast({
          message: "修改成功",
          position: "center",
          type: "success",
          onClose() {
            self.$router.push({ name: "home" });
          },
        });
      }
    },
  },
  watch: {
    value(value) {
      if (
        value.length === 6 &&
        value !== this.$store.state.user.superPassword
      ) {
        this.errorInfo = "密码错误";
      } else if (value == this.$store.state.user.superPassword) {
        let self = this;
        Toast({
          message: "超级密码输入正确",
          position: "center",
          type: "success",
          onClose() {
            self.errorInfo = "";
            self.showInputSuperPassword = false;
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.changePassword {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  .top {
    padding-top: 50%;
  }
  .keyboard {
    padding-bottom: 3.125rem;
    .van-number-keyboard {
      padding-bottom: 0;
    }
  }
  .changeUserPassword {
    box-sizing: border-box;
    padding-top: 60%;
  }
  .heade {
    background-color: #fff;
    display: flex;
    height: 2.75rem;
    width: 100%;
    .left,
    .right {
      width: 30%;
      height: 100%;
    }
    .content {
      width: 40%;
      text-align: center;
      line-height: 2.75rem;
    }
  }
}
</style>