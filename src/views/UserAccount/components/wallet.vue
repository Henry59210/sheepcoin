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
           :data="currencyData"
           style="width: 100%"
           :default-sort = "{prop: 'date', order: 'descending'}"
       >
         <el-table-column
             prop="name"
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
       <el-select v-model="value" placeholder="Select coin">
         <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value"
             :disabled="item.disabled">
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

export default {
  name: "wallet",
  data() {
    return {
      topUpDialogVisible: false,
      asset: 0.00,
      currencyData: []
    }
  },
  methods: {
    handleTopUp() {

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
