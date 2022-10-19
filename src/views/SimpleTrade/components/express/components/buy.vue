<template>
  <div class="buy-operate-container">
    <el-form :inline="true" :model="buyForm" ref="buyForm" class="demo-form-inline">
      <div class="enter-amount">
        <div class="text-hint">I want to pay</div>
        <el-form-item :rules="rule" class="input-container" >
          <el-input  v-model="buyForm.fiatAmount" placeholder="Enter Amount" :disabled="buyForm.fiatType===''" @input="inputFiat"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="buyForm.fiatType" filterable placeholder="Fiat" @change="selectFiat">
            <el-option
                v-for="item in fiatInfo"
                :key="item.fiatName"
                :label="item.fiatName"
                :value="item.fiatName">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="enter-amount">
        <div class="text-hint">I will receive</div>
        <el-form-item :rules="rule" class="input-container">
          <el-input v-model="buyForm.currencyAmount" placeholder="Enter Amount" :disabled="buyForm.currencyType===''"  @input="inputCurrency"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="buyForm.currencyType" filterable placeholder="Currency" @change="selectCurrency">
            <el-option
                v-for="item in currencyInfo"
                :key="item.currencySymbol"
                :label="item.currencySymbol"
                :value="item.currencySymbol">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div style="padding: 10%">
      <el-button type="primary" style="width: 100%" @click="submitForm(buyForm)">buy</el-button>
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
      fiatRate: 7,
      curCurrencyStatus: {
        curCurrencyPrice: '',
        curCurrencyType: ''
      },

      rule: [
        { required: true, message: 'Amount cannot less 0!'},
        { type: 'number', message: 'Fiat must be number!'}
      ],

      currencyInfo: [{
        id: 1,
        currencySymbol: 'btc',
        currencyImg: 'link',
        currentPrice: 100
      }, {
        id: 2,
        currencySymbol: 'ift',
        currencyImg: 'link',
        currentPrice: 1000
      }, {
        id: 3,
        currencySymbol: 'BOC',
        currencyImg: 'link',
        currentPrice: 1000
      }, {
        id: 4,
        currencySymbol: 'BAN',
        currencyImg: 'link',
        currentPrice: 100
      }, {
        id: 5,
        currencySymbol: 'CTT',
        currencyImg: 'link',
        currentPrice: 100
      },
      ],
      fiatInfo: [
          {
        fiatName: 'USD',
        fiatImg: 'link',
        fiatRate: 1
      },{
        fiatName: 'RMB',
        fiatImg: 'link',
        fiatRate: 7.1
      },{
        fiatName: 'SGD',
        fiatImg: 'link',
        fiatRate: 1.2
      },{
        fiatName: 'YEN',
        fiatImg: 'link',
        fiatRate: 20
      }],
      allCurrency: [],
      allFiat: []
    }
  },
  mounted(){
    this.allCurrency = this.$store.getters.allCurrency
    this.allFiat = this.$store.getters.allFiat
    // 建立socket连接， 并设置socket信息返回接受函数
    this.$socketApi.initWebSocket( 'ws://10.144.211.163:8080/ws/sid/btc', this.setCurrentCurrency);
  },
  beforeDestroy(){
    this.$socketApi.closeWebSocket();
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
      this.buyForm.currencyAmount = this.buyForm.fiatAmount/this.curCurrencyStatus.curCurrencyPrice/this.fiatRate || 0
    },
    selectFiat() {
      this.fiatRate = this.fiatInfo.filter(item=>{
        return item.fiatName === this.buyForm.fiatType
      })[0].fiatRate
    },
    inputCurrency() {
      this.buyForm.fiatAmount = this.buyForm.currencyAmount * this.curCurrencyStatus.curCurrencyPrice * this.fiatRate || 0
    },
    async selectCurrency() {
      let loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.9)'
      });
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
          console.log(valid)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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
