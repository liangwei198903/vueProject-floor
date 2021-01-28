import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;


// 获取商品评论内容
export async function getComments(good_id) {
    const {
        data: res
    } = await axios.get(`/comments/getComments/${good_id}`)
    return res
}