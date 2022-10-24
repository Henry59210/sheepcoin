<template>
  <div>
    <div class="trade-options-container">
      <el-menu
          :default-active="activateName"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#1f2138"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handClick" >
        <el-menu-item v-for="item in simpleTrade" :key="item.path" :index="item.path" @click.native.prevent="activateName=item.path">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="trade-area">
      <router-view></router-view>
    </div>
    <el-dialog
        title="Payment"
        :visible.sync="fiatPaymentDialogVisible"
        width="40%"
        center>
        <div class="dialog-content-container">
          <pay-from-fiat ref="payFromFiat" :finalForm="buyForm"></pay-from-fiat>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelPayment" :disabled="canNotCancel">Cancel</el-button>
          <el-button type="primary" @click="confirmPayment">Confirm Payment</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="Sell"
        :visible.sync="currencySellDialogVisible"
        width="40%"
        @close="close"
        center>
      <div class="dialog-content-container">
        <pay-from-currency ref="payFromCurrency" :finalForm="sellForm"></pay-from-currency>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSell" :disabled="canNotCancel">Cancel</el-button>
          <el-button type="primary" @click="confirmSell">Confirm</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

import PayFromFiat from "@/components/payFromFiat";
import {p2pPurchaseCurrency, p2pSellCurrency, purchaseCurrency, sellCurrency} from "@/api/simpleTrade";
import PayFromCurrency from "@/components/payFromcurrency";

export default {
  name: "simple-trade",
  components: {PayFromCurrency, PayFromFiat},
  data() {
    return {
      activateName: 'express',
      canNotCancel: false
    };
  },
  watch: {
      $route: {
        handler: function(route) {
          this.activateName = route.meta.activateName.toLowerCase() //fix bug： 切换导航菜单时activateName不变，会导致样式无法更新，只有三层路由会有问题
        },
        immediate: true
      },
  },
  computed: {
    fiatPaymentDialogVisible: {
      get() {
        return this.$store.state.trade.fiatPaymentDialogVisible
      },
      set(status) {
        this.$store.state.trade.fiatPaymentDialogVisible = status
      }
    },
    currencySellDialogVisible: {
      get() {
        return this.$store.state.trade.currencySellDialogVisible
      },
      set(status) {
        this.$store.state.trade.currencySellDialogVisible = status
      }
    },
    buyForm() {
      return this.$store.state.trade.buyForm
    },
    sellForm() {
      return this.$store.state.trade.sellForm
    },
    simpleTrade() {
      return this.$router.options.routes.filter(item => {
        return item.path === '/simpleTrade'
      })[0].children[0].children
    },
    // fix bug2: 同一个问题，解决方式不同
    tabValue: {
      get() {
        return this.$route.name.toLowerCase()
      },
      set(value) {
        this.$router.push(value)
      }
    }
  },
  methods: {
    async confirmPayment() {
      if ( this.$refs.payFromFiat.isChooseCard ) {
        if( !this.$refs.payFromFiat.isSuccess ){
          this.$refs.payFromFiat.loading = true
          let that = this
          let buy = function() {
            let buyData
            if(that.$store.getters.buyType === 'express') {
              buyData = {
                amount: that.buyForm.currencyAmount,
                currencySymbol: that.buyForm.currencyType,
                price: that.buyForm.fiatAmount,
                fiatType: that.buyForm.fiatType
              }
              return purchaseCurrency(buyData)
            }
            if(that.$store.getters.buyType === 'p2p') {
              buyData = {
                sellerId: that.$store.getters.userid,
                amount: that.buyForm.currencyAmount,
                currencySymbol: that.buyForm.currencyType,
                price: that.buyForm.fiatAmount
              }
              return p2pPurchaseCurrency(buyData)
            }
          }
          await buy().then(()=>{
            setTimeout(()=>{
              this.$refs.payFromFiat.loading = false
              this.$refs.payFromFiat.isSuccess = true
              this.canNotCancel = true
            }, 800)
          }).catch(()=>{
            this.$refs.payFromFiat.loading = false
          })
        } else {
          this.$store.state.trade.fiatPaymentDialogVisible = false
          this.$refs.payFromFiat.isSuccess = false
          this.canNotCancel = false
        }
      } else {
        this.$message.warning('Please choose your card!')
      }
    },
    async confirmSell() {
      if( !this.$refs.payFromCurrency.isSuccess ){
        this.$refs.payFromCurrency.loading = true
        let that = this
        let sell = function() {
          let sellData
          if(that.$store.getters.sellType === 'express') {
            sellData = {
              amount: that.sellForm.currencyAmount,
              currencySymbol: that.sellForm.currencyType,
              price: that.sellForm.fiatAmount,
              fiatType: that.sellForm.fiatType
            }
            return sellCurrency(sellData)
          }
          if(that.$store.getters.sellType === 'p2p') {
            sellData = {
              sellerId: that.$store.getters.userid,
              amount: that.sellForm.currencyAmount,
              currencySymbol: that.sellForm.currencyType,
              price: that.sellForm.fiatAmount
            }
            return p2pSellCurrency(sellData)
          }
        }
        await sell().then(()=>{
          this.$refs.payFromCurrency.getBalance()
          setTimeout(()=>{
            this.$refs.payFromCurrency.loading = false
            this.$refs.payFromCurrency.isSuccess = true
            this.canNotCancel = true
          }, 800)
        }).catch(()=>{
          this.$refs.payFromCurrency.loading = false
        })
      } else {
        this.$store.state.trade.currencySellDialogVisible = false
        this.$refs.payFromCurrency.isSuccess = false
        this.canNotCancel = false
      }
    },
    close() {
      this.$store.state.trade.currencySellDialogVisible = false
      this.$refs.payFromCurrency.isSuccess = false
      this.canNotCancel = false
    },
    cancelPayment() {
      this.fiatPaymentDialogVisible = false
      this.$refs.payFromFiat.isChooseCard = false
    },
    cancelSell() {
      this.currencySellDialogVisible = false
    },
    handClick(key) {
      console.log(key)
      this.$router.push('/simpleTrade/trade/' + key)
    }
  }
}
</script>

<style scoped>
.trade-options-container {
  height: 60px;
}
.trade-area {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 60px;
}
.el-menu-demo {
  padding: 0 10%;
}
.dialog-content-container {
  width: 100%;
  height: 40vh;
}

/deep/.el-menu-item {
  font-size: 17px;
}
</style>
