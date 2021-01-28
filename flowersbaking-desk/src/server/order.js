import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;

// 提交订单
export async function submitOrders(token, obj) {
    const {
        data: res
    } = await axios.post(`/order/submitOrders`, {
        token,
        obj
    })
    return res
}

// 获取用户的订单列表
export async function getOrderList(token, status) {
    const {
        data: res
    } = await axios.post(`/order/getOrderList`, {
        token,
        status
    })
    return res
}

// 通过id获取用户的订单详情
export async function getOrderDetail(id) {
    const {
        data: res
    } = await axios.get(`/order/getOrderDetail/${id}`)
    return res
}

// 确定收货
export async function sureGoods(id, token,time) {
    const {
        data: res
    } = await axios.post(`/order/sureGoods`, {
        token,
        id,
        time
    })
    return res
}

// 删除订单
export async function deleteOrder(id) {
    const {
        data: res
    } = await axios.post(`/order/deleteOrder`, {
        id
    })
    return res
}


// 评论订单
export async function submitComments(id, comments_content, token) {
    const {
        data: res
    } = await axios.post(`/order/submitComments`, {
        token: token,
        id: id,
        comments_content: comments_content
    })
    return res
}


// 修改订单状态为完成
export async function reviewCompleted(id, token) {
    const {
        data: res
    } = await axios.post(`/order/reviewCompleted`, {
        token: token,
        id: id
    })
    return res
}

// 修改订单状态为待审核
export async function checkPending(id, token) {
    const {
        data: res
    } = await axios.post(`/order/checkPending`, {
        token: token,
        id: id
    })
    return res
}

// 确定收货后增加商品售量
export async function addSales(id, token, count) {
    const {
        data: res
    } = await axios.post(`/order/addSales`, {
        token: token,
        id: id,
        count: count
    })
    return res
}
// 取消退货退款申请

export async function cancelRefund(id, token) {
    const {
        data: res
    } = await axios.post(`/order/cancelRefund`, {
        token: token,
        id: id
    })
    return res
}