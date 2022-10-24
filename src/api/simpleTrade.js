import request from "@/network/request";

export function getAllCurrency(param) {
    return request({
        url: '/sheepservice/v1/currency/get-all',
        method: 'get',
        param
    })
}

export function getAllFiat(param) {
    return request({
        url: '/paymentservice/v1/payment/fiat/list?limit=3&offset=1',
        method: 'get',
        param
    })
}

export function getCard(param) {
    return request({
        url: '/sheepservice/v1/card',
        method: 'get',
        param
    })
}

export function getCurrencyAmount(param) {
    return request({
        url: '/paymentservice/v1/user/wallet/' + param,
        method: 'get',
        param
    })
}

export function drawCurrency(data) {
    return request({
        url: '/paymentservice/v1/user/wallet/draw',
        method: 'put',
        data: data
    })
}

export function getIcon(param) {
    return request({
        url: '/sheepservice/v1/currency/icon/' + param,
        method: 'get',
        param
    })
}
//-----express----
export function purchaseCurrency(data) {
    return request({
        url: '/sheepservice/v1/transaction/order/express/purchase',
        method: 'post',
        data: data
    })
}

export function sellCurrency(data) {
    return request({
        url: '/sheepservice/v1/transaction/order/express/sell',
        method: 'post',
        data: data
    })
}
//------p2p--------
export function getOrderList(param) {
    return request({
        url: '/sheepservice/v1/transaction/item/list/10/' + param,
        method: 'get',
        param
    })
}

export function p2pSellCurrency(data) {
    return request({
        url: '/sheepservice/v1/transaction/item',
        method: 'post',
        data: data
    })
}

export function p2pPurchaseCurrency(data) {
    return request({
        url: '/sheepservice/v1/transaction/order',
        method: 'post',
        data: data
    })
}

