// 提交订单页主体内容
<template>
  <div class="check-address">
    <div class="list">
      <div class="item" @click="showOtherAddressBox">
        <div class="titel">收货信息:</div>
        <div v-if="defaultAddress.length > 0">
          <div
            class="content"
            v-for="item in defaultAddress.slice(0, 1)"
            :key="item.id"
          >
            <div class="left">
              <div>
                <span class="name">{{ item.name }}</span>
                <span class="tel">{{ item.tel }}</span>
              </div>
              <div>
                <span class="address"> {{ item.address }} </span>
              </div>
            </div>
            <div class="right">
              <van-icon name="arrow" />
            </div>
          </div>
          <div></div>
        </div>
        <div class="no-address" v-else>
          <div>
            <span>亲你还没有收货地址</span>
          </div>
          <div @click="goAddress">
            去添加地址
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="delivery-date">
          <div class="titel">送达日期:</div>
          <div class="date-text" @click="showCalendarBox">
            <span v-if="calendar == ''">请选择送达日期</span>
            <span v-else>{{ calendar }}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="delivery-date">
          <div class="titel">配送时间:</div>
          <div class="date-text" @click="showDatetimePickerBox">
            <span>{{ delivery_time }}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="border"></div>
    </div>
    <!-- 订购人信息 -->
    <div class="maincont-userinfo wiiteback">
      <div class="maincont-telandarea-item">
        <span>订购人信息</span>
        <span @click="showsubscriberForm">
          {{ subscriberUserInfo }}
          <van-icon name="arrow" />
        </span>
      </div>
    </div>

    <!-- 留言 -->
    <div class="leave-message">
      <div>
        <div class="leave-message-left">
          <span class="text">贺卡留言</span>
        </div>
        <div class="leave-message-righta">
          <textarea
            v-model="greetingMessage"
            @blur="greetingMessageBlur"
            rows="5"
            placeholder="选填  请输入贺卡留言！"
          ></textarea>
        </div>
      </div>
      <div>
        <div class="leave-message-left">
          <span class="text">买家留言</span>
        </div>
        <div class="leave-message-righta">
          <textarea
            v-model="buyerMessage"
            rows="5"
            @blur="buyerMessageBlur"
            placeholder="选填  请输入买家留言！"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <vue-orderGoodsList />

    <!-- 支付方式 -->
    <vue-payWay />

    <!-- 商品信息 -->
    <vue-commodityInformation />

    <!-- 订购人信息表单窗口 -->
    <div class="subscriber-form" v-show="subscriberForm">
      <div class="header">
        <div class="left"></div>
        <div class="content">
          <span>订购人信息</span>
        </div>
        <div class="right">
          <van-icon name="cross" size="1.5rem" @click="closesubscriberForm" />
        </div>
      </div>
      <div class="subscriber-content">
        <div class="subscriber-item">
          <div>订购人姓名</div>
          <div class="subscriber-item-border">
            <input
              type="text"
              class="subscriber-name"
              placeholder="订购人姓名"
              v-model="subscriberName"
            />
          </div>
        </div>
        <div class="subscriber-item tel">
          <div>订购人电话</div>
          <div class="subscriber-item-border">
            <input
              type="text"
              class="subscriber-name"
              placeholder="订购人电话"
              v-model="subscriberTel"
            />
          </div>
        </div>
        <div class="subscriber-remind">
          <i class="iconfont icon-hua"></i>
          <span class="text">
            请填写您本人的手机号，非收货人手机，以便及时接收订单状态提醒信息
          </span>
        </div>
        <div class="submitbutton" @click="subscriberSubmit">确定</div>
      </div>
    </div>

    <!-- 选择其他地址窗口 -->
    <div class="check-other-address" v-show="showOtherAddress">
      <div class="header">
        <div class="left"></div>
        <div class="content">
          <span>选择地址</span>
        </div>
        <div class="right">
          <van-icon name="cross" size="1.5rem" @click="closeOtherAddressBox" />
        </div>
      </div>
      <div
        class="address-list"
        v-for="item in addressData"
        :key="item.id"
        @click="changeAddress(item)"
      >
        <div class="left">
          <div>
            <span class="name">{{ item.name }}</span>
            <span class="tel">{{ item.tel }}</span>
          </div>
          <div>
            <span class="detlias" v-show="item.isDefault">默认</span>
            <span class="address"> {{ item.address }} </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择日期 -->
    <van-calendar
      v-model="showCalendar"
      :show-confirm="false"
      @confirm="onConfirm"
    />
    <!-- 送达时间 -->
    <van-datetime-picker
      class="my-datetime-picker"
      v-show="showDatetimePicker"
      v-model="currentTime"
      type="time"
      :filter="filter"
      @confirm="datetimeConfirm"
      @cancel="closeDatetime"
      ref="picker"
    />
  </div>
