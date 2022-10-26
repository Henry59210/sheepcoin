<template>
  <div class="container">
    <ul style="color: white; list-style:none">
      <li class="item" v-for="(item, index) in afterData" :key="index">{{ index | indexShow }}<span>{{ ': ' + item }}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "managerDetail",
  props:{
    // originData: {
    //   type: Object,
    //   default() {
    //     return {}
    //   }
    // }
  },
  filters: {
    indexShow(msg) {
      return msg.split('_').join(' ')
    }
  },
  data() {
    return {
      originData: {},
      afterData: {}
    }
  },
  watch: {
    originData: {
      handler: function(val) {
        this.dataFilter(val)
      },
      immediate: true,
      deep: true
    }
  },
  // mounted() {
  //   this.dataFilter(this.originData)
  // },
  methods: {
    dataFilter(data) {
      if(data.ath){
        let {ath, atl, circulating_supply , current_price , market_cap , name, price_change_24h , total_supply , total_volume} = data
        let obj = {}
        obj.All_Time_High = ath
        obj.All_Time_Low = atl
        obj.Circulating_Supply= circulating_supply
        obj.Current_Price= current_price
        obj.Market_Cap = market_cap
        obj.Name = name
        obj.Price_change_24h = price_change_24h
        obj.total_supply = total_supply
        obj.total_volume = total_volume
        this.afterData = obj
      } else {
        let { createTime, currencyName, currencySymbol, id, updateTime } = data
        let obj = {}
        obj.Create_Time = createTime
        obj.Name = currencyName
        obj.Symbol = currencySymbol
        obj.Id = id
        obj.Update_Time = updateTime
        this.afterData = obj
      }
    }

  }
}
</script>

<style scoped>
.item {
  padding: 10px 0;
}
</style>
