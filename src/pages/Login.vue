<template>
  <el-container class="login">
<!--    顶部信息栏-->
    <el-header>
      <div class="icon-container">
        <el-tooltip class="github" effect="dark" content="代码仓库" x-placement="bottom">
          <el-link href="https://www.baidu.com">
            <img src="../assets/img/github.png" alt="github icon">
          </el-link>
        </el-tooltip>

        <el-tooltip class="weixin" effect="dark" content="联系维护者" x-placement="bottom">
          <el-link href="https://www.baidu.com">
            <img src="../assets/img/weixin.png" alt="weixin icon">
          </el-link>
        </el-tooltip>

        <el-tooltip class="find" effect="dark" content="发现更多" x-placement="bottom">
          <el-link href="https://www.baidu.com">
            <img src="../assets/img/find.png" alt="find icon">
          </el-link>
        </el-tooltip>
      </div>
    </el-header>
<!--    对话框-->
    <el-main>
      <LoginBox v-if="box_type === 'login'" :type.sync="box_type" />
      <Reset v-else-if="box_type === 'reset'" @cancel="box_type = 'login'" />
      <Register v-else @cancel="box_type = 'login'" />
    </el-main>
  </el-container>
</template>

<script>
import LoginBox from '../components/login-box/LoginBox'
import Register from '../components/register-box/Register'
import Reset from '../components/reset-box/Reset'
export default {
  name: 'Login',
  components: {Reset, Register, LoginBox},
  data () {
    return {
      box_type: 'login'
    }
  },
  methods: {
    hello () {
      this.$on('hello', this.haha)
    },

    haha(value) {
      console.log(value);
    }
  },
}
</script>

<style scoped>
  .login {
    height: 100vh;
    background-image: url("../assets/img/bg.jpg");
    background-size: cover;
    display: flex;
  }

  .el-header {
    background-color: rgba(8, 8, 8, 0.3);
    display: flex;
    justify-content: flex-end;

  }

  .el-main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-tooltip {
    padding-top: 6px;
    padding-right: 10px;
  }

  .el-header {
    padding: 0;
  }

  .el-link:hover {
    text-decoration: none;
  }
</style>
