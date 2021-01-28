import axios from "axios"
import {serverIndex} from "./serverIndex"
axios.defaults.baseURL = serverIndex;
// 获取轮播图
export async function getBanner(){
   const {data:res} =await axios.get("/home/getBanner")
   return res.data
}
// 获取导航栏
export async function getNav(){
    const {data:res} =await axios.get("/home/homeNav")
    return res.data
 }
// 获取快速导航栏
 export async function getImgNav(){
    const {data:res} =await axios.get("/home/imgNav")
    return res.data
 }

// 获取模块类型名称
export async function getGoodsType(){
   const {data:res} =await axios.get(`/home/getGoodsType`)
   return res.data
}
// 获取模块数据
export async function getModule(tagId){
    const {data:res} =await axios.get(`/home/module/${tagId}`)
    return res.data
 }