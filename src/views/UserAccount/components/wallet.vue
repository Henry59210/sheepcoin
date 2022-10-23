<template>
 <div>
   <div class="assets-valuation">
     <div class="title">Your assets valuation:</div>
     <div style="font-size: 20px">{{ '≈ ' + asset }}</div>
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
             prop="currencySymbol"
             label="Name"
             width="180">
         </el-table-column>
         <el-table-column
             prop="amount"
             label="Amount"
             sortable
             width="180">
         </el-table-column>
         <el-table-column
             prop="price"
             label="Price"
             sortable
             width="180">
         </el-table-column>
         <el-table-column
               prop="change"
               label="24H change"
               sortable
               width="180">
         </el-table-column>
         <el-table-column
             fixed="right"
             label="top-up"
             width="100">
           <template slot-scope="scope">
             <el-button @click="handleTopUp(scope.row)" type="text" size="small">top-up</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
   </div>
   <el-dialog
       title="Top-Up"
       :visible.sync="topUpDialogVisible"
       width="30%"
       center>
     <div>
       <el-select v-model="selectedCoin" placeholder="Select coin">
         <el-option
             v-for="item in allCurrency"
             :key="item.value"
             :label="item.label"
             :value="item.value"
             :disabled="item.disabled">
         </el-option>
       </el-select>
       <el-select v-model="selectedCoin" placeholder="Network">
         <el-option
             v-for="item in allPlatform"
             :key="item"
             :label="item"
             :value="item">
         </el-option>
       </el-select>
     </div>
     <span slot="footer" class="dialog-footer">
    <el-button @click="topUpDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="topUpDialogVisible = false">确 定</el-button>
  </span>
   </el-dialog>
 </div>
</template>

<script>

import {getWalletList} from "@/api/account";

export default {
  name: "wallet",
  data() {
    return {
      topUpDialogVisible: false,
      asset: 0.00,
      walletCurrencyStatus: [],//拼接前
      userWalletList: [],//拼接后
      selectedCoin: '',
      amount: '',
      allCurrency: [],
      allPlatform: ['BTC','ETH','BNB']
    }
  },
  mounted() {
    this.getWalletList()
  },
  beforeDestroy(){
    this.$socketApi.closeWebSocket();
  },
  methods: {
    handleTopUp() {

    },
    jointWalletList(data) {
      let currentPrice = data.currentPrice
      let priceChange24h = data.priceChange24h
      let symbol = data.symbol
      this.userWalletList = this.walletCurrencyStatus.map(item=>{
        if(item.currencySymbol === symbol) {
          item.price = currentPrice
          item.change = priceChange24h
        }
        this.asset += item.currentPrice * item.amount || 0
      })
      console.log(this.userWalletList)
    },
    async getWalletList() {
      let res = await getWalletList('10/1 ')
      this.walletCurrencyStatus = res.data.records
      this.walletCurrencyStatus.forEach(item=>{
        this.$socketApi.initWebSocket( '/ws/sid/' + item, this.jointWalletList);
      })
    }
  }
}
</script>

<style scoped>
.assets-valuation {
  height: 100px;
}
.all-currency {
  position: absolute;
  bottom: 0;
  top: 100px;
  width: 100%;
}
.title {
  font-size: 25px;
  line-height: 25px;
  font-family: BinancePlex,Arial,sans-serif;
  padding-bottom: 20px;
}
.table-container {
  width: 100%;
}
</style>
