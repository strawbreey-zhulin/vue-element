<template>
  <div id="login_content">
    <div id="login_box">
      <div id="login_logo">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form ref="form" :model="loginform" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="loginform.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginform.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :offset="7">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="chongzhi">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async valid => {
        if (valid === true) {
          const { data: res } = await this.$http.post('/login', this.loginform)
          console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.error('错了哦，这是一条错误消息')
          }
          window.sessionStorage.setItem('token',res.data.token)
          this.$router.push('/home')
        }
      })
    },
    chongzhi() {
      this.$refs.form.resetFields()
      this.loginform.password = ''
    }
  }
}
</script>

<style lang="less" scoped>
#login_content {
  height: 100%;
  background-color: #2b4b6b;
  overflow: hidden;
  position: relative;
  #login_box {
    width: 450px;
    height: 304px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .el-form {
      width: 100%;
      position: absolute;
      box-sizing: border-box;
      padding: 20px;
      bottom: 0;
    }
    #login_logo {
      width: 130px;
      height: 130px;
      background-color: #eee;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px #eee;
      padding: 6px;
      border: 1px solid #ccc;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        background-color: #eee;
        border-radius: 50%;
      }
    }
  }
}
</style>
