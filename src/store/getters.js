const getters = {
    token: state => state.user.token,
    username: state => state.user.username,
    allCurrency: state => state.trade.allCurrency,
    allFiat: state => state.trade.allFiat
}
export default getters
