import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;



// 获取用户列表
export async function getAllUser(size, currentPage) {
    const {
        data: res
    } = await axios.get(`/user/allUser`, {
        params: {
            size,
            currentPage
        }
    })
    return res
}


// 修改用户是否允许登录
export async function changeOnline(id, status) {
    const {
        data: res
    } = await axios.post(`/user/changeOnline`, {
        id,
        status
    })
    return res
}

// 修改用户信息

export async function changeUserData(id, username, isOnline, superPassword) {
    const {
        data: res
    } = await axios.post(`/user/changeUserData`, {
        id,
        username,
        isOnline,
        superPassword
    })
    return res
}

// 通过关键字获取用户
export async function getUserByKeyWord(keyword, size, currentPage) {
    const {
        data: res
    } = await axios.get(`/user/getUserByKeyWord`, {
        params: {
            size,
            currentPage,
            keyword
        }
    })
    return res
}

// 通过id删除用户
export async function deleteUser(id) {
    const {
        data: res
    } = await axios.post(`/user/deleteUser`, {
        id,
    })
    return res
}