<template>
  <div class="buy-operate-container">
    <el-form :inline="true" :model="buyForm" ref="buyForm" class="demo-form-inline">
      <div class="enter-amount">
        <div class="text-hint">I want to pay</div>
        <el-form-item class="input-container" prop="fiat">
          <el-input v-model.number="buyForm.fiatAmount" placeholder="Enter Amount" :disabled="buyForm.fiatType===''" @input="inputFiat"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="buyForm.fiatType" filterable placeholder="Fiat" @change="selectFiat">
            <el-option
                v-for="item in allFiat"
                :key="item.fiatSymbol"
                :label="item.fiatSymbol"
                :value="item.fiatSymbol">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="enter-amount">
        <div class="text-hint">I will receive</div>
        <el-form-item class="input-container" prop="currency">
          <el-input v-model.number="buyForm.currencyAmount" placeholder="Enter Amount" :disabled="buyForm.currencyType===''" @input="inputCurrency"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="buyForm.currencyType" filterable placeholder="Currency" @change="selectCurrency">
            <el-option
                v-for="item in allCurrency"
                :key="item.currencySymbol"
                :label="item.currencyName"
                :value="item.currencySymbol">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div style="padding: 10%">
      <el-button type="primary" :disabled="buyForm.currencyAmount===''&&buyForm.currencyAmount===''" style="width: 100%" @click="submitForm('buyForm')">buy</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "buy",
  data() {
    return {
      buyForm: {
        fiatAmount: '',
        fiatType: '',
        currencyType: '',
        currencyAmount: '',
      },
      fiatRate: 0,
      curCurrencyStatus: {
        curCurrencyPrice: '',
        curCurrencyType: ''
      }
    }
  },
  mounted(){
    // 建立socket连接， 并设置socket信息返回接受函数
    this.$socketApi.initWebSocket( '/ws/sid/btc', this.setCurrentCurrency);
  },
  beforeDestroy(){
    this.$socketApi.closeWebSocket();
  },
  watch: {
    'curCurrencyStatus.curCurrencyPrice': {
      handler(val, oldval) {
        if(val != oldval  && this.buyForm.fiatAmount) {
          this.inputFiat()
        }
      },
      deep: true
    }
  },
  computed: {
    allCurrency() {
      return this.$store.getters.allCurrency
    },
    allFiat() {
      return this.$store.getters.allFiat
    }
  },
  methods: {
    setCurrentCurrency(data) {
      this.curCurrencyStatus.curCurrencyPrice = data.currentPrice
      this.curCurrencyStatus.curCurrencyType = data.symbol
    },
    websocketSend(data) {
      this.$socketApi.sendSock(data);
    },
    inputFiat() {
      this.buyForm.currencyAmount = (this.buyForm.fiatAmount/this.curCurrencyStatus.curCurrencyPrice/this.fiatRate).toFixed(4) || 0
    },
    selectFiat() {
      this.fiatRate = this.allFiat.filter(item=>{
        return item.fiatSymbol === this.buyForm.fiatType
      })[0].usdexRate
    },
    inputCurrency() {
      this.buyForm.fiatAmount = (this.buyForm.currencyAmount * this.curCurrencyStatus.curCurrencyPrice * this.fiatRate).toFixed(2) || 0
    },
    async selectCurrency() {
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.9)'
      });
      console.log(this.buyForm)
      this.websocketSend(this.buyForm.currencyType)
      let waitStatus = setInterval(()=>{
        console.log(this.buyForm.currencyType +'---'+ this.curCurrencyStatus.curCurrencyType)
        if(this.buyForm.currencyType === this.curCurrencyStatus.curCurrencyType) {
          loading.close()
          clearInterval(waitStatus)
        }
      }, 500)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('trade/SET_BUYTYPE', 'express')
          this.$store.commit('trade/SET_BUYFORM', this.buyForm)
          this.$store.commit('trade/SET_FIATDIALOG', true)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.buy-operate-container {
  text-align: center;
}
.enter-amount {
  text-align: left;
  padding:5% 10%;
  height: 30%;
}
.text-hint {
  font-size: 12px;
  margin: 2% 0;
}
.input-container {
  width: 70%;
  margin: 0;
}
.select-container {
  width: 30%;
  margin: 0;
}

/deep/.el-form-item__content {
  width: 100%;
}
</style>
