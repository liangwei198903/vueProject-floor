import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;



// 获取轮播图列表
export async function getBanner() {
    const {
        data: res
    } = await axios.get(`/home/getBanner`)
    return res
}

// 删除轮播图
export async function deleteSwiper(id) {
    const {
        data: res
    } = await axios.post(`/home/deleteSwiper`,{id})
    return res
}