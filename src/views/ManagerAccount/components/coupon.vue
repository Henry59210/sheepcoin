<template>
  <div>
    <div class="title"><h1>Add coupon</h1></div>
    <div class="operates">
      <span>Denomination:</span><el-input></el-input>
      <el-select placeholder="user Type">
        <el-option label="all user"></el-option>
        <el-option label="single user"></el-option>
      </el-select>
      <div>
        <el-button>confirm</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coupon"
}
</script>

<style scoped>
.title {
  text-align: center;
}
</style>
