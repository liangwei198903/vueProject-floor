import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;

// 登录
export async function login(username, password) {
    const {
        data: res
    } = await axios.post(`/user/cmsLogin`, {
        username,
        password
    })
    return res
}

// 检查token是否有效
export async function checkToken(token) {
    const {
        data: res
    } = await axios.post(`/user/checkToken`, {
        token
    })
    return res
}