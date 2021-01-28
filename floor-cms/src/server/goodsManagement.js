import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;


// 获取商品列表
export async function getGoodsByLimit(size, currentPage) {
    const {
        data: res
    } = await axios.get(`/goods/getGoodsByLimit`, {
        params: {
            size,
            currentPage
        }
    })
    return res
}

// 获取商品类别

export async function gootdType() {
    const {
        data: res
    } = await axios.get(`/goods/gootdType`)
    return res
}

// 修改商品是否首页显示
export async function changeIsindexShow(id, status) {
    const {
        data: res
    } = await axios.post(`/goods/changeIsindexShow`, {
        id,
        status
    })
    return res
}

// 关键字进行搜索
export async function getGoodsByKeyword(keyword, size, currentPage) {
    const {
        data: res
    } = await axios.get(`/goods/getGoodsByKeyword`, {
        params: {
            keyword,
            size,
            currentPage,
        }
    })
    return res
}

// 按类别获取数据

export async function getGoodsBySelect(id, size, currentPage) {
    const {
        data: res
    } = await axios.get(`/goods/getGoodsBySelect`, {
        params: {
            id,
            size,
            currentPage,
        }
    })
    return res
}

// 通过id获取某个商品的信息

export async function getGoodsDetails(id) {
    const {
        data: res
    } = await axios.get(`/goods/getGoodsDetails/${id}`)
    return res
}

// 获取标题名称列表
export async function getGoodsTitle() {
    const {
        data: res
    } = await axios.get(`/goods/getGoodsTitle`)
    return res
}


// 获取使用场景类别
export async function getGoodsSuitableScene() {
    const {
        data: res
    } = await axios.get(`/goods/getGoodsSuitableScene`)
    return res
}

// 提交修改的内容
export async function changeGoods(obj) {
    const {
        data: res
    } = await axios.post(`/goods/changeGoods`, {
        obj
    })
    return res
}

// 获取某件商品的评论数据
export async function getComments(id) {
    const {
        data: res
    } = await axios.get(`/comments/getComments/${id}`)
    return res
}

// 修改某件商品的评论内容

export async function changeComments(id, comments) {
    const {
        data: res
    } = await axios.post(`/comments/changeComments`, {
        comments,
        id
    })
    return res
}

// 删除某条评论
export async function deleteComment(id) {
    const {
        data: res
    } = await axios.post(`/comments/deleteComment`, {
        id
    })
    return res
}

// 发布商品
export async function releaseGoods(obj) {
    const {
        data: res
    } = await axios.post(`/goods/releaseGoods`, {
        obj
    })
    return res
}

// 删除某件商品

export async function deleteGoods(id) {
    const {
        data: res
    } = await axios.post(`/goods/deleteGoods`, {
        id
    })
    return res
}



// 增加类型
export async function addGoodTitleName(goodTitleName) {
    const {
        data: res
    } = await axios.post(`/goods/addGoodTitleName`, {
        goodTitleName
    })
    return res
}