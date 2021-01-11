<template>
  <div class="login_container">
    <div>testing</div>
    <div class="login_box">
      <!--   login picture -->
      <div
        style="
          width: 100px;
          height: 100px;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          background: #eee;
        "
      >
        <img
          src="../assets/images.jpg"
          alt=""
          style="height: 100%; width: 100%"
        />
      </div>
      <!-- login form  -->
      <el-form :model="loginForm" :rules="loginFormRules" ref='loginFormRef' label-width="100px" class="login_form">
        <!-- username -->
        <el-form-item prop="username" label="username:" >
          <el-input v-model="loginForm.username" placeholder="username" ></el-input>
        </el-form-item>
        <!--  password -->
        <el-form-item prop="password" label="password:" >
          <el-input v-model="loginForm.password" placeholder="password" type="password"></el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item class="btns">
          <el-button type="primary" round @click="login">login</el-button>
          <el-button type="primary" round @click="resetLoginForm">reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /* this is login form  */
      loginForm: {
        username: 'zs1',
        password: '123456'
      },
      /* this is the validation rule */
      loginFormRules: {
        /* validate if the username is allowed */
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
        ],
        /*  validate thepassword */
        password: [
          { required: true, message: 'Please input the password', trigger: 'blur' },
          { min: 6, max: 15, message: 'Length should be 6 to 15', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    /* this method is for click reset the loginform function */
    resetLoginForm () {
      /*  console.log(this) */
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid);
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return console.log('login failure')
        console.log('login success')
      })
    }
  }
}
</script>

<style lang= "less" scoped>
.login_container {
  background-color: #cc3232;
  height: 100%;
}
.login_box {
  height: 300px;
  width: 450px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-start;
}
</style>
