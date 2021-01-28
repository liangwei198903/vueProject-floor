<template>
  <div class="login">
    <div class="login-form">
      <div class="my-login">
        <img src="http://www.minggang.top:8000/img/common/logo.png" alt="" />
      </div>
      <div class="form-box">
        <el-form
          label-position="top"
          label-width="80px"
          :model="formLabelAlign"
          ref="myForm"
        >
          <el-form-item label="用户名:">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input
              type="password"
              v-model="formLabelAlign.password"
            ></el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" class="submitBtn" @click="submitForm()"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import { serverIndex } from "../../server/serverIndex";
import { login } from "../../server/login";
export default {
  data() {
    return {
      formLabelAlign: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      if (this.formLabelAlign.username.trim() == "") {
        this.$message.error("亲，用户名不能为空");
        return;
      }
      if (this.formLabelAlign.password.trim() == "") {
        this.$message.error("亲，密码不能为空");
        return;
      } else {
        const res = await login(
          this.formLabelAlign.username,
          this.formLabelAlign.password
        );
        if (res.code == 200) {
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          let token = res.token;
          let user = jwtDecode(token);
          console.log(user);
          // this.$store.commit("chnageUser",user)
          sessionStorage.setItem("token", token);
          this.$router.replace({ name: "homeIndex" });
        }
        if (res.code == 400) {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url(../../assets/loginBg.jpg);
  background-size: 100% 100%;
  position: relative;
  .login-form {
    position: absolute;
    width: 400px;
    height: 400px;
    background-color: #fff;
    top: 50%;
    margin-top: -200px;
    right: 50%;
    margin-right: -200px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .my-login {
      width: 150px;
      height: 116px;
    }
    .form-box {
      width: 90%;
      height: 100%;
      .submitBtn {
        width: 100%;
      }
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>