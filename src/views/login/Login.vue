<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <indexTop></indexTop>
      </el-header>
      <el-main>
        <div class="login">
          <h1>用户登录</h1>
          <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <a-form-item name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.username">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <a-input-password v-model:value="formState.password">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember"> 记住密码 </a-checkbox>
              </a-form-item>
              <a class="login-form-forgot" href=""> 忘记密码 </a>
            </a-form-item>

            <a-form-item>
              <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                登录
              </a-button>
              没有账号
              <a href="/register">注册账号</a>
            </a-form-item>
          </a-form>
        </div>
      </el-main>
      <el-footer>
        <indexBottom></indexBottom>
      </el-footer>
    </el-container>
  </div>

</template>

<script setup lang="js">
import indexTop from '../../components/indexTop.vue'
import indexBottom from '../../components/indexBottom.vue'
import { reactive, computed, pushScopeId } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import { useRouter } from 'vue-router';
import token from '../../api/Token';
import { alertEffects } from 'element-plus'
import link from "@/api/Link.js";

let router = useRouter();

const formState = reactive({
  username: '',
  password: '',
  remember: true
})
const onFinish = (values) => {
  console.log('Success:', values)

  link("/User/login", 'POST',{}, {
    info: values.username,
    password: values.password
  }, {}, true).then(response => {
    const tk = token()
    if (tk == null) {
      alert('登录失败,请重试')
      router.push('/login')
    } else if (tk.userLevel == 1) {
      alert('登入成功，正在跳转仪表盘')
      router.push("/Buss/board")
      // console.log("level:" + 1)
    } else if (tk.userLevel == 2) {
      alert('登入成功，正在跳转管理员界面')
      // console.log("level:" + 2)
      router.push("/Admin/board")
    } else {
      alert("登录成功")
      router.push("/")
    }
  })
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>

<style lang="scss" scoped>
html,
body,
#app {
  width: 100%;
}
.el-main {
  //width: 80%;
  width: 1100px;
  margin: 0 auto;
  padding: 0;

}

.el-header {
  padding: 0;
  margin: 0;
  height: auto;
}

.el-footer {
  height: 200px;
  width: 100%;
  margin-top: 50px;
  padding: 0 50px;
  background-color: #a09f9f;
}
.login {
  width: 600px;
  background-color: rgba(169, 169, 249, 0.4);
  margin: 0 auto;
  border: 0px solid black;
  border-radius: 2rem;
  color: #000;
  padding-bottom: 20px;

  h1 {
    line-height: 5rem;
    text-align: center;
  }

  .login-form {
    width: 60%;
    margin: 0 auto;
  }

  a {
    color: aliceblue;
  }
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
