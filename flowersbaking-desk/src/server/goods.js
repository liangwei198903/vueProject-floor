import axios from "axios"
import {
   serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;
// 获取详情数据
export async function getGoodsTypeName(good_type) {
   const {
      data: res
   } = await axios.get(`/goods/getGoodsTypeName/${good_type}`)
   return res.data
}

// 获取类型
export async function getGoodsType(good_type) {
   const {
      data: res
   } = await axios.get(`/goods/getGoodsType/${good_type}`)
   return res.data
}

// 通过id获取某一个商品的信息
export async function getGoodsDetails(id) {
   const {
      data: res
   } = await axios.get(`/goods/getGoodsDetails/${id}`)
   return res.data
}

// 获取赠送类别
export async function getsuitable_scene(id) {
   const {
      data: res
   } = await axios.get(`/goods/getsuitable_scene/${id}`)
   return res.data
}

// 获取赠送类别列表
export async function getsuitable_sceneData(keyWord) {
   const {
      data: res
   } = await axios.get(`/goods/getsuitable_sceneData/${keyWord}`)
   return res.data
}

// 搜索框搜索
export async function getSearch(keyWord) {
   const {
      data: res
   } = await axios.get(`/goods/getSearch/${keyWord}`)
   return res.data
}

// 搜索热门
export async function getSearchHot(keyWord) {
   const {
      data: res
   } = await axios.get(`/goods/getSearchhot/${keyWord}`)
   return res.data
}