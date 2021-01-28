import axios from "axios"
import {
    serverIndex
} from "./serverIndex"
axios.defaults.baseURL = serverIndex;

export async function getGoodsSales(id) {
    const {
        data: res
    } = await axios.get(`/goods/getGoodsSales/${id}`)
    return res
}