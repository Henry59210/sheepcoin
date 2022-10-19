import {getAllCurrency, getAllFiat} from "@/api/simpleTrade";

const getDefaultState = () => {
    return {
        allCurrency: [],
        allFiat: []
    }
}
const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_AllCURRENCY: (state, allCurrency) => {
        state.allCurrency = allCurrency
    },
    SET_ALLFIAT: (state, allFiat) => {
        state.allFiat = allFiat
    }
}

const actions = {
    getAllCurrency({ commit }) {
        return new Promise((resolve, reject) => {
            getAllCurrency().then(response => {
                commit('SET_AllCURRENCY', response)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAllFiat({ commit }) {
        return new Promise((resolve, reject) => {
            getAllFiat().then(response => {
                const { record } = response
                commit('SET_ALLFIAT', record)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
