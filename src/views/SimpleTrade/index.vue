<template>
  <div>
    <div class="trade-options-container">
      <el-menu
          :default-active="activateName"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#1f2138"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handClick" >
        <el-menu-item v-for="item in simpleTrade" :key="item.path" :index="item.path" @click.native.prevent="activateName=item.path">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="trade-area">
      <router-view></router-view>
    </div>
    <el-dialog
        title="Payment"
        :visible.sync="fiatPaymentDialogVisible"
        width="40%"
        center>
          <div class="dialog-content-container">
            <pay-from-fiat ref="payFromFiat" :finalForm="buyForm"></pay-from-fiat>
          </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancelPayment" :disabled="canNotCancel">cancel</el-button>
    <el-button type="primary" @click="confirmPayment">Confirm Payment</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import PayFromFiat from "@/components/payFromFiat";
import {topUp} from "@/api/account";

export default {
  name: "simple-trade",
  components: {PayFromFiat},
  data() {
    return {
      activateName: 'express',
      canNotCancel: false
    };
  },
  watch: {
      $route: {
        handler: function(route) {
          this.activateName = route.meta.activateName.toLowerCase() //fix bug： 切换导航菜单时activateName不变，会导致样式无法更新，只有三层路由会有问题
        },
        immediate: true
      },
  },
  computed: {
    fiatPaymentDialogVisible: {
      get() {
        return this.$store.state.trade.fiatPaymentDialogVisible
      },
      set(status) {
        this.$store.state.trade.fiatPaymentDialogVisible = status
      }
    },
    buyForm() {
      return this.$store.state.trade.buyForm
    },
    simpleTrade() {
      return this.$router.options.routes.filter(item => {
        return item.path === '/simpleTrade'
      })[0].children[0].children
    },
    // fix bug2: 同一个问题，解决方式不同
    tabValue: {
      get() {
        return this.$route.name.toLowerCase()
      },
      set(value) {
        this.$router.push(value)
      }
    }
  },
  methods: {
    async confirmPayment() {
      if ( this.$refs.payFromFiat.isChooseCard ) {
        if( !this.$refs.payFromFiat.isSuccess ){
          this.$refs.payFromFiat.loading = true
          let topUpData = {
            userId: this.$store.getters.userid,
            amount: this.buyForm.currencyAmount,
            currencySymbol:  this.buyForm.currencyType
          }
          await topUp(topUpData).then(()=>{
            setTimeout(()=>{
              this.$refs.payFromFiat.loading = false
              this.$refs.payFromFiat.isSuccess = true
              this.canNotCancel = true
            }, 800)
          }).catch(()=>{
            this.$refs.payFromFiat.loading = false
          })
        } else {
          this.$store.state.trade.fiatPaymentDialogVisible = false
          this.$refs.payFromFiat.isSuccess = false
          this.canNotCancel = false
        }
      } else {
        this.$message.warning('Please choose your card!')
      }

    },
    cancelPayment() {
      this.fiatPaymentDialogVisible = false
      this.$refs.payFromFiat.isChooseCard = false
    },
    handClick(key) {
      console.log(key)
      this.$router.push('/simpleTrade/trade/' + key)
    }
  }
}
</script>

<style scoped>
.trade-options-container {
  height: 60px;
}
.trade-area {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 60px;
}
.el-menu-demo {
  padding: 0 10%;
}
.dialog-content-container {
  width: 100%;
  height: 40vh;
}

/deep/.el-menu-item {
  font-size: 17px;
}
</style>
