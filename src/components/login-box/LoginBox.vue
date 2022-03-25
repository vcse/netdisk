<template>
  <div class="container">
    <div class="form">

      <el-row>
        <el-col>
          <img src="../../assets/img/name.png" alt="header pic">
        </el-col>
      </el-row>

      <div class="login">
        <el-input class="username" type="text" v-model="username" placeholder="请输入用户名"></el-input>

        <el-input class="password" type="password" v-model="password" placeholder="请输入密码"></el-input>

        <el-button @click="login">登录</el-button>
      </div>

      <div class="otherFunc">
        <el-button @click="register">注册</el-button>
        <el-button @click="reset">忘记密码</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5';
export default {
  name: 'LoginBox',
  props:{
    type: String
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$emit('update:type', 'register');
      this.$emit('hello', 'register');
    },

    reset() {
      this.$emit('update:type', 'reset');
    },

    async login() {
      if (this.username === '' || this.password === '') {
        this.$message.error('用户名或密码不能为空');
        return
      }

      const config = {
        url: '/login/login',
        method: 'post',
        data: {
          user_name: this.username,
          user_password: SparkMD5.hash(this.password)
        }
      }

      // 发送网络请求
      const result = await this.$http(config);
      switch (result.data.code) {
        case 802:
          // 登录成功，commit 到 login 方法处理数据，并且跳转路由
          this.$store.commit('login', {
            user: result.data.data.user,
            token: result.data.data.token,
            folders: result.data.data.folders
          })
          // 跳转到 home 页
          this.$router.push('/home/timeline');
          this.$message.success('欢迎来到 miss yo');
          break;
        case 803:
          // 无此用户
          this.$message.error('用户不存在，请前往注册页');
          break;
        case 804:
          // 密码错误
          this.$message.error('密码错误');
          break;
        default:
          break;
      }
    }
  },


}
</script>

<style scoped lang="scss">
  .container {
    /*display: flex;*/
    width: 500px;
    height: 600px;
    /*justify-content: center;*/
    /*align-items: center;*/
    background-color: rgba(0, 0, 0, 0.376);
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .el-row img {
    width: 450px;
  }

  .login {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  .login .username {
    margin-top: 20px;
  }

  .login .password {
    margin-top: 20px;
  }

  .login .el-button {
    margin-top: 60px;
  }


</style>
