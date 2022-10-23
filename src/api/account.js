import request from "@/network/request";

export function getWalletList(param) {
    return request({
        url: 'paymentservice/v1/user/wallet/list/' + param,
        method: 'get',
        param
    })
}

export function topUp(data) {
    return request({
        url: 'paymentservice/v1/user/wallet/top_up',
        method: 'put',
        data: data
    })
}
