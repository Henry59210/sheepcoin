<template>
  <div>
    <div class="currency-detail-container">
      <div class="header">
        <i class="el-icon-close" @click="close"></i>
      </div>
      <div class="title-container">
        <span><img :src="currencyDetail.image" style="width: 30px; height: 30px"></span>
        {{ currencyDetail.symbol.toUpperCase() }}
      </div>
      <div class="info-container">
        <div class="currency-info-container">
            <div class="currency-info-item" v-for="(item,key,index) in detailShow.basicInfo" :key="index">
              <div class="currency-info-item-key">{{ key | keyFilter}}</div>
              <div class="currency-info-item-value">{{ item | valueFilter}}</div>
            </div>
        </div>
        <div id="currency-tendency-container"></div>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {get7day, getMyDate} from "@/utils/usefulTools";
import {getIcon} from "@/api/simpleTrade";
require('echarts/theme/macarons')
export default {
  name: "currencyDetail",
  props: {
    currencyDetail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      chart: null,
      detailShow: {
        basicInfo: {
          highInfo: {},
          lowInfo: {}
        },
        history: []
      },
      abandonData: ['currentPrice','high24h', 'id', 'image', 'lastUpdated', 'low24h', 'name', 'priceChange24h', 'priceChangePercentage1hInCurrency', 'priceChangePercentage24h', 'symbol']
    }
  },
  watch: {
    currencyDetail: {
      deep: true,
      immediate: true,
      handler(data) {
        this.filterData(data)
      }
    },
    'detailShow.history': {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
  },
  mounted() {
    console.log(this.detailShow.history);
    console.log(get7day())
    //this.getImg(),
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  filters: {
    keyFilter(key) {
      let result
      switch (key) {
        case 'highInfo':
          result = 'All time high';
          break;
        case 'lowInfo':
          result = 'All time low';
          break;
        case 'circulatingSupply':
          result = 'Circulating Supply';
          break;
        case 'marketCap':
          result = 'Market Cap';
          break;
        case 'marketCapRank':
          result = 'Market Cap';
          break;
        case 'maxSupply':
          result = 'Max Supply';
          break;
        case 'totalSupply':
          result = 'Total Supply';
          break;
        case 'totalVolume':
          result = 'Total Volume';
          break;
      }
      return result
    },
    valueFilter(item){
      let result
      if (item instanceof Object) {
        item.ath ? result = item.ath + '( ' + getMyDate(item.athDate) + ' )'
            : result = item.atl + '( ' + getMyDate(item.atlDate) + ' )'
      } else result = item
      return result
    }
  },
  methods: {
    async getImg() {
      let res = await getIcon(this.currencyDetail.symbol)
      var reader = new FileReader();
      reader.readAsArrayBuffer(res)
      reader.onload = function(){
        //查看文件输出内容
        console.log(this.result);
        //查看文件内容字节大小
        console.log(new Blob([this.result]))
      }
    },
    filterData(data) {
      for (let item in data){
        if(this.abandonData.indexOf(item) === -1) {
          if(item === 'sparklineIn7d') this.detailShow.history = data[item].price
          else if (item === 'ath' || item === 'athDate') this.detailShow.basicInfo.highInfo[item] = data[item]
          else if (item === 'atl' || item === 'atlDate') this.detailShow.basicInfo.lowInfo[item] = data[item]
          else this.detailShow.basicInfo[item] = data[item]
        }
      }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById("currency-tendency-container"), 'macarons')
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: 'Price Changed in last 7 days'
        },
        xAxis: {
          type: 'category',
          data: get7day()
        },
        yAxis: {
          boundaryGap: [ 0.5, 1 ]
        },
        series: [
          {
            data: this.detailShow.history,
            type: 'line',
            smooth: true
          }
        ],
        dataZoom: {
          show: true,
          realtime: true,
          start: 0,
          end: 10,
          filterMode: 'empty',//增加这句属性设值
        },
      })
    },
    close() {
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped>
li {
  list-style-type:none;
}
.mask-layer {
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: calc(100% + 60px);
  background: black;
  opacity: 0.7;
  z-index: 100;
}
.currency-detail-container {
  position: absolute;
  background: white;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4%;
  z-index: 999;
}
.header {
  text-align: right;
  padding-right: 3%;
  padding-top: 3%;
  font-size: 20px;
  height: 25px;
}
.el-icon-close {
  cursor: pointer;
}
.title-container {
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  padding: 0 50px;
  font-weight: bold;
  box-sizing: border-box;
}
.info-container {
  position: absolute;
  bottom: 0;
  top: 85px;
  width: 100%;
  display: flex;
}
.currency-info-container {
  flex: 2;
  padding: 40px;
}
#currency-tendency-container {
  flex: 4;
}
.currency-info-item {
  display: flex;
  font-family: "Helvetica Neue";
  margin-top: 20px;
}
.currency-info-item-key {
  flex: 1;
  font-weight: bold;
  color: #303133;
  margin-right: 20px;
}
.currency-info-item-value {
  flex: 2;
  color: #606266;
}
</style>
