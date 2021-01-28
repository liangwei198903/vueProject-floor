import axios from "axios"
import {
   serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;

// 将商品加入购物车
export async function joinCar(token, goods_id, price, count) {
    const {
       data: res
    } = await axios.post(`/shoppingCar/joinCar`, {
       data: {
          token,
          goods_id,
          price,
          count
       }
    })
    return res
 }

 // 查询用户购物车的商品的数量
export async function getCarCount(token) {
    const {
        data: res
    } = await axios.get(`/shoppingCar/getCarCount/${token}`)
    return res
}

export async function getCarData(token) {
    const {
        data: res
    } = await axios.get(`/shoppingCar/getCarData/${token}`)
    return res
}

// 通过id删除商品

export async function deleteItem(id) {
    const {
        data: res
    } = await axios.post(`/shoppingCar/deleteItem`,{id:id})
    return res
}

// 更新用户购物车的某个商品的数量
export async function updateCount(token,carId,count) {
    const {
        data: res
    } = await axios.post(`/shoppingCar/updateCount`,{
        token,
        carId,
        count
    })
    return res
}
