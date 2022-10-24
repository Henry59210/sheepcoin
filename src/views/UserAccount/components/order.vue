<template>
  <div class="order-container">
    <div class="operate-container">
      <div class="filter">
        <span style="font-size: 14px">Order Type: </span>
        <el-select v-model="wantedOrderType" placeholder="Order Type" @change="changeOrder" style="width: 40%">
          <el-option
              v-for="item in orderTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="btn-area">
        <el-button icon="el-icon-refresh" @click="changeOrder">Refresh</el-button>
      </div>
    </div>
    <div v-if="wantedOrderType==='sell'" class="order-table-container">
      <el-table
          :data="orderData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          v-loading="loading">
        <el-table-column
            prop="buyerUsername"
            label="Buyer">
        </el-table-column>
        <el-table-column
            label="Currency">
          <template slot-scope="scope">
            <span>{{ scope.row.currencyAmount + ' ' + scope.row.currencySymbol }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="Price"
            sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.totalFiatValue + ' ' + scope.row.fiatType }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="Time"
            sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.time.split('T').join('-') }}</span>
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
    <div v-if="wantedOrderType==='buy'" class="order-table-container">
      <el-table
          :data="orderData"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
          v-loading="loading">
        <el-table-column
            prop="sellerUsername"
            label="Seller">
        </el-table-column>
        <el-table-column
            label="Currency">
          <template slot-scope="scope">
            <span>{{ scope.row.currencyAmount + ' ' + scope.row.currencySymbol }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="Price"
            sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.totalFiatValue + ' ' + scope.row.fiatType }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="Time"
            sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.time.split('T').join('-') }}</span>
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
  </div>
</template>

<script>
import {getBuyOrder, getSellOrder} from "@/api/account";

export default {
  name: "user-order",
  data() {
    return{
      orderData: [],
      currentPage: 1,
      total: 0,
      loading: false,
      wantedOrderType: 'sell',
      orderTypes:[
        {
          label: 'Sell Order',
          value: 'sell'
        },
        {
          label: 'Buy Order',
          value: 'buy'
        }
      ]
    }
  },
  created() {
    this.changeOrder()
  },
  computed: {
    firstHeader() {
      let res = ''
      this.wantedOrderType === 'sell' ? res = 'Buyer' : res = 'Seller'
      return res
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.getItemList(val)
      this.currentPage = val
    },
    async getSellOrder() {
      this.loading = true
      let res = await getSellOrder(this.currentPage)
      this.orderData = res.data.records
      this.total = res.data.total
      this.loading = false
    },
    async getBuyOrder() {
      this.loading = true
      let res = await getBuyOrder(this.currentPage)
      this.orderData = res.data.records
      this.total = res.data.total
      this.loading = false
    },
    changeOrder() {
      if(this.wantedOrderType === 'sell'){
        this.getSellOrder()
      } else this.getBuyOrder()
    },
  }
}
</script>

<style scoped>
.order-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10%;
  overflow: scroll;
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
</style>
