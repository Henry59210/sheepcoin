<template>
  <div class="p2p-container">
    <div class="operate-container">
      <div class="filter">
        <span style="font-size: 14px">Currency: </span>
        <el-select v-model="wantedCurrencyType" placeholder="Currency Type" @change="filterList" style="width: 40%">
          <el-option
              v-for="item in allCurrencyAfter"
              :key="item.currencySymbol"
              :label="item.currencyName"
              :value="item.currencySymbol">
          </el-option>
        </el-select>
      </div>
      <div class="btn-area">
        <el-button icon="el-icon-refresh" @click="refresh">Refresh</el-button>
        <el-button type="success" style="width: 100px" @click="sellDialogVision=true">Sell</el-button>
      </div>
    </div>
    <div class="order-table-container">
      <el-table
          :data="itemList"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          v-loading="loading">
        <el-table-column
            label="Seller">
          <template slot-scope="scope">
            <span>{{ scope.row.sellerUsername ? scope.row.sellerUsername : 'wrong' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="Currency Type">
          <template slot-scope="scope">
            <span>{{ scope.row.currencySymbol ? scope.row.currencySymbol.toUpperCase() : 'wrong' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="amount"
            label="Amount"
            sortable>
        </el-table-column>
        <el-table-column
            prop="price"
            label="Price ($)"
            sortable>
        </el-table-column>
        <el-table-column
            label="trade">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="buy(scope.row)" :disabled="scope.row.sellerId===userId">Buy</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
            :total="total">
        </el-pagination>
      </div>
    </div>
<!----------sell----------->
    <el-dialog
        title="Sell"
        :visible.sync="sellDialogVision"
        width="45%"
        @close="refresh"
        center>
      <div class="sell-container">
        <div class="sell-operate-container">
          <el-form :inline="true" :model="sellForm" :rules="rule" ref="sellForm" class="demo-form-inline">
            <div class="enter-amount">
              <div class="text-hint">I will sell</div>
              <el-form-item class="input-container" prop="currencyAmount">
                <el-input v-model="sellForm.currencyAmount" placeholder="Enter Amount" :disabled="sellForm.currencyType===''" ></el-input>
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
                <el-input v-model="sellForm.fiatAmount" placeholder="Enter Amount" :disabled="sellForm.currencyType===''"></el-input>
              </el-form-item>
              <el-form-item class="select-container">
                <el-select v-model="sellForm.fiatType" :disabled="true" filterable placeholder="Fiat"></el-select>
              </el-form-item>
            </div>
          </el-form>
          <div style="padding: 10%">
            <el-button type="primary" style="width: 100%" @click="submitForm('sellForm')">sell</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deepClone} from "@/utils/usefulTools";
import {getCurrencyAmount, getOrderList} from "@/api/simpleTrade";

export default {
  name: "P2P",
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
      loading: false,
      sellDialogVision: false,
      itemList: [],
      itemListOrigin: [],
      wantedCurrencyType: 'all',
      currentPage: 1,
      total: 0,
      //----sellform----
      sellForm: {
        fiatAmount: '',
        fiatType: 'USD',
        currencyType: '',
        currencyAmount: '',
      },
      selectedCurrencyAmount: 0,
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
          { required: true, message: 'Don\'t forget enter money!', trigger: 'blur'}
        ],
      },
      //----buyForm-----
      buyForm: {
        fiatAmount: '',
        fiatType: 'USD',
        currencyType: '',
        currencyAmount: '',
      },
    }
  },
  watch: {
    fiatPaymentDialogVisible: {
      handler(val){
        if(!val) {
          this.getItemList(this.currentPage)
        }
      }
    }
  },
  computed: {
    fiatPaymentDialogVisible() {
      return this.$store.state.trade.fiatPaymentDialogVisible
    },
    userId() {
      return this.$store.getters.userid
    },
    allCurrency() {
      return this.$store.getters.allCurrency
    },
    allCurrencyAfter() {
      let arr = deepClone(this.$store.getters.allCurrency)
      arr.unshift({currencySymbol: 'all', currencyName: 'all'})
      return arr
    }
  },
  created() {
    this.$store.dispatch('trade/getAllCurrency')
    this.currentPage = Number(localStorage.getItem('currentPage')) || 1
    this.getItemList(this.currentPage)
  },
  mounted(){
    // 建立socket连接， 并设置socket信息返回接受函数
    this.$socketApi.initWebSocket( '/ws/sid/btc', this.setCurrentCurrency);
  },
  beforeUpdate() {
    localStorage.setItem('currentPage', this.currentPage)
  },
  beforeDestroy() {
    this.$socketApi.closeWebSocket();
    localStorage.setItem('currentPage', 1 )
  },
  methods: {
    //------sellForm---------
    setCurrentCurrency(data) {
      this.curCurrencyStatus.curCurrencyPrice = data.currentPrice
      this.curCurrencyStatus.curCurrencyType = data.symbol
    },
    websocketSend(data) {
      this.$socketApi.sendSock(data);
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
          this.$store.commit('trade/SET_SELLTYPE', 'p2p')
          this.$store.commit('trade/SET_SELLFORM', this.sellForm)
          this.$store.commit('trade/SET_CURRENTCYDIALOG', true)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //------buyForm-----
    buy(data) {
      this.buyForm.currencyAmount = data.amount
      this.buyForm.currencyType = data.currencySymbol
      this.buyForm.fiatAmount = data.price
      this.$store.commit('trade/SET_BUYTYPE', 'p2p')
      this.$store.commit('trade/SET_BUYFORM', this.buyForm)
      this.$store.commit('trade/SET_FIATDIALOG', true)
    },
    //------common------
    handleCurrentChange(val) {
      this.getItemList(val)
      this.currentPage = val
    },
    async getItemList(pageNum) {
      let res = await getOrderList(pageNum)
      this.itemListOrigin = res.data.records
      this.total = res.data.total
      this.filterList(this.wantedCurrencyType)
    },
    async refresh() {
      this.loading = true
      await this.getItemList(this.currentPage)
      this.loading = false
    },
    filterList(val) {
      if ( val === '' || val === 'all') {
        this.itemList = this.itemListOrigin
      } else {
        let arr = this.itemListOrigin.filter(item=>{
          return item.currencySymbol === val
        })
        this.itemList = arr
      }
    },
  }
}
</script>

<style scoped>
.p2p-container {
  width: 100%;
  height: 100%;
}
.operate-container {
  height: 10%;
  background: #eaeaea;
}
.filter, .btn-area {
  display: inline-block;
  height: 100%;
  width: 50%;
  vertical-align: top;
  text-align: center;
  box-sizing: border-box;
  padding-top: 15px;
}
.order-table-container {
  height: 90%;
  box-sizing: border-box;
  padding: 0 10%;
  overflow: scroll;
}
.page-container {
  height: 10%;
  box-sizing: border-box;
  padding-top: 20px;
  text-align: right;
}
.sell-container {
  height: 40vh;
}
/*-----------*/
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


