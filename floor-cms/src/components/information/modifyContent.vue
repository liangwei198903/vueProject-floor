// 修改文章内容
<template>
  <div class="modify-content">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资讯设置</el-breadcrumb-item>
        <el-breadcrumb-item>修改文章内容</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ contentData.title }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="goback"
            >返回</el-button
          >
        </div>
        <div>
          <div class="select-nav">
            <span>修改类别：</span>
            <el-select
              v-model="selected"
              placeholder="请选择"
              @change="selectChange"
            >
              <el-option
                v-for="item in NavList"
                :key="item.catid"
                :label="item.name"
                :value="item.catid"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-form
              label-position="top"
              label-width="80px"
              :model="contentData"
            >
              <el-form-item label="修改标题">
                <el-input v-model="contentData.title"></el-input>
              </el-form-item>

              <el-form-item label="修改副标题">
                <el-input v-model="contentData.title_text"></el-input>
              </el-form-item>

              <el-form-item label="上传标题图片">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="titleImgUploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                  :on-success="uploadSuccess"
                  :multiple="false"
                  name="titleImgupload"
                >
                  <el-button slot="trigger" size="small" type="primary"
                    >选取文件</el-button
                  >
                  <el-button
                    style="margin-left: 10px"
                    size="small"
                    type="success"
                    @click="submitUpload"
                    >上传到服务器</el-button
                  >
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div id="editor">
          <p v-html="contentData.details"></p>
        </div>
        <div class="submit">
          <el-button class="submit-btn" type="primary" @click="submitChnage"
            >提交修改</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getArticleitem,
  getNav,
  submitChangeContent,
} from "../../server/information";
import wangEditor from "wangeditor";
import { serverIndex } from "../../server/serverIndex";
export default {
  data() {
    return {
      contentData: {},
      editor: null,
      editorData: "",
      NavList: [],
      selected: "",
      fileList: [],
      titleImgUploadUrl: "",
    };
  },
  methods: {
    async getdata() {
      let id = this.$route.params.id;
      const res = await getArticleitem(id);
      if (res.code == 200) {
        this.contentData = res.data;
        console.log(this.contentData);
        this.$message({
          message: "获取数据成功",
          type: "success",
        });
      }
    },
    goback() {
      this.$router.go(-1);
    },
    // wangEditor 初始化事件
    wangEditorInit() {
      this.getdata();
      const editor = new wangEditor(`#editor`);
      editor.config.uploadFileName = "editorUpload";
      editor.config.uploadImgServer = `${serverIndex}/information/editorUpload`;
      editor.config.uploadImgMaxLength = 1;
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.contentData.details = newHtml;
      };
      // 创建编辑器
      editor.create();
      this.editor = editor;
    },
    async getNav() {
      const res = await getNav();
      if (res.code == 200) {
        this.NavList = res.data;
      }
    },
    selectChange() {
      this.contentData.catid = this.selected;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.contentData.title_img = response.src;
        this.$message({
          message: response.msg,
          type: "success",
        });
      }
    },
    async submitChnage() {
      console.log(this.contentData);
      const res = await submitChangeContent(this.contentData);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.$router.go(-1);
      }
    },
  },
  mounted() {
    this.wangEditorInit();
    this.getNav();
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
  created() {
    this.titleImgUploadUrl = serverIndex + "/information/uploadTitleImgUpload";
  },
};
</script>

<style lang="scss" scoped>
.modify-content {
  .card {
    margin-top: 20px;
  }
  .submit {
    width: 100%;
    margin-top: 20px;
    .submit-btn {
      width: 100%;
    }
  }
}
</style>