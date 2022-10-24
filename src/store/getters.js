const getters = {
    token: state => state.user.token,
    userid: state => state.user.userid,
    username: state => state.user.username,
    buyForm: state => state.trade.buyForm,
    sellForm: state => state.trade.sellForm,
    allCurrency: state => state.trade.allCurrency,
    allFiat: state => state.trade.allFiat,
    fiatPaymentDialogVisible: state => state.fiatPaymentDialogVisible,
    currencySellDialogVisible: state => state.currencySellDialogVisible
}
export default getters
