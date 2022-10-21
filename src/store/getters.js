const getters = {
    token: state => state.user.token,
    username: state => state.user.username,
    buyForm: state => state.trade.buyForm,
    allCurrency: state => state.trade.allCurrency,
    allFiat: state => state.trade.allFiat,
    fiatPaymentDialogVisible: state => state.fiatPaymentDialogVisible

}
export default getters
