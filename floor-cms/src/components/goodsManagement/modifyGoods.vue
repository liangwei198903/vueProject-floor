<template>
  <div class="modify-goods">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改商品</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="goBack"
            >返回</el-button
          >
        </div>
        <div>
          <el-form
            label-position="top"
            label-width="80px"
            :model="goodData"
            :rules="rules"
            ref="ruleForm"
            class="my-from"
          >
            <el-form-item label="商品名称:" prop="name" class="my-form-item">
              <el-input v-model="goodData.name" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="商品类型:" prop="title" class="my-form-item">
              <el-select
                v-model="titleSelect"
                :placeholder="goodData.title"
                @change="selectTitleChange"
              >
                <el-option
                  v-for="item in titleArr"
                  :key="item.good_tag_id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="商品原价:"
              prop="original_price"
              class="my-form-item"
            >
              <el-input
                v-model="goodData.original_price"
                style="width: 350px"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品现价:" prop="price" class="my-form-item">
              <el-input
                v-model="goodData.price"
                style="width: 350px"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="是否首页显示:"
              prop="isIndexShow"
              class="my-form-item"
            >
              <el-switch
                v-model="goodData.isIndexShow"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
            <el-form-item
              label="商品适合场景:"
              prop="title"
              class="my-form-item"
            >
              <el-select
                v-model="goodData.suitable_scene"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签"
              >
                <el-option
                  v-for="item in suitableSceneArr"
                  :key="item.sid"
                  :label="item.sname"
                  :value="item.sid.toString()"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品图片:" prop="name" class="my-form-item">
              <div class="imgSwiperArr">
                <el-image
                  style="width: 100px; height: 100px; margin-right: 15px"
                  :src="goodData.src"
                  fit="scale-down"
                ></el-image>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击上传替换商品图片"
                  placement="right"
                >
                  <el-upload
                    class="my-upload"
                    name="goodsTitleUpload"
                    :action="goodsTitleSrc"
                    list-type="picture-card"
                    :limit="1"
                    :on-success="goodsTitleSrcuploadSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item label="商品轮播图:" style="width: 100%">
              <div class="imgSwiperArr">
                <span
                  v-for="(item, index) in goodData.goodsSwiperArr"
                  :key="index"
                  class="my-images"
                  @mouseenter="imagemouseover(index)"
                  @mouseleave="imagemouseleave(index)"
                >
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 15px"
                    :src="item"
                    fit="scale-down"
                  ></el-image>
                  <i
                    class="el-icon-close my-icon"
                    ref="myIcon"
                    @click="removeGoodSwiper(item, index)"
                  ></i>
                </span>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击上传商品轮播图"
                  placement="right"
                >
                  <el-upload
                    class="my-upload"
                    name="goodsSwiperUpload"
                    :action="goodsSwiperUploadSrc"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :on-success="goodsSwiperuploadSuccess"
                    :limit="1"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item label="商品详情图片:" style="width: 100%">
              <div class="imgSwiperArr">
                <span
                  v-for="(item, index) in goodData.goodsDetailsImgArr"
                  :key="index"
                  class="my-images"
                  @mouseenter="goodsDetailmouseover(index)"
                  @mouseleave="goodsDetailmouseleave(index)"
                >
                  <el-image
                    style="width: 100px; height: 100px; margin-right: 15px"
                    :src="item"
                    fit="scale-down"
                  ></el-image>
                  <i
                    class="el-icon-close my-icon"
                    ref="myDetailsIcon"
                    @click="removeGoodDetailImg(item, index)"
                  ></i>
                </span>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Top Center 提示文字"
                  placement="top"
                >
                  
                </el-tooltip>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="点击上传商品详情图片"
                  placement="right"
                >
                  <el-upload
                    class="my-upload"
                    name="goodsDetailUpload"
                    :action="goodsDetailUploadSrc"
                    :limit="1"
                    list-type="picture"
                    :on-remove="handleRemove"
                    :on-success="goodsdetailuploadSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-tooltip>
              </div>
            </el-form-item>
            <el-form-item label="商品材料:" prop="material" style="width: 60%">
              <el-input
                type="textarea"
                rows="5"
                v-model="goodData.material"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品包装:" prop="packaging" style="width: 60%">
              <el-input
                type="textarea"
                rows="5"
                v-model="goodData.packaging"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品附送:" prop="attached" style="width: 60%">
              <el-input
                type="textarea"
                rows="5"
                v-model="goodData.attached"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品配送:" prop="attached" style="width: 60%">
              <el-input
                type="textarea"
                rows="5"
                v-model="goodData.distribution"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="submit-btn">
          <el-button class="my-submit-btn" type="primary" @click="submit"
            >提交修改</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getGoodsDetails,
  getGoodsTitle,
  getGoodsSuitableScene,
  changeGoods,
} from "../../server/goodsManagement";
import { serverIndex } from "../../server/serverIndex";
export default {
  data() {
    return {
      goodData: {},
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请输入商品名称", trigger: "change" },
        ],
        title: [{ required: true, message: "请选择商品类型", trigger: "blur" }],
        isIndexShow: [{ required: true }],
        original_price: [{ required: true }],
        price: [{ required: true }],
        material: [{ required: true }],
        packaging: [{ required: true }],
        attached: [{ required: true }],
        distribution: [{ required: true }],
      },
      titleArr: [],
      titleSelect: "",
      goodsTitleSrc: "",
      goodsSwiperUploadSrc: "",
      goodsDetailUploadSrc: "",
      suitableSceneArr: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getGoodData() {
      const res = await getGoodsDetails(this.$route.params.id);
      if (res.code == 200) {
        this.goodData = res.data;
        this.goodData.suitable_scene = this.goodData.suitable_scene.split(",");
        this.goodData.src = serverIndex + this.goodData.src;
        this.goodData.goodsSwiperArr = this.goodData.goodsSwiperArr.split(",");
        this.goodData.goodsSwiperArr.forEach((i, index) => {
          this.goodData.goodsSwiperArr[index] =
            serverIndex + this.goodData.goodsSwiperArr[index];
        });
        this.goodData.goodsDetailsImgArr = this.goodData.goodsDetailsImgArr.split(
          ","
        );
        this.goodData.goodsDetailsImgArr.forEach((item2, index) => {
          this.goodData.goodsDetailsImgArr[index] =
            serverIndex + this.goodData.goodsDetailsImgArr[index];
        });
        if (this.goodData.isIndexShow == 0) {
          this.goodData.isIndexShow = false;
        }
        if (this.goodData.isIndexShow == 1) {
          this.goodData.isIndexShow = true;
        }
      }
      console.log(this.goodData);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getGoodsTitle() {
      const res = await getGoodsTitle();
      if (res.code == 200) {
        this.titleArr = res.data;
      }
    },
    selectTitleChange() {
      this.goodData.title = this.titleSelect;
    },
    imagemouseover(index) {
      this.$refs.myIcon[index].className =
        this.$refs.myIcon[index].className + " show";
    },
    imagemouseleave(index) {
      this.$refs.myIcon[index].className = this.$refs.myIcon[
        index
      ].className.replace(" show", "");
    },
    removeGoodSwiper(item, index) {
      this.goodData.goodsSwiperArr.splice(index, 1);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    goodsSwiperuploadSuccess(response, file, fileList) {
      if (response.code == 200) {
        let fileSrc = serverIndex + response.src;
        this.goodData.goodsSwiperArr.push(fileSrc);
        this.$message({
          message: response.msg,
          type: "success",
        });
      }
    },
    goodsTitleSrcuploadSuccess(response, file, fileList) {
      if (response.code == 200) {
        let fileSrc = serverIndex + response.src;
        this.goodData.src = fileSrc;
        console.log(this.goodData.src);
        this.$message({
          message: response.msg,
          type: "success",
        });
      }
    },
    goodsdetailuploadSuccess(response, file, fileList) {
      if (response.code == 200) {
        let fileSrc = serverIndex + response.src;
        this.goodData.goodsDetailsImgArr.push(fileSrc);
        this.$message({
          message: response.msg,
          type: "success",
        });
      }
    },
    async getGoodsSuitableScene() {
      const res = await getGoodsSuitableScene();
      if (res.code == 200) {
        this.suitableSceneArr = res.data;
      }
    },
    removeGoodDetailImg(item, index) {
      this.goodData.goodsDetailsImgArr.splice(index, 1);
    },
    goodsDetailmouseover(index) {
      this.$refs.myDetailsIcon[index].className =
        this.$refs.myDetailsIcon[index].className + " show";
    },
    goodsDetailmouseleave(index) {
      this.$refs.myDetailsIcon[index].className = this.$refs.myDetailsIcon[
        index
      ].className.replace(" show", "");
    },
    async submit() {
      let obj = this.goodData;
      if (obj.name.trim() == "") {
        this.$message({
          showClose: true,
          message: "商品名称不能为空",
          type: "error",
        });
        return;
      }
      if (obj.title == "") {
        this.$message({
          showClose: true,
          message: "请填写商品标题",
          type: "error",
        });
        return;
      }

      if (obj.price == 0) {
        this.$message({
          showClose: true,
          message: "请输入商品价格",
          type: "error",
        });
        return;
      }

      if (obj.original_price == 0) {
        this.$message({
          showClose: true,
          message: "请输入商品原价",
          type: "error",
        });
        return;
      }

      if (obj.suitable_scene.length == 0) {
        this.$message({
          showClose: true,
          message: "请最少选择一个商品适合场景",
          type: "error",
        });
        return;
      }
      if (obj.src == "") {
        this.$message({
          showClose: true,
          message: "请上传商品标题图片",
          type: "error",
        });
        return;
      }

      if (obj.goodsSwiperArr.length == 0) {
        this.$message({
          showClose: true,
          message: "请最少上传一张轮播图片",
          type: "error",
        });
        return;
      }

      if (obj.goodsDetailsImgArr.length == 0) {
        this.$message({
          showClose: true,
          message: "请最上传商品详情图片",
          type: "error",
        });
        return;
      }

      if (obj.material.trim() == "") {
        this.$message({
          showClose: true,
          message: "请填写商品材料说明",
          type: "error",
        });
        return;
      }
      if (obj.packaging.trim() == "") {
        this.$message({
          showClose: true,
          message: "请填写商品包装说明",
          type: "error",
        });
        return;
      }

      if (obj.attached.trim() == "") {
        this.$message({
          showClose: true,
          message: "请填写商品附送说明",
          type: "error",
        });
        return;
      }

      if (obj.distribution.trim() == "") {
        this.$message({
          showClose: true,
          message: "请填写商品配送说明",
          type: "error",
        });
        return;
      }
      obj.goodsDetailsImgArr.forEach((item, index) => {
        obj.goodsDetailsImgArr[index] = obj.goodsDetailsImgArr[index].replace(
          serverIndex,
          ""
        );
      });
      obj.goodsSwiperArr.forEach((item, index) => {
        obj.goodsSwiperArr[index] = obj.goodsSwiperArr[index].replace(
          serverIndex,
          ""
        );
      });
      obj.src = obj.src.replace(serverIndex, "");
      obj.suitable_scene = obj.suitable_scene.join();
      obj.goodsSwiperArr = obj.goodsSwiperArr.join();
      obj.goodsDetailsImgArr = obj.goodsDetailsImgArr.join();
      console.log(obj);
      const res = await changeGoods(obj);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.$router.replace({ name: "goodsManagement" });
      }
      if (res.code == 400) {
        this.$message({
          message: res.msg,
          type: "error",
        });
      }
    },
  },
  mounted() {
    this.getGoodData();
    this.getGoodsTitle();
    this.getGoodsSuitableScene();
    this.goodsTitleSrc = serverIndex + "/goods/goodsTitleUpload";
    this.goodsSwiperUploadSrc = serverIndex + "/goods/goodsSwiperUpload";
    this.goodsDetailUploadSrc = serverIndex + "/goods/goodsDetailUpload";
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 20px;
}
.my-from {
  display: flex;
  flex-wrap: wrap;
  .my-form-item {
    width: 50%;
  }
  .my-textarea {
    height: 100px;
  }
  .imgSwiperArr {
    display: flex;
    .my-upload {
      width: 100px;
      height: 100px;
      ::v-deep.el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
      }
      ::v-deep.el-upload--picture {
        width: 100px;
        height: 100px;
        line-height: 100px;
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
      }
      ::v-deep.el-icon-plus {
        font-size: 28px;
      }
      ::v-deep.el-upload-list {
        display: none;
      }
    }
    .my-images {
      position: relative;
      display: inline-block;
      width: 100px;
      height: 100px;
      margin-right: 15px;
      .my-icon {
        //   display: none;
        width: 100px;
        height: 100px;
        font-size: 40px;
        position: absolute;
        text-align: center;
        line-height: 100px;
        top: 0px;
        right: 0px;
        background-color: rgb(83, 82, 92);
        opacity: 0;
        transition: opacity 0.5s;
        color: #fff;
      }
      .show {
        opacity: 0.5;
        //   display: block;
        cursor: pointer;
      }
    }
  }
  .submit-btn {
    width: 100%;
    .my-submit-btn {
      display: block;
      width: 100%;
    }
  }
}
</style>