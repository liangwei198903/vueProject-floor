<template>
  <div class="add-information">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资讯设置</el-breadcrumb-item>
        <el-breadcrumb-item>新建资讯</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加资讯</span>
        </div>
        <div>
          <el-input
            v-model="categoryName"
            placeholder="请输入要添加类别的名称"
            style="width: 250px"
          ></el-input>
          <el-button @click="addCategoryName">添加</el-button>
        </div>
        <div class="item">
          <el-form
            label-position="top"
            label-width="80px"
            :model="informationData"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item label="选取类别(必选)" prop="title">
              <el-select v-model="informationData.catid" placeholder="请选择">
                <el-option
                  v-for="item in NavList"
                  :key="item.catid"
                  :label="item.name"
                  :value="item.catid"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题(必填)" prop="title">
              <el-input
                v-model="informationData.title"
                ref="titleRef"
              ></el-input>
            </el-form-item>

            <el-form-item label="内容简介(必填)" prop="title_text">
              <el-input v-model="informationData.title_text"></el-input>
            </el-form-item>
            <el-form-item label="副类别(可选)">
              <el-input v-model="informationData.tag_name"></el-input>
            </el-form-item>
            <el-form-item label="上传标题图片(必选)" prop="title_img">
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
                :limit="1"
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
            <el-form-item label="文章详情(必填)" prop="details">
              <div id="editor"></div>
            </el-form-item>
          </el-form>
        </div>
        <div class="submit-btn">
          <el-button type="primary" class="btn" @click="submit"
            >提交文章</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { serverIndex } from "../../server/serverIndex";
import {
  getNav,
  getAllInformation,
  deleteArticle,
  addInformation,
  addCategoryName,
} from "../../server/information";
import wangEditor from "wangeditor";
export default {
  data() {
    return {
      categoryName: "",
      NavList: [],
      informationData: {
        catid: "",
        title: "",
        title_text: "",
        title_img: "",
        details: "",
        tag_name: "",
        viewed_count: 0,
      },
      titleImgUploadUrl: "",
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        title_text: {
          required: true,
          message: "请输入内容简介",
          trigger: "blur",
        },
        details: {
          required: true,
        },
        selected: {
          required: true,
        },
        title_img: {
          required: true,
        },
      },
      dialogVisible: false,
    };
  },
  methods: {
    async getNav() {
      const res = await getNav();
      if (res.code == 200) {
        this.NavList = res.data;
      }
    },
    async uploadSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.informationData.title_img = response.src;
        this.$message({
          message: response.msg,
          type: "success",
        });
        let time = new Date().toLocaleDateString().replace(/[/]/g, "-");
        this.informationData.time = time;
        this.informationData.details_img = this.informationData.title_img;
        if (
          this.informationData.title.trim() !== "" &&
          this.informationData.title_text.trim() !== "" &&
          this.informationData.details.trim() !== "" &&
          this.informationData.catid !== "" &&
          this.informationData.title_img.trim() !== ""
        ) {
          const res = await addInformation(this.informationData);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
          }
          if (res.code == 400) {
            this.$message.error(res.msg);
          }
        } else {
          this.$message.error("请填写必选项");
        }
      }
    },
    // 增加分类
    async addCategoryName() {
      if(this.categoryName.trim()==''){
        this.$message({
          message: "分类名称不能为空",
          type: "error",
        })
        return;
      }
       let categoryName = this.categoryName;
      const res = await addCategoryName(categoryName);
      if(res.code==200){
        this.getNav()
        this.categoryName=""
      }
      if(res.code==400){
        this.$message({
          message: res.msg,
          type: "error",
        })
      }
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
    wangEditorInit() {
      const editor = new wangEditor(`#editor`);
      editor.config.uploadFileName = "editorUpload";
      editor.config.uploadImgServer = `${serverIndex}/information/editorUpload`;
      editor.config.uploadImgMaxLength = 1;
      editor.config.zIndex = 500;
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = (newHtml) => {
        this.informationData.details = newHtml;
      };
      // 创建编辑器
      editor.create();
      this.editor = editor;
    },
    // 将结果提交到数据库
    submit() {
      this.$refs.upload.submit();
    },
  },
  mounted() {
    this.getNav();
    this.wangEditorInit();
  },
  created() {
    this.titleImgUploadUrl = serverIndex + "/information/uploadTitleImgUpload";
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.add-information {
  .card {
    margin-top: 20px;
    .submit-btn {
      width: 100%;
      .btn {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>