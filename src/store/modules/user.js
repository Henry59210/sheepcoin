import { register, login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/network/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        username: '',
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, username) => {
        state.username = username
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { token } = response
                commit('SET_TOKEN', token)
                setToken(token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    register({ commit }, registerInfo) {
        const { username, password, phoneNum, email } = registerInfo
        return new Promise((resolve, reject) => {
            register({ username: username.trim(), password: password, phoneNum: phoneNum, email: email }).then(response => {
                const { token } = response
                commit('SET_TOKEN', token)
                setToken(token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }

                const { username } = data

                commit('SET_NAME', username)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

