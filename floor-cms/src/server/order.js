import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;

// 获取待审核的数量
export async function auditOrderCount() {
    const {
        data: res
    } = await axios.get(`/order/auditOrderCount`)
    return res
}

// 使用分页的形式获取所有数据
export async function getOrderAllByLimit(size, currentPage) {
    const {
        data: res
    } = await axios.get(`/order/getOrderAllByLimit`, {
        params: {
            size,
            currentPage
        }
    })
    return res
}

// 修改订单的数据
export async function changeOrderData(obj) {
    const {
        data: res
    } = await axios.post(`/order/changeOrderData`, {
        obj
    })
    return res
}

// 修改订单的状态

export async function changeOrderStatus(status, id) {
    const {
        data: res
    } = await axios.post(`/order/changeOrderStatus`, {
        status,
        id
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

// 按照id搜索订单
export async function searchOrder(keyword,size,currentPage) {
    const {
        data: res
    } = await axios.get(`/order/searchOrder`, {
        params: {
            keyword,
            size,
            currentPage
        }
    })
    return res
}

// 按照订单状态来获取数据

export async function selectOrderByStatus(status,size,currentPage) {
    const {
        data: res
    } = await axios.get(`/order/selectOrderByStatus`, {
        params: {
            status,
            size,
            currentPage
        }
    })
    return res
}