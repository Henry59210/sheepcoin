<template>
  <div>
    <div class="search-area">
      <el-input v-model="userId" style="width: 90%"></el-input><el-button type="primary" @click="viewUserCredit">search</el-button>
    </div>
    <div class="credit-display">{{ 'Credit Point:   ' + userCredit }}</div>
  </div>
</template>

<script>
import {getUserCredit} from "@/api/account";

export default {
  name: "user",
  data() {
    return {
      userId: '',
      userCredit: ''
    }
  },
  methods: {
    async viewUserCredit() {
      let res = await getUserCredit(this.userId)
       this.userCredit = res.data
    }
  }
}
</script>

<style scoped>
.search-area {
  margin: 20px;
}
.credit-display {
  margin: 20px;
  height: 70%;
  border-radius: 10px;
  border: 2px grey solid;
  box-sizing: border-box;
  padding: 40px;
}
</style>
