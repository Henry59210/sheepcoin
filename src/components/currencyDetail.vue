<template>
  <div>
    <div class="currency-detail-container">
      <div class="header">
        <i class="el-icon-close" @click="close"></i>
      </div>
      <div class="title-container">
        BTC
      </div>
      <div class="info-container">
        <div class="currency-info-container">
          <ul>
            <li></li>
          </ul>
        </div>
        <div id="currency-tendency-container"></div>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons')
export default {
  name: "currencyDetail",
  props: {
    currencyDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    currencyDetail: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
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
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("currency-tendency-container"), 'macarons')
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 23, 19],
            type: 'line',
            smooth: true
          }
        ]
      })
    },
    close() {

    }
  }
}
</script>

<style scoped>
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
  width: 50%;
  height: 70%;
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
  font-size: 25px;
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
  flex: 1;
}
#currency-tendency-container {
  flex: 2;
}
</style>
