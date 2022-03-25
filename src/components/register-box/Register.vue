<template>
  <div class="container">
    <h1>注册</h1>

    <div class="registerInfo">
      <el-input class="username" type="text"
                v-model="username" placeholder="请设置用户名" @blur="checkUserName" />

      <el-input class="password" type="password" v-model="password" placeholder="请输入密码" />

      <el-input class="password" type="password" v-model="rePassword" placeholder="请再次输入密码" />

      <el-select v-model="value" placeholder="请选择密保问题">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item">
        </el-option>
      </el-select>

      <el-input class="secretAnswer" type="text" v-model="secretAnswer" placeholder="密保答案" />
    </div>

    <div class="otherFunc">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
import SparkMD5 from "spark-md5"

export default {
  name: 'Register',

  data () {
    return {
      // 用户名
      username: '',
      // 密码
      password: '',
      // 确认密码
      rePassword: '',
      // 用户选择的密保问题
      value: '',
      // 下拉框数据
      options: [],
      // 密保答案
      secretAnswer: ''
    }
  },

  watch: {
    // 监听 data 中 value 值的变化
    value(newValue, oldValue) {
      console.log('new', newValue, 'old', oldValue);
    }
  },

  methods: {
    // 请求密保问题列表
    async getQuestions() {
      const config = {
        url: '/login/getquestions',
        method: 'get'
      }

      const result = await this.$http(config);
      console.log('result : ', result.data.data);
      this.options = result.data.data;
    },

    // 检测用户名
    // 说明：用于新用户注册时，请求服务器验证用户名是否已存在
    async checkUserName() {
      // 不在此范围内的报错
      if (/[^1-9A-Za-z]/.test(this.username)) {
        this.$message.error('用户名包含非法字符');
        return;
      }
      // 限制用户名长度
      if (this.username.length < 5 || this.username.length > 15) {
        this.$message.error('用户名长度错误');
        return;
      }

      const config = {
        url: '/login/checkname',
        method: 'post',
        data: {
          user_name: this.username
        }
      }

      const result = await this.$http(config);
      if (result.data.code === 809) {
        this.$message.error('用户名已存在');
        this.username = '';
      }
    },

    // 取消注册
    // 对应 Login.vue 中对话框中的组件的 @cancel 点击函数
    cancel() {
      this.$emit('cancel');
    },

    // 注册按钮
    async register() {
      // 限制用户名长度
      if (this.username.length < 5 || this.username.length > 15) {
        this.$message.error('用户名长度错误');
        return;
      }

      if (this.password !== this.rePassword) {
        this.$message.error('两次输入的密码不一致');
        return;
      }

      if (this.value === '' || this.secretAnswer === '') {
        this.$message.error('请设置密保问题');
        return;
      }

      if (this.secretAnswer.length > 20) {
        this.$message.error('密保答案不可超过20字');
        return;
      }

      const config = {
        url: '/login/signin',
        method: 'post',
        data: {
          user_name: this.username,
          user_password: SparkMD5.hash(this.password),
          user_question: this.value,
          user_answer: this.secretAnswer,
          mock: 'mock'
        }
      }

      const result = await this.$http(config);

      if (result.data.code === 820) {
        // 注册成功的同时关闭注册框
        this.cancel();
        this.$message.success('注册成功');
      } else {
        this.$message.error(result.data.message);
      }
    }
  },

  mounted () {
    this.getQuestions();
  },


}
</script>

<style scoped>
.container {
  width: 500px;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.376);
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  font-size: 50px;
  margin: 20px 0;
}

.registerInfo {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  /*justify-content: center;*/
  /*align-items: center;*/
}

.registerInfo > * {
  margin-bottom: 10px;
}

.otherFunc {
  margin: 20px auto;
}

.otherFunc .el-button {
  margin-right: 30px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
