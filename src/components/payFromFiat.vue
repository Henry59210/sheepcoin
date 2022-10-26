<template>
  <div style="height: 100%; width: 100%">
    <div v-if="!isSuccess"  class="fiat-payment-container" v-loading="loading">
      <div class="price-display-container">
        {{ finalForm.fiatType + '  ' + finalForm.fiatAmount }}
      </div>
      <div>{{ 'you will receive' + finalForm.currencyAmount + ' ' + finalForm.currencyType}}</div>
      <div v-if="haveCard" class="cards-display-container">
        <div class="card-place" v-for="item in userCards" :key="item.id">
          <el-card shadow="hover" class="box-card" :class="{'isActivated': selectedCard===item.id }" @click.native="chooseCard(item)">
            <div class="card-info">
              {{ item.cardNo.toString().replace(/.(?=.{4})/g, '*') }}
            </div>
            <div class="card-select-status">
              <i v-if="selectedCard===item.id" class="el-icon-check"></i>
            </div>
          </el-card>
        </div>
      </div>
      <div v-if="!haveCard" class="cards-display-container noCard">
        <el-button @click="goToAccount">Add your card first</el-button>
      </div>
    </div>
    <div v-if="isSuccess" class="fiat-payment-container">
        <el-result icon="success" title="Payment Success!" subTitle="enjoy your investment">
        </el-result>
    </div>
  </div>
</template>

<script>
import {getCard} from "@/api/simpleTrade";

export default {
  name: "payFromFiat",
  props: {
    finalForm: {
      type: Object,
      default: ()=> {
        return {}
      }
    }
  },
  data() {
    return {
      haveCard: false,
      isSuccess: false,
      paymentDialogVisible: false,
      isChooseCard: false,
      loading: false,
      selectedCard: '',
      userCards: [],
      paymentCard: {}
    }
  },
  created() {
    this.getUserCard()
  },
  methods: {
    async getUserCard() {
      this.loading = true
      let res = await getCard()
      this.userCards = res.data
      this.userCards.length === 0 ? this.haveCard = false : this.haveCard = true
      this.loading = false
    },
    chooseCard(cardInfo) {
      this.selectedCard = cardInfo.id
      this.paymentCard = cardInfo
      this.isChooseCard = true
    },
    goToAccount() {
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped>
.fiat-payment-container {
  width: 100%;
  height: 100%;
}
.price-display-container {
  font-size: 25px;
  text-align: center;
  padding: 10%;
  height: 30%;
  box-sizing: border-box;
}
.cards-display-container {
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  height: 70%;
  overflow: scroll;
}
.noCard {
  background: #e5e5e5;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-place {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 15px;
  letter-spacing: 4px
}
.box-card {
  cursor: pointer;
}
.card-info {
  display: inline-block;
  width: 80%;
}
.card-select-status {
  display: inline-block;
  text-align: right;
  width: 20%;
}
.isActivated {
  border: 1px solid #ff8800;
}
.el-icon-check {
  color: green;
}
</style>