</template>

<script>
import { getAddress } from "../../../server/user";
import { Notify } from "vant";
import vueOrderGoodsList from "./orderGoodsList";
import vuePayWay from "./payWay";
import vueCommodityInformation from "./commodityInformation";
export default {
  components: {
    vueOrderGoodsList,
    vuePayWay,
    vueCommodityInformation,
  },
  data() {
    return {
      addressData: [], // 用户收货地址数组
      defaultAddress: [], //用户默认收货数组
      showOtherAddress: false, //展示选择其他地址的窗口
      showCalendar: false, //展示选择送达日期窗口
      calendar: "", //送达日期
      currentTime: "12:00", //默认时间
      delivery_time: "不限时段", //送达时间
      showDatetimePicker: false, //选择送达时间窗口
      subscriberForm: false, //展示订购人表单窗口
      subscriberName: "", //订购人姓名
      subscriberTel: "", //订购人电话
      subscriberUserInfo: "请填写", //订购人已填写：已填写完成   未填写：请填写
      greetingMessage: "", //贺卡留言
      buyerMessage: "", //买家留言
    };
  },
  methods: {
    async getAddressData() {
      let token = localStorage.getItem("token");
      const res = await getAddress(token);
      if (res.code == 200) {
        this.addressData = res.data;
        this.addressData.forEach((item) => {
          if (item.isDefault == 1) {
            this.defaultAddress.push(item);
          }
        });
        console.log(this.defaultAddress[0]);
        sessionStorage.setItem("addressId", this.defaultAddress[0].id);
        sessionStorage.setItem(
          "address_detail",
          JSON.stringify(this.defaultAddress[0])
        );
      }
    },
    showOtherAddressBox() {
      this.showOtherAddress = true;
    },
    closeOtherAddressBox() {
      this.showOtherAddress = false;
    },
    changeAddress(item) {
      this.defaultAddress[0] = item;
      sessionStorage.setItem("addressId", this.defaultAddress[0].id);
      sessionStorage.setItem(
        "address_detail",
        JSON.stringify(this.defaultAddress[0])
      );
      this.showOtherAddress = false;
    },
    goAddress() {
      this.$router.push({ name: "addAddress" });
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.showCalendar = false;
      this.calendar = this.formatDate(date);
      sessionStorage.setItem("delivery_date", this.calendar);
    },
    showCalendarBox() {
      this.showCalendar = true;
    },
    filter(type, options) {
      if (type === "minute") {
        return options.filter((option) => option % 5 === 0);
      }
      return options;
    },
    showDatetimePickerBox() {
      this.showDatetimePicker = true;
    },
    datetimeConfirm(value) {
      this.delivery_time = value;
      sessionStorage.setItem("delivery_time", this.delivery_time);
      this.showDatetimePicker = false;
    },
    closeDatetime() {
      this.showDatetimePicker = false;
    },
    showsubscriberForm() {
      this.subscriberForm = true;
    },
    closesubscriberForm() {
      this.subscriberForm = false;
      this.subscriberName = "";
      this.subscriberTel = "";
    },
    subscriberSubmit() {
      let telReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
      if (this.subscriberName.trim() !== "") {
        if (telReg.test(this.subscriberTel)) {
          this.subscriberUserInfo = "已填写完成";
          sessionStorage.setItem("subscriberName", this.subscriberName);
          sessionStorage.setItem("subscriberTel", this.subscriberTel);
          this.subscriberForm = false;
        } else {
          Notify({ type: "danger", message: "手机号格式不正确" });
        }
      } else {
        Notify({ type: "danger", message: "订购人姓名不能为空" });
      }
    },
    greetingMessageBlur() {
      sessionStorage.setItem("greetingMessage", this.greetingMessage);
    },
    buyerMessageBlur() {
      sessionStorage.setItem("buyerMessage", this.buyerMessage);
    },
  },
  mounted() {
    this.getAddressData();
    let d = new Date().getHours() + ":00";
    this.currentTime = d;
    let greetingMessage = "";
    if (this.greetingMessage == "") {
      greetingMessage = "该用户未填写";
    }
    sessionStorage.setItem("greetingMessage", greetingMessage);
    let buyerMessage = "";
    if (this.buyerMessage == "") {
      buyerMessage = "该用户未填写";
    }
    sessionStorage.setItem("subscriberTel", this.subscriberTel);
    sessionStorage.setItem("subscriberName", this.subscriberName);
    sessionStorage.setItem("buyerMessage", buyerMessage);
    sessionStorage.setItem("delivery_date", this.calendar);
    sessionStorage.setItem("delivery_time", this.delivery_time);
  },
};
</script>

