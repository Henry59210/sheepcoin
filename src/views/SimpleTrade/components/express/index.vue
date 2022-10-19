<template>
  <div class="express-trade-container">
    <div class="trade-panel-container">
      <div class="trade-options-container">
        <div class="buy-option" :class="{'isActive': activedOption!=='buy'}" @click="clickTradeType('buy')">
          <p>buy</p>
        </div>
        <div class="sell-option" :class="{'isActive': activedOption!=='sell'}" @click="clickTradeType('sell')">
          <p>sell</p>
        </div>
      </div>
      <div class="trade-field">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

// import {geyAllCurrency, geyAllFiat} from "@/api/simpleTrade";

export default {
  name: "express",
  data () {
    return {
      activedOption: 'buy',
      allCurrency: [],
      allFiat: []
    }
  },
  created() {
    this.$store.dispatch('trade/geyAllCurrency')
    this.$store.dispatch('trade/geyAllFiat')
  },
  methods: {
    clickTradeType(type) {
      type === 'buy' ? this.activedOption='buy' : this.activedOption='sell'
      this.$router.replace(type)
    },
  }
}
</script>

<style scoped>
.express-trade-container {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/simpleTradeBackground.jpg") no-repeat fixed;
  background-size: cover;
}
.trade-panel-container {
  position: absolute;
  border-radius: 20px;
  height: 80%;
  width: 45%;
  top: 50%;
  left: 43%;
  transform: translateY(-50%);
  background: white;
  opacity: 0.9;
}
.trade-options-container {
  display: flex;
  height: 15%;
}
.sell-option,.buy-option {
  flex: 1;
  text-align: center;
  color: #000000;
  cursor: pointer;
  font-size: 28px;
  font-family: Arial;
}
.buy-option {
  border-top-left-radius:20px
}
.sell-option {
  border-top-right-radius:20px
}
.isActive {
  background: #cccccc;
  color: grey;
}
.trade-field {
  height: 85%;
}
</style>
