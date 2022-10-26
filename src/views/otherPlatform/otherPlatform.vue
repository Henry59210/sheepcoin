<template>
  <div class="container">
    <div class="login-container">
      <div class="title">
        <h1>Draw</h1>
      </div>
      <el-form class="form-container" ref="loginForm" :model="drawForm" :rules="loginRules"  label-position="top">
        <el-form-item label="please enter your address:" prop="address">
          <el-input v-model="drawForm.userId" placeholder="address" clearable></el-input>
        </el-form-item>
        <el-form-item label="please enter amount you want to transfer:" prop="amount">
          <el-input
              ref="password"
              v-model.number="drawForm.password"
              placeholder="amount"
              clearable></el-input>
        </el-form-item>
        <el-form-item label="please choose type you want to transfer:">
          <el-select v-model="drawForm.currencySymbol" filterable placeholder="Currency">
            <el-option
                v-for="item in allCurrency"
                :key="item.currencySymbol"
                :label="item.currencyName"
                :value="item.currencySymbol">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="button-field">
        <el-button type="warning" :loading="loading" style="height: 13%; width: 20%" @click.native.prevent="drawMoney">draw</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {topUp} from "@/api/account";

export default {
  name: "otherPlatform",
  data() {
    return {
      loading: false,
      drawForm: {
        userId: '',
        amount: '',
        currencySymbol: ''
      },
      loginRules: {
        address: [{ required: true, message: 'please enter username', trigger: 'blur' }],
        amount: [{ required: true, message: 'please enter password', trigger: 'blur' }]
      },
    }
  },
  computed: {allCurrency() {
      return this.$store.getters.allCurrency
    },
  },
  mounted() {
    this.$store.dispatch('trade/getAllCurrency')
  },
  methods: {
    drawMoney() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          await topUp(this.drawForm)
          this.loading = false
          this.$message.success('Transform success!')
        } else {
          alert('error format!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
.container {
  background: #efefef;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.login-container {
  position: absolute;
  background: rgba(255, 255, 255);
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 65%;
  border-radius: 8%;
  opacity: 0.9;
}
.title {
  padding-top: 20px;
  text-align: center;
}
.form-container {
  padding: 0 15%;
}
.button-field {
  text-align: center;
  padding: 3%;
}
.goto-register {
  padding-left: 15%;
  position: absolute;
  bottom: 5%;
}
/deep/.el-form-item__label {
  font-size: 18px;
}
</style>
