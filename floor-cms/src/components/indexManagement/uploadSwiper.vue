<template>
  <div class="upload-swiper">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>首页管理</el-breadcrumb-item>
        <el-breadcrumb-item>上传轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>轮播图上传</span>
        </div>
        <div class="upload">
          <el-upload class="upload-demo" drag :action="serverIndex" :on-success='uploadSuccess' :multiple="false" name="upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { serverIndex } from "../../server/serverIndex";
export default {
  data() {
    return {
      serverIndex: "",
    };
  },
  methods:{
    uploadSuccess(response, file, fileList){
      if(response.code==200){
        this.$message({
          message:response.msg ,
          type: "success",
        });
      }
    }
  },
  created() {
    this.serverIndex = serverIndex + "/home/uploadSwiper";
  },
};
</script>

<style lang="scss" scoped>
.upload-swiper {
  .card {
    margin-top: 20px;
  }
}
</style>