<template>
 <div>
   <div class="assets-valuation">
     <div class="title" >Your assets valuation:</div>
     <div style="font-size: 20px;">{{ '≈ ' + asset.toFixed(2) + ' $'}}</div>
   </div>
   <div class="all-currency">
     <div class="title">
       Market
     </div>
     <div class="table-container">
       <el-table
           :data="userWalletList"
           style="width: 100%"
       >
         <el-table-column
             label="Name">
           <template slot-scope="scope">
             <span class="table-font" style="font-size: 17px; font-weight: bold; color: black">{{ scope.row.currencySymbol.toUpperCase() }}</span>
             <span style="margin-left: 10px;">{{ scope.row.name }}</span>
           </template>
         </el-table-column>
         <el-table-column
             prop="amount"
             label="Amount"
             sortable>
         </el-table-column>
         <el-table-column
             prop="price"
             label="Price($)"
             sortable>
         </el-table-column>
         <el-table-column
               label="24H change"
               sortable>
           <template slot-scope="scope">
             <span class="table-font" :class="{'increase': scope.row.change>0, 'decrease': scope.row.change<0}">{{ Number(scope.row.change).toFixed(3) + ' %' }}</span>
           </template>
         </el-table-column>
         <el-table-column
             label="24h High / 24h Low($)"
             sortable>
           <template slot-scope="scope">
             <span class="table-font">{{ scope.row.high24h + ' / ' + scope.row.low24h }}</span>
           </template>
         </el-table-column>
         <el-table-column
             fixed="right"
             label="top-up">
           <template slot-scope="scope">
             <el-button @click="handleTopUp(scope.row)" type="text" size="middle">top-up</el-button>
           </template>
         </el-table-column>
       </el-table>
       <el-pagination
           layout="prev, pager, next"
           :total="total"
           :current-page.sync="currentPage"
           :hide-on-single-page="true"
           @current-change="handleCurrentChange"
           :page-size="10">
       </el-pagination>
     </div>
   </div>
   <el-dialog
       title="Top-Up"
       :visible.sync="topUpDialogVisible"
       width="30%"
       center>
     <div class="top-up-panel">
       <div class="coin-panel">
         <span>Select coin: </span>
         <el-select v-model="selectedCoin" placeholder="Coin" @change="getAddress" style="width: 100%; padding-top: 10px">
           <el-option
               v-for="item in allCurrency"
               :key="item.id"
               :label="item.currencyName"
               :value="item.currencyName">
           </el-option>
         </el-select>
       </div>
       <div class="platform-panel">
         <span>Deposit to: </span>
         <el-select v-model="selectedPlatform" placeholder="Network" @change="getAddress" style="width: 100%; padding-top: 10px">
           <el-option
               v-for="item in allPlatform"
               :key="item"
               :label="item"
               :value="item">
           </el-option>
         </el-select>
       </div>
       <div class="key-area" v-loading="loading">
         <el-button v-if="getAddressBtnShow" :disabled="selectedPlatform===''||selectedCoin===''" class="get-address-btn" type="warning" @click="getAddress">Get Address</el-button>
         <div v-if="!getAddressBtnShow">
           {{ this.$store.getters.userid }}
           <span style="padding-left: 10px">
             <el-popover
                 placement="top-start"
                 title="hint"
                 width="310"
                 trigger="hover"
                 content="This is an address which is used to transfer the currency from other platform to your SheepCoin account">
               <i class="el-icon-question" slot="reference"></i>
             </el-popover>
           </span>
         </div>
       </div>
     </div>
     <span slot="footer" class="dialog-footer">
    <el-button @click="topUpDialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="topUpDialogVisible = false">Confirm</el-button>
  </span>
   </el-dialog>
 </div>
</template>

<script>

import {getWalletList} from "@/api/account";
import {deepClone} from "@/utils/usefulTools";
import {getAllCurrency} from "@/api/simpleTrade";

export default {
  name: "wallet",
  data() {
    return {
      topUpDialogVisible: false,
      getAddressBtnShow: true,
      loading: false,
      asset: 0.00,
      walletCurrencyStatus: [],//拼接前
      userWalletList: [],//拼接后
      selectedCoin: '',
      selectedPlatform: '',
      currentPage: 1,
      amount: '',
      total: 0,
      allCurrency: [],
      allPlatform: ['BTC','ETH','BNB']
    }
  },
  mounted() {
    this.currentPage = Number(localStorage.getItem('currentPage')) || 1
    this.getWalletList(this.currentPage)
  },
  beforeUpdate() {
    localStorage.setItem('currentPage', this.currentPage)
  },
  beforeDestroy(){
    if(this.walletCurrencyStatus.length !== 0) this.$socketApi.closeWebSocket();
    localStorage.setItem('currentPage', 1 )
  },
  methods: {
    getAddress() {
      if(this.selectedPlatform!=='' && this.selectedCoin!=='') {
        this.getAddressBtnShow = true
        this.loading = true
        setTimeout(()=>{
          this.loading = false
          this.getAddressBtnShow = false
        }, 1000)
      }
    },
    async handleTopUp() {
      this.selectedCoin = ''
      this.selectedPlatform = ''
      this.topUpDialogVisible = true
      let res = await getAllCurrency()
      this.allCurrency = res.data
    },
    jointWalletList(data) {
      this.asset = 0
      let currentPrice = data.currentPrice
      let priceChangePercentage24h = data.priceChangePercentage24h
      let symbol = data.symbol
      let high24h = data.high24h
      let low24h = data.low24h
      let name = data.name
      let arr = deepClone(this.walletCurrencyStatus)
      for (let i=0; i<arr.length; i++) {
        if(arr[i].currencySymbol === symbol) {
          arr[i].price = currentPrice
          arr[i].change = priceChangePercentage24h
          arr[i].high24h = high24h
          arr[i].low24h = low24h
          arr[i].name = name
        }
        this.asset += arr[i].price * arr[i].amount || 0
      }
      this.userWalletList = arr
    },
    async getWalletList(val) {
      let page = val || 1
      let res = await getWalletList('10/'+page)
      this.walletCurrencyStatus = res.data.records
      this.total = res.data.total
      this.walletCurrencyStatus.forEach(item=>{
        this.$socketApi.initWebSocket( '/ws/sid/' + item.currencySymbol, this.jointWalletList);
      })
    },
    handleCurrentChange(val) {
      this.getWalletList(val)
    }
  }
}
</script>

<style scoped>
.assets-valuation {
  height: 120px;
  padding: 10px 5%;
  background: #efefef;
  box-sizing: border-box;
}
.all-currency {
  position: absolute;
  padding: 0 5%;
  box-sizing: border-box;
  bottom: 0;
  top: 120px;
  width: 100%;
}
.title {
  font-size: 25px;
  line-height: 25px;
  font-family: BinancePlex,Arial,sans-serif;
  margin-top: 20px;
  margin-bottom: 10px;
}
.increase {
  color: red;
}
.decrease {
  color: green;
}
.table-font{
  font-size: 17px; font-weight: bold
}
.top-up-panel {
  height: 35vh;
}
.coin-panel {
  padding-bottom: 30px;
}
.platform-panel {
  padding-bottom: 30px;
}
.key-area {
  width: 100%;
  height: 40%;
  background: #f1f1f1;
  border: 1px #a9a9a9 solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-icon-question {
  cursor: pointer;

}

</style>
