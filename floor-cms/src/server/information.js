import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;

// 获取类别
export async function getNav() {
    const {
        data: res
    } = await axios.get(`/information/getNav`)
    return res
}

// 获取文章列表
export async function getAllInformation(catid, size, currentPage) {
    const {
        data: res
    } = await axios.get(`/information/getAllInformation`, {
        params: {
            catid,
            size,
            currentPage
        }
    })
    return res
}

// 根据id获取文章内容
export async function getArticleitem(id) {
    const {
        data: res
    } = await axios.get(`/information/getArticleitem/${id}`)
    return res
}


// 提交修改文章数据
export async function submitChangeContent(obj) {
    const {
        data: res
    } = await axios.post(`/information/submitChangeContent`, {
        obj
    })
    return res
}

// 删除文章
export async function deleteArticle(id) {
    const {
        data: res
    } = await axios.post(`/information/deleteArticle`, {
        id
    })
    return res
}


// 创建文章 
export async function addInformation(obj) {
    const {
        data: res
    } = await axios.post(`/information/addInformation`, {
        obj
    })
    return res
}

// 增加类别
export async function addCategoryName(categoryName) {
    const {
        data: res
    } = await axios.post(`/information/addCategoryName`, {
        categoryName
    })
    return res
}