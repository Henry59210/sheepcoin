import {getAllCurrency, getAllFiat} from "@/api/simpleTrade";

const getDefaultState = () => {
    return {
        fiatPaymentDialogVisible: false,
        allCurrency: [],
        allFiat: [],
        buyForm: {}
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
    },
    SET_BUYFORM:  (state, status) => {
        state.buyForm = status
    },
    SET_FIATDIALOG: (state, status) => {
        state.fiatPaymentDialogVisible = status
    }
}

const actions = {
    getAllCurrency({ commit }) {
        return new Promise((resolve, reject) => {
            getAllCurrency().then(response => {
                commit('SET_AllCURRENCY', response.data)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAllFiat({ commit }) {
        return new Promise((resolve, reject) => {
            getAllFiat().then(response => {
                commit('SET_ALLFIAT', response.data.records)
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
