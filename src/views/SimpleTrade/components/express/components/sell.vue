<template>
  <div class="sell-operate-container">
    <el-form :inline="true" :model="sellForm" :rules="rule" ref="sellForm" class="demo-form-inline">
      <div class="enter-amount">
        <div class="text-hint">I will sell</div>
        <el-form-item class="input-container" prop="currencyAmount">
          <el-input v-model="sellForm.currencyAmount" placeholder="Enter Amount" :disabled="sellForm.currencyType===''"  @input="inputCurrency"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="sellForm.currencyType" filterable placeholder="Currency" @change="selectCurrency">
            <el-option
                v-for="item in allCurrency"
                :key="item.currencySymbol"
                :label="item.currencyName"
                :value="item.currencySymbol">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="enter-amount">
        <div class="text-hint">you will receive</div>
        <el-form-item class="input-container" prop="fiatRule">
          <el-input  v-model="sellForm.fiatAmount" placeholder="Enter Amount" :disabled="sellForm.fiatType===''" @input="inputFiat"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="sellForm.fiatType" filterable placeholder="Fiat" @change="selectFiat">
            <el-option
                v-for="item in allFiat"
                :key="item.fiatSymbol"
                :label="item.fiatSymbol"
                :value="item.fiatSymbol">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div style="padding: 10%">
      <el-button type="primary" style="width: 100%" @click="submitForm('sellForm')">sell</el-button>
    </div>
  </div>
</template>

<script>

// import PayFromFiat from "@/components/payFromFiat";
import {getCurrencyAmount} from "@/api/simpleTrade";

export default {
  name: "sell",
  // components: {PayFromFiat},
  data() {
    var checkCurrencyAmount = (rule, value, callback) => {
      let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
      if (value > this.selectedCurrencyAmount) {
        callback(new Error('Insufficient balance, please top up your Wallet.'));
      } else if (!reg.test(value)) {
        callback(new Error('Must be number'));
      } else {
        callback();
      }
    };
    return {
      paymentDialogVisible: false,
      sellForm: {
        fiatAmount: '',
        fiatType: '',
        currencyType: '',
        currencyAmount: '',
      },
      aaa: 0,
      fiatRate: 0,
      selectedCurrencyAmount: 10,
      curCurrencyStatus: {
        curCurrencyPrice: '',
        curCurrencyType: ''
      },
      rule: {
        currencyAmount: [
          { validator: checkCurrencyAmount, trigger: 'blur'}
        ],
        fiatRule: [
          { type: 'number', message: 'Currency must be number!'},
        ],
      },
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
        console.log(val)
        if(val !== oldval  && this.sellForm.currencyAmount) {
          this.inputCurrency()
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
      this.sellForm.currencyAmount = (this.sellForm.fiatAmount/this.curCurrencyStatus.curCurrencyPrice/this.fiatRate).toFixed(4) || 0
    },
    selectFiat() {
      this.fiatRate = this.allFiat.filter(item=>{
        return item.fiatSymbol === this.sellForm.fiatType
      })[0].usdexRate
    },
    inputCurrency() {
      this.sellForm.fiatAmount = (this.sellForm.currencyAmount * this.curCurrencyStatus.curCurrencyPrice * this.fiatRate).toFixed(2) || 0
    },
    async selectCurrency() {
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.9)'
      });
      this.websocketSend(this.sellForm.currencyType)
      let waitStatus = setInterval(()=>{
        if(this.sellForm.currencyType === this.curCurrencyStatus.curCurrencyType) {
          loading.close()
          clearInterval(waitStatus)
        }
      }, 500)
      let res  = await getCurrencyAmount(this.sellForm.currencyType)
      this.selectedCurrencyAmount = res.data.amount.toFixed(4)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('trade/SET_SELLFORM', this.sellForm)
          this.$store.commit('trade/SET_CURRENCYDIALOG', true)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    test() {
      this.sellForm = {
        fiatAmount: 20,
        fiatType: 'USD',
        currencyType: 'btc',
        currencyAmount: 10,
      },
          this.$store.commit('trade/SET_BUYFORM', this.sellForm)
      this.$store.commit('trade/SET_FIATDIALOG', true)
    }
  }
}
</script>

<style scoped>
.sell-operate-container {
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
