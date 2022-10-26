import request from '@/network/request'

export function addCurrency(data) {
    return request({
        url: '/sheepservice/v1/currency',
        method: 'post',
        data: data
    })
}

export function deleteCurrency(param) {
    return request({
        url: '/sheepservice/v1/currency/{id}' + param,
        method: 'delete',
    })
}
