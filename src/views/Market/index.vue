<template>
  <div>
    <div class="title-container">Markets</div>
    <div class="market-data-container">
      <el-table
          :data="allCurrency"
          style="width: 100%"
          stripe>
        <el-table-column
            label="Name">
          <template slot-scope="scope">
            <span class="table-font" style="font-size: 17px; font-weight: bold; color: black">{{ scope.row.symbol.toUpperCase() }}</span>
            <span style="margin-left: 10px;">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="currentPrice"
            label="Price($)"
            sortable>
        </el-table-column>
        <el-table-column
            label="24H change"
            sortable>
          <template slot-scope="scope">
            <span class="table-font" :class="{'increase': scope.row.priceChangePercentage1hInCurrency>0, 'decrease': scope.row.priceChangePercentage1hInCurrency<0}">{{ Number(scope.row.priceChangePercentage1hInCurrency).toFixed(3) + ' %' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="1H change"
            sortable>
          <template slot-scope="scope">
            <span class="table-font" :class="{'increase': scope.row.priceChangePercentage24h>0, 'decrease': scope.row.priceChangePercentage24h<0}">{{ Number(scope.row.priceChangePercentage24h).toFixed(3) + ' %' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="24h High / 24h Low"
            sortable>
          <template slot-scope="scope">
            <span class="table-font">{{ scope.row.high24h + ' / ' + scope.row.low24h }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="Market Cap"
            sortable>
          <template slot-scope="scope">
            <span class="table-font">{{ '$' + (scope.row.marketCap/1000000).toFixed(3) + ' M' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="top-up">
          <template slot-scope="scope">
            <el-button @click="open(scope.row)" type="text" size="small">Detail</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          :hide-on-single-page="true"
          :total="total"
          @current-change="handleCurrentChange"
          layout="prev, pager, next">
      </el-pagination>
    </div>
    <currency-detail v-if="visible" :visible="visible" :currencyDetail="currencyDetail" @close="closeDialog"></currency-detail>
  </div>
</template>

<script>
import CurrencyDetail from "@/components/currencyDetail";
export default {
  name: "market-trade",
  components: {CurrencyDetail},
  data() {
    return {
      visible: false,
      allCurrency: [],
      currencyDetail: {},
      total: 0
    }
  },
  mounted() {
    this.$socketApi.initWebSocket( '/ws/sid/1', this.initCurrency);
  },
  beforeDestroy(){
    this.$socketApi.closeWebSocket();
  },
  methods: {
    open(data) {
      this.currencyDetail = data
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    },
    handleCurrentChange(val) {
      this.$socketApi.closeWebSocket();
      this.$socketApi.initWebSocket( '/ws/sid/'+val, this.initCurrency);
    },
    initCurrency(data) {
      this.allCurrency = data.records
      this.total = data.total
    }
  },
}
</script>

<style scoped>
.title-container {
  font-size: 30px;
  padding: 4% 2%;
  font-weight: bold;
  font-family: Arial;
  background: #efefef;
}
.market-data-container {
  margin: 0 5%;
}
.table-font{
  font-size: 17px; font-weight: bold
}
.increase {
  color: red;
}
.decrease {
  color: green;
}
</style>
