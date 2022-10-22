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
        url: '/v1/user/wallet/list/' + param,
        method: 'get',
        param
    })
}

