<template>
  <div class="config">
    <div class="heade">
      <vue-header
        name="arrow-left"
        title="个人中心"
        :handleClick="handleClick"
      />
    </div>
    <div class="setting-detail">
      <div class="item-box">
        <div class="common">
          <span class="lable"> 账号ID： </span>
          <span class="text user-Id">
            {{ $store.state.user.id }}
          </span>
        </div>
      </div>
      <div class="item-box">
        <div class="common" @click="changePassword">
          <span class="label"> 登录密码修改 </span>
          <span class="text">
            <span>修改</span>
          </span>
        </div>
        <div class="common" @click="goSetSuperPassword">
          <span class="lable"> 安全密码 </span>
          <span class="text">
            <span>{{
              $store.state.user.superPassword !== "000000" ? "去修改" : "前往设置"
            }}</span>
          </span>
        </div>
      </div>
      <div class="item-box">
        <div class="common" @click="showMsg">
          <span class="lable"> 注销账号 </span>
          <span class="text">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAkCAMAAABR74GsAAAAhFBMVEVHcEy+wMa+wcW9wMXQ0NDFxcW9wMW///+9wMW9wMW+wMW+wse+wMXBwca/wsW9wMW+wMa9wcW9wcW+wMa9wse9wMW9wcbAwMa/xsa9wMXAwMe9wMW9wcW/wca+wca9wMW9wsa+wMa9wMW9wMW9wcW/1NS+wMXHx8e/wcbCws6+wcW9wMXhD+L5AAAAK3RSTlMAgrXLCxblBPz1ZjfcNkzdnraBg2XPyk0k6iXrjXCd5HGLnLeADMwXZBVL0OsnaQAAAJJJREFUKM+t0EcSgzAMQFEDBmx6OiW9J//+98te8iqDlm80428ZM8ccslVATxDgC1AozWNwO8V2C75U/KlgGhX3A7QvxbWH50Px18EtV/wGOp19ByLN1xl+k1aw0doG1Cbga/naAlwjVztgLTEClhIL4CixcRDL65QeEitwnKBKA/VD/3/9PlRvskC9MecsMnPPD3MGEI/gd5ReAAAAAElFTkSuQmCC"
              alt=""
            />
          </span>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
    <div class="logout-btn" @click="logout">退出登录</div>

    <van-dialog v-model="showMSg" type="alert" confirm-button-text="朕知道了">
      <div class="msg">
        若你需要注销账号，请联系在线客服或拨打人工客服（4001808400），并自愿放弃你账号内的所有虚拟资产，收到申请后，客服将会在15个工作日内完成注销。
      </div>
    </van-dialog>
  </div>
</template>

<script>
import vueHeader from "../../public/header";
export default {
  components: {
    vueHeader,
  },
  data() {
    return {
      showMSg: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("changeIsLogin",false)
      this.$router.replace("/login");
    },
    showMsg() {
      this.showMSg = true;
    },
    changePassword() {
      this.$router.push({ name: "changePassword" });
    },
    handleClick() {
      this.$router.go(-1);
    },
    goSetSuperPassword(){
      this.$router.replace({name:"setSuperPassword"})
    }
  },
};
</script>

<style lang="scss" scoped>
.config {
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
  .setting-detail {
    margin-top: 0.625rem;

    .item-box {
      background: #fff;
      margin-bottom: 0.625rem;
      .common {
        padding: 0 0.875rem 0 0.9375rem;
        height: 3.0625rem;
        font-size: 0.9375rem;
        line-height: 3.0625rem;
        background: #fff;
        color: #191a1b;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        .text {
          font-size: 0.8125rem;
          color: rgb(121, 125, 130);
          img {
            width: 0.4375rem;
            height: 0.75rem;
            padding-left: 0.875rem;
          }
        }
      }
      .common-border {
        border-bottom: 0.0625rem solid #f4f4f4;
      }
    }
  }
  .logout-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #ff5f16;
    height: 3.0625rem;
    line-height: 3.0625rem;
    background: #fff;
  }
  .msg {
    line-height: 1.5rem;
    text-align: left;
    font-size: 0.875rem;
    padding: 0.625rem;
  }
  .bottom {
    margin-bottom: 1.875rem;
  }
}
</style>