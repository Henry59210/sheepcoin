
const getters = {
    token: state => state.user.token,
    userid: state => state.user.userid,
    username: state => state.user.username,
    roles: state => state.user.roles,
    permission_routes: state => state.permission.routes,
    buyForm: state => state.trade.buyForm,
    sellForm: state => state.trade.sellForm,
    allCurrency: state => state.trade.allCurrency,
    allFiat: state => state.trade.allFiat,
    sellType: state => state.trade.sellType,
    buyType: state => state.trade.buyType,
    fiatPaymentDialogVisible: state => state.fiatPaymentDialogVisible,
    currencySellDialogVisible: state => state.currencySellDialogVisible
}
export default getters
