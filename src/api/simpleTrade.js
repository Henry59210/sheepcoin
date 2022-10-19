import request from "@/network/request";

export function geyAllCurrency(param) {
    return request({
        url: '/v1/currency/get-all',
        method: 'get',
        param
    })
}

export function geyAllFiat(param) {
    return request({
        url: '/v1/fiat/get-all',
        method: 'get',
        param
    })
}

export function getCurrentPrice(param) {
    return request({
        url: '/v1/currency/' + param,
        method: 'get',
    })
}

