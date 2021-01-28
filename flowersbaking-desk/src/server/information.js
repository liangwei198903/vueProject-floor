import axios from "axios"
import {serverIndex} from "./serverIndex"
axios.defaults.baseURL = serverIndex;
// 获取导航栏
export async function getNav(){
   const {data:res} =await axios.get("/information/getNav")
   return res.data
}

//获取根据catid获取文章列表 
export async function getArticleList(catid){
   const {data:res} =await axios.get(`/information/getArticleLists/${catid}`)
   return res.data
}

// 获取文章信息
export async function getArticleitem(id){
   const {data:res} =await axios.get(`/information/getArticleitem/${id}`)
   return res.data
}

// 点击添加阅读次数



export async function addReading(id){
   const {data:res} =await axios.get(`/information/addReading/${id}`)
   return res
}


