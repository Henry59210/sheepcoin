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
        url: '/v1/userAccount',
        method: 'get',
        params
    })
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}
