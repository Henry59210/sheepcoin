<template>
  <div class="fiat-payment-container">
    <div class="price-display-container">

    </div>
    <div class="cards-display-container">
      <div class="card-place" v-for="(item,index) in userCards" :key="index">
        <el-card shadow="hover" class="box-card" :class={} @click="selectedCard">
          {{ item.replace(/.(?=.{4})/g, '*') }}
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {getCard} from "@/api/simpleTrade";

export default {
  name: "payFromFiat",
  data() {
    return {
      selectedCard: '',
      userCards: []
    }
  },
  created() {
    this.getUserCard()
  },
  methods: {
    async getUserCard() {
      let res = await getCard()
      this.userCards = res.data
    },
  }
}
</script>

<style scoped>
.fiat-payment-container {
  width: 100%;
  height: 100%;
}
.price-display-container {
  height: 30%;
}
.cards-display-container {
  height: 70%;
  overflow: scroll;
}
.card-place {

}
.box-card {

}
</style>
