<template>
  <div class="buy-operate-container">
    <el-form :inline="true" :model="sellForm" ref="sellForm" class="demo-form-inline">
      <div class="enter-amount">
        <div class="text-hint">I will sell</div>
        <el-form-item class="input-container" :rules="currencyRule">
          <el-input v-model="sellForm.currencyAmount" placeholder="Enter Amount" :disabled="sellForm.currencyType===''"  @input="inputCurrency"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="sellForm.currencyType" filterable placeholder="Currency" @change="selectCurrency">
            <el-option
                v-for="item in currencyInfo"
                :key="item.currencySymbol"
                :label="item.currencySymbol"
                :value="item.currencySymbol">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="enter-amount">
        <div class="text-hint">I want to pay</div>
        <el-form-item :rules="fiatRule" class="input-container" >
          <el-input  v-model="sellForm.fiatAmount" placeholder="Enter Amount" :disabled="sellForm.fiatType===''" @input="inputFiat"></el-input>
        </el-form-item>
        <el-form-item class="select-container">
          <el-select v-model="sellForm.fiatType" filterable placeholder="Fiat" @change="selectFiat">
            <el-option
                v-for="item in fiatInfo"
                :key="item.fiatName"
                :label="item.fiatName"
                :value="item.fiatName">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <div style="padding: 10%">
      <el-button type="primary" style="width: 100%" @click="submitForm('sellForm')">buy</el-button>
    </div>
    <el-button @click="test">aaa</el-button>
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
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
    };
    return {
      paymentDialogVisible: false,
      accountInfo: {},
      sellForm: {
        fiatAmount: '',
        fiatType: '',
        currencyType: '',
        currencyAmount: '',
      },
      fiatRate: 7,
      curCurrencyStatus: {
        curCurrencyPrice: '10',
        curCurrencyType: 'btc'
      },
      currencyRule: [
        { required: true, message: 'Amount cannot less 0!'},
        { type: 'number', message: 'Currency must be number!'},
        { validator: checkCurrencyAmount, trigger: 'blur'}
      ],
      fiatRule: [
        { required: true, message: 'Amount cannot less 0!'},
        { type: 'number', message: 'Currency must be number!'},
      ],
      currencyInfo: [
        {
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
    this.$socketApi.initWebSocket( 'ws://43.156.54.223:30081/sheepservice/ws/sid/btc', this.setCurrentCurrency);
  },
  beforeDestroy(){
    this.$socketApi.closeWebSocket();
  },
  methods: {
    setCurrentCurrency(data) {
      this.curCurrencyStatus.curCurrencyPrice = 10 || data.currentPrice
      this.curCurrencyStatus.curCurrencyType = 'btc' || data.symbol
    },
    websocketSend(data) {
      this.$socketApi.sendSock(data);
    },
    inputFiat() {
      this.sellForm.currencyAmount = this.sellForm.fiatAmount/this.curCurrencyStatus.curCurrencyPrice/this.fiatRate || 0
    },
    selectFiat() {
      this.fiatRate = this.fiatInfo.filter(item=>{
        return item.fiatName === this.sellForm.fiatType
      })[0].fiatRate
    },
    inputCurrency() {
      this.sellForm.fiatAmount = this.sellForm.currencyAmount * this.curCurrencyStatus.curCurrencyPrice * this.fiatRate || 0
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
        console.log(this.sellForm.currencyType +'---'+ this.curCurrencyStatus.curCurrencyType)
        if(this.sellForm.currencyType === this.curCurrencyStatus.curCurrencyType) {
          loading.close()
          clearInterval(waitStatus)
        }
      }, 500)
      let res  = await getCurrencyAmount()
      this.accountInfo = res
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('trade/SET_BUYFORM', this.sellForm)
          this.paymentDialogVisible = true
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
