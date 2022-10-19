<template>
  <div class="register-container">
    <div class="title">
      <h1>Register</h1>
    </div>
    <el-form class="form-container" ref="registerForm" :model="registerForm" :rules="registerRules"  label-position="top">
      <el-form-item label="please enter your username:" prop="username">
        <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="Username"
            clearable/>
      </el-form-item>
      <el-form-item label="please enter your email:" prop="email">
        <el-input
            ref="email"
            v-model="registerForm.email"
            placeholder="E-mail"
            clearable/>
      </el-form-item>
      <el-form-item label="please enter your phoneNum:" prop="phoneNum">
        <el-input
            ref="phoneNum"
            v-model="registerForm.phoneNum"
            placeholder="Phone Number"
            clearable/>
      </el-form-item>
      <el-form-item label="please enter your password:" prop="password">
        <el-input type="password" v-model="registerForm.password" placeholder="Password" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="please enter your password again:" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" placeholder="Password Again" autocomplete="off" clearable></el-input>
      </el-form-item>
    </el-form>
    <div class="button-field">
      <el-button type="primary" :loading="loading" style="height: 13%; width: 20%" @click.native.prevent="userRegister">Register</el-button>
    </div>
    <div class="goto-register">
      <p>Already have account?  <router-link to="/auth/login">click here!</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('Password not same!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      redirect: undefined,
      passwordType: 'password',
      showPassword: false,
      registerForm: {
        checkPass: '',
        username: '',
        password: '',
        email: '',
        phoneNum: ''
      },
      registerRules: {
        password: [{ required: true, message: 'Please enter password', trigger: 'blur' },],
        checkPass: [{ required: true, message: 'Please enter your password again', trigger: 'blur' },{ validator: validatePass, trigger: 'blur' }],
        username: [{ required: true, message: 'please enter username', trigger: 'blur' }],
        phoneNum: [{ required: true, message: 'please enter phoneNum', trigger: 'blur' }],
        email:[
          { required: true, message: 'Please enter email', trigger: 'blur' },
          { type: 'email', message: 'Please enter right email', trigger: ['blur', 'change'] }
        ]
      },
    }
  },
  methods: {
    userRegister() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          await this.$store.dispatch('user/register', this.registerForm)
          await this.$router.push('/')
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
.register-container {
  position: absolute;
  background: rgba(255, 255, 255);
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 80%;
  border-radius: 8%;
  opacity: 0.9;
}
.title {
  text-align: center;
  padding-top: 10px;
}
.form-container {
  padding: 0 15%;
  height: 60%;
  overflow: scroll;
}
.button-field {
  text-align: center;
  padding: 3%;
}
.goto-register {
  padding-left: 15%;
  position: absolute;
  bottom: 5%;
  font-size: 14px;
}
/deep/.el-form-item__label {
  font-size: 18px;
}
</style>
