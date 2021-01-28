import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;

// 登录
export async function login(username, password) {
    const {
        data: res
    } = await axios.post(`/user/login`, {
        username,
        password
    })
    return res
}

// 注册
export async function reg(username, password) {
    const {
        data: res
    } = await axios.post(`/user/reg`, {
        username,
        password
    })
    return res
}
export async function changePassWrod(token, password) {
    const {
        data: res
    } = await axios.post(`/user/changePassWrod`, {
        token,
        password
    })
    return res
}


// 获取用户的地址列表
export async function getAddress(token) {
    const {
        data: res
    } = await axios.post(`/user/getAddress`, {
        token
    })
    return res
}

// 通过id获取用户的地址
export async function getAddressById(id) {
    const {
        data: res
    } = await axios.get(`/user/getAddress/${id}`)
    return res
}

// 修改用户的地址
export async function changeAddress(token, obj) {
    const {
        data: res
    } = await axios.post(`/user/changeAddress`, {
        token,
        obj
    })
    return res
}

// 通过id删除用户的地址

export async function deleteAddress(token, id) {
    const {
        data: res
    } = await axios.post(`/user/deleteAddress`, {
        token,
        id
    })
    return res
}


// 添加收货地址
export async function addAddress(token, obj) {
    const {
        data: res
    } = await axios.post(`/user/addAddress`, {
        token,
        obj
    })
    return res
}

// 修改用户的超级密码

export async function changeSuperPassword(token, value) {
    const {
        data: res
    } = await axios.post(`/user/changeSuperPassword`, {
        token,
        value
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