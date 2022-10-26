<template>
  <div class="login-container">
    <div class="title">
      <h1>Login</h1>
    </div>
    <el-form class="form-container" ref="loginForm" :model="loginForm" :rules="loginRules"  label-position="top">
      <el-form-item label="please enter your username:" prop="username">
        <el-input v-model="loginForm.username" placeholder="username" clearable></el-input>
      </el-form-item>
      <el-form-item label="please enter your password:" prop="password">
        <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            placeholder="password"
            :type="passwordType"
            clearable
            @keyup.enter.native="userLogin"></el-input>
      </el-form-item>
      <el-checkbox v-model="showPassword" @change="showPwd">Show Password</el-checkbox>
    </el-form>
    <div class="button-field">
      <el-button type="warning" :loading="loading" style="height: 13%; width: 20%" @click.native.prevent="userLogin">login</el-button>
    </div>
    <div class="goto-register">
      <router-link to="/auth/register">Create a SheepCoin account</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "loginBlock",
  data() {
    return {
      loading: false,
      redirect: undefined,
      passwordType: 'password',
      showPassword: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: 'please enter username', trigger: 'blur' }],
        password: [{ required: true, message: 'please enter password', trigger: 'blur' }]
      },
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    userLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          await this.$store.dispatch('user/login', this.loginForm)
          await this.$router.push({path: this.redirect!=='/login' ? this.redirect : '/'})
          console.log(this.redirect)
          this.loading = false
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
