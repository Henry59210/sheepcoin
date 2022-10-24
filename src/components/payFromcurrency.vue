<template>
  <div style="height: 100%; width: 100%">
    <div v-if="!isSuccess"  class="currency-sell-container" v-loading="loading">
      <div class="amount-display-container">
        {{ finalForm.currencyType.toUpperCase() + '  ' + finalForm.currencyAmount }}
      </div>
      <div>{{ 'you will receive ' + finalForm.fiatAmount + ' ' + finalForm.fiatType}}</div>
      <div class="balance-display-container">
        <span>{{ 'Your ' + finalForm.currencyType.toUpperCase() + ' balance: '}}</span>
        <div class="balance-panel">
          {{ balance }}
        </div>
      </div>
    </div>
    <div v-if="isSuccess" class="currency-sell-container">
      <el-result icon="success" title="Sell Success!" subTitle="enjoy your investment">
      </el-result>
    </div>
  </div>
</template>

<script>
import {getCurrencyAmount} from "@/api/simpleTrade";

export default {
  name: "payFromCurrency",
  props: {
    finalForm: {
      type: Object,
      default: ()=> {
        return {}
      }
    }
  },
  data() {
    return {
      isSuccess: false,
      paymentDialogVisible: false,
      loading: false,
      balance: 0,
    }
  },
  created() {
    this.getBalance()
  },
  methods: {
    async getBalance() {
      let res = await getCurrencyAmount(this.finalForm.currencyType)
      this.balance = res.data.amount.toFixed(4)
    }
  }
}
</script>

<style scoped>
.currency-sell-container {
  width: 100%;
  height: 100%;
}
.amount-display-container {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  padding: 10%;
  height: 30%;
  box-sizing: border-box;
}
.balance-display-container {
  height: 70%;
  overflow: scroll;
  margin-top: 30px;
}
.balance-panel {
  background: #f3f3f3;
  border-radius: 10px;
  border: #bbbbbb 1px solid;
  height: 30%;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
