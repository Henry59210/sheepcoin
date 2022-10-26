<template>
  <div>
    <div class="info-container">
      <span style="float: right"><el-button @click="refresh">Refresh</el-button></span>
      <div class="select-area">
        <span>We have</span>
        <el-select class="el-select" v-model="weHaveInfo" filterable placeholder="Search" @change="setWeHaveInfo">
          <el-option
              v-for="item in weHave"
              :key="item.symbol"
              :label="item.currencyName"
              :value="item.id">
          </el-option>
        </el-select>
        <span>
          <el-button @click="deleteCurrency" :disabled="weHaveInfo===''">Delete</el-button>
        </span>
      </div>
      <div class="detail-area">
        <manager-detail ref="weHaveDetail" v-if="isShowHave" ></manager-detail>
      </div>
    </div>
    <div class="info-container">
      <div class="select-area">
        <el-select class="el-select" v-model="weWantInfo" filterable placeholder="Search" @change="setWeWantInfo">
          <el-option
              v-for="item in weWant"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
        <span>
          <el-button @click="addCurrency" :disabled="weWantInfo===''">Add</el-button>
        </span>
      </div>
      <div class="detail-area">
        <manager-detail ref="weWantDetail" v-if="isShowWant" ></manager-detail>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import managerDetail from "@/components/managerDetail";
import {addCurrency, deleteCurrency} from "@/api/manager";

export default {
  name: "currency",
  components:{managerDetail},
  data() {
    return {
      isShowHave: false,
      isShowWant: false,
        weHave: [],
        weWant: [],
      weHaveInfo: '',
      weWantInfo: '',
      allCurrency: [],
      weHaveDetail: {},
      weWantDetail: {}
    }
  },
  created() {
    this.$store.dispatch('trade/getAllCurrency').then(()=>{
      this.weHave = this.$store.getters.allCurrency
    })
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false').then((res)=>{
      this.weWant = res.data
    })
  },
  methods: {
    refresh() {
      this.$store.dispatch('trade/getAllCurrency').then(()=>{
        this.weHave = this.$store.getters.allCurrency
      })
    },
    setWeHaveInfo() {
      let that = this
      this.weHaveDetail = (function() {
        for (let i in that.weHave) {
          if (that.weHave[i].id === that.weHaveInfo) {
            return that.weHave[i]
          }
        }
      })()
      this.isShowHave = true
      this.$nextTick(()=>{
        this.$refs.weHaveDetail.originData = this.weHaveDetail
      })
    },
    setWeWantInfo() {
      let that = this
      this.weWantDetail = (function() {
        for (let i in that.weWant) {
          if (that.weWant[i].id === that.weWantInfo) {
            return that.weWant[i]
          }
        }
      })()
      this.isShowWant = true
      this.$nextTick(()=>{
       this.$refs.weWantDetail.originData = this.weWantDetail
      })
    },
    async deleteCurrency() {
      await deleteCurrency(this.weHaveInfo)
    },
    async addCurrency() {
      let data= {
        currencyName:  this.weWantDetail.id,
        currencySymbol: this.weWantDetail.symbol
    }
      await addCurrency(data)
    }
  }
}
</script>

<style scoped>
.info-container{
  height: 100%;
  width: 45%;
  box-sizing: border-box;
  margin: 0 2%;
  border-radius: 20px;
  border: 2px solid grey;
  display: inline-block;
  padding: 20px;
  background: #f1f1f1;
  vertical-align: top;
}
.select-area {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-select {
  width: 80%;
}
.detail-area {
  height: 80%;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 10px;
  background: black;
  color: white;
}
</style>
