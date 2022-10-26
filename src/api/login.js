import request from '@/network/request'

export function register(data) {
    return request({
        url: '/authservice/v1/register',
        method: 'post',
        data
    })
}

export function login(data) {
    return request({
        url: '/authservice/v1/login',
        method: 'post',
        data
    })
}

export function getInfo(params) {
    return request({
        url: '/sheepservice/v1/account',
        method: 'get',
        params
    })
}

export function logout() {
    return request({
        url: '/authservice/v1/logout',
        method: 'get'
    })
}