<style lang="scss" scoped>
.check-address {
  .list {
    background-color: #fff;
    padding: 0.69rem;
  }
  .content {
    display: flex;
    margin-top: 0.69rem;
    .left {
      width: 90%;
      box-sizing: border-box;
      font-size: 0.875rem;
      div {
        .name {
          margin-right: 0.9375rem;
        }
      }
    }
    .right {
      width: 10%;
      display: flex;
      box-sizing: border-box;
      padding-left: 22px;
      justify-content: center;
      align-items: center;
    }
  }
  .check-other-address {
    width: 100%;
    height: 100vh;
    position: fixed;
    overflow-x: hidden;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 10001;
    .header {
      height: 3.125rem;
      display: flex;
      justify-content: space-between;
      .left,
      .right {
        width: 20%;
      }
      .content {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .address-list {
      padding: 0.69rem;
      display: flex;
      margin-top: 0.69rem;
      .left {
        width: 100%;
        box-sizing: border-box;
        font-size: 0.875rem;
        div {
          padding: 0.3125rem 0;
          .name {
            margin-right: 0.9375rem;
          }
        }
      }
      .detlias {
        -webkit-box-flex: 0;
        -webkit-flex: none;
        flex: none;
        padding: 0 0.3125rem;
        text-align: center;
        line-height: 1.4em;
        color: #fff;
        font-size: 0.75rem;
        background-color: #ee0a24;
        border-radius: 999px;
      }
    }
  }
  .delivery-date {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .item {
    padding: 0.625rem 0;
    border-bottom: 1px solid #f7f9fa;
  }
  .no-address {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .my-datetime-picker {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  .border {
    width: 100%;
    height: 3px;
    background: url(https://upyun.dinghuale.com/public/images/m_orderinfo_bd2.png);
    background-repeat: repeat-x;
    background-size: contain;
  }
  .wiiteback {
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 0.69rem;
    margin-top: 0.69rem;
    padding: 0.69rem;
    .maincont-telandarea-item {
      display: flex;
      justify-content: space-between;
    }
  }
  .subscriber-form {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    .header {
      height: 3.125rem;
      display: flex;
      justify-content: space-between;
      .left,
      .right {
        width: 20%;
      }
      .content {
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .subscriber-content {
      padding: 2.07rem 1.3862rem;
      font-size: 0.875rem;
      .subscriber-item {
        .subscriber-item-border {
          padding: 1.035rem 0;
          border-bottom: 2px solid #f7f9fa;
          .subscriber-name {
            font-size: 0.875rem;
          }
        }
      }
      .tel {
        margin-top: 0.9375rem;
      }
      .subscriber-remind {
        background-color: #fff0ec;
        margin-top: 22.08px;
        margin-bottom: 44.16px;
        padding: 1.035rem;
        font-size: 0.8625rem;
        border-radius: 5px;
        display: flex;
        align-items: center;
        .iconfont {
          font-size: 0.8625rem;
          margin-right: 0.8625rem;
          color: #ff734d;
        }
      }
      .submitbutton {
        width: 60%;
        padding: 0.69rem 1.38rem;
        background-color: #884e22;
        color: #ffffff;
        text-align: center;
        margin: 16px auto 0;
        border-radius: 20% / 100% 100% 100% 100%;
      }
    }
  }
  .leave-message {
    padding: 0.69rem;
    margin-bottom: 0.69rem;
    background-color: #ffffff;
    border-radius: 5px;
    .leave-message-left {
      .text {
        font-size: 1.035rem;
      }
    }
    .leave-message-righta {
      margin-top: 0.69rem;
      textarea {
        width: 100%;
        box-sizing: border-box;
        font-size: 0.875rem;
      }
    }
  }
}
</style>