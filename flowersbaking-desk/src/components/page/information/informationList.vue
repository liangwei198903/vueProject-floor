<template>
  <div class="information-list">
    <div class="title">
      <h3>
        <span>{{ $route.params.name }}</span>
      </h3>
    </div>
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in data"
        :key="index"
        @click="goDetail(item.id)"
      >
        <div class="imgs">
          <img v-lazy="item.title_img" />
        </div>
        <div class="content">
          <div class="item-title">{{ item.title }}</div>
          <p class="text">
            {{ item.title_text }}
          </p>
          <div class="lab_grp">
            <span class="tag" v-show="item.tag_name != ''">
              {{ item.tag_name }}
            </span>
            <span
              class="viewed"
              :style="
                item.tag_name == ''
                  ? { paddingLeft: '0' }
                  : { paddingLeft: '0.9375rem' }
              "
            >
              <span class="icon"></span>
              <span class="count">{{ item.viewed_count }}</span>
            </span>
            <span class="time">
              {{ item.time }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { serverIndex } from "../../../server/serverIndex";
import { getArticleList, addReading } from "../../../server/information";
export default {
  data() {
    return {
      serverIndex: "",
      data: [],
    };
  },
  methods: {
    async getArticleLists() {
      let catid = this.$route.params.catid;
      this.data = await getArticleList(catid);
      this.data.forEach((item) => {
        item.title_img = serverIndex + item.title_img;
      });
    },
    async goDetail(id) {
      const res = await addReading(id);
      this.$router.push({ name: "informationDetail", params: { infoId: id } });
    },
  },
  created() {
    this.getArticleLists();
  },
};
</script>

<style lang="scss" scoped>
.information-list {
  height: 100%;
  .title {
    border-bottom: 1px solid #eee;
    padding: 0.3125rem 0;
    h3 {
      height: 30px;
      text-align: center;
      span {
        display: block;
        float: left;
        width: 100%;
        text-align: center;
        font-size: 28px;
        color: #d7000f;
        font-weight: bold;
        line-height: 100%;
      }
    }
  }
  .list {
    padding: 0.9375rem 0;
    padding-top: 0.3125rem;
    .item {
      display: flex;
      justify-content: space-between;
      border-bottom: 0.0625rem solid #eee;
      padding: 0.3125rem 0;
      div.imgs {
        width: 30%;
        display: flex;
        align-items: center;
      }
      div.content {
        width: 70%;
        box-sizing: border-box;
        padding: 0.3125rem;
        .item-title {
          color: rgb(51, 51, 51);
          width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
          font-size: 0.9375rem;
          overflow: hidden;
        }
        p.text {
          padding-top: 0.5rem;
          font-size: 0.625rem;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .lab_grp {
          margin-top: 0.5rem;
          height: 1.5rem;
          display: flex;
          line-height: 1.5rem;
          .tag {
            font-size: 0.625rem;
          }
          .viewed {
            box-sizing: border-box;
            .icon {
              width: 16px;
              height: 12px;
              background: url(https://static.chinapp.com/home/img/bg.png) -579px -43px
                no-repeat;
              float: left;
              margin: 6px 5px 0 0;
            }
            .count {
              font-size: 10px;
            }
          }
          .time {
            font-size: 0.625rem;
            line-height: 1.5rem;
            box-sizing: border-box;
            padding-left: 0.9375rem;
          }
        }
      }
    }
  }
}
</style>