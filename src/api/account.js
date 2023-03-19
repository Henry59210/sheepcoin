import request from "@/network/request";

export function getWalletList(param) {
    return request({
        url: '/paymentservice/v1/user/wallet/list/' + param,
        method: 'get',
        param
    })
}

export function topUp(data) {
    return request({
        url: '/paymentservice/v1/user/wallet/top_up',
        method: 'put',
        data: data
    })
}

export function deleteCards(param) {
    return request({
        url: '/sheepservice/v1/card/' + param,
        method: 'delete',
    })
}

export function addCard(data) {
    return request({
        url: '/sheepservice/v1/card',
        method: 'post',
        data: data
    })
}

export function getBuyOrder(param) {
    return request({
        url: '/sheepservice/v1/transaction/order/buyer-order/10/' + param,
        method: 'get',
    })
}
export function getSellOrder(param) {
    return request({
        url: '/sheepservice/v1/transaction/order/seller-order/10/' + param,
        method: 'get',
    })
}

export function getUserCredit(param) {
    return request({
        url: '/sheepservice/v1/userInfo/' + param,
        method: 'get',
    })
}
