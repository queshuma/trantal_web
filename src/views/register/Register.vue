<template>
  <indexTop></indexTop>
  <div class="register">
    <h1>用户注册</h1>
    <a-form :model="formState" :rules="rules" name="normal_register" class="register-form" @finish="onFinish"
      @finishFailed="onFinishFailed">

      <a-form-item label="昵称" name="userAccount">
        <a-input v-model:value="formState.userAccount">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="姓名" name="userName">
        <a-input v-model:value="formState.userName">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="邮箱" name="userEmail">
        <a-input v-model:value="formState.userEmail">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="手机号" name="userPhone">
        <a-input v-model:value="formState.userPhone">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="密码" name="userPassword">
        <a-input-password v-model:value="formState.userPassword">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item label="重复密码" name="userRePassword">
        <a-input-password v-model:value="formState.userRePassword">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="register-form-button">
          立即注册
        </a-button>
        已有账号
        <a href="/login">登录账号</a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="js">
import { reactive, computed } from 'vue'
import * as check from '../../util/userCheck.js'
import axios from 'axios'
import { useRouter } from 'vue-router';
import indexTop from '../../components/indexTop.vue'
import indexBottom from '../../components/indexBottom.vue'

const router = useRouter()
const formState = reactive({
})

//用户昵称失去焦点需要做的逻辑
const validateUserAccount = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value.trim() === '') {
      reject(new Error('昵称不能为空'))
    } else if (!check.CheckUserAccount(value)) {
      reject(new Error('昵称应该在2个字符到10个字符之间!'))
    } else {
      resolve()
    }
  })
}
//用户姓名失去焦点需要做的逻辑
const validateUserName = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value.trim() === '') {
      reject(new Error('姓名不能为空'))
    } else if (!check.CheckUserName(value)) {
      reject(new Error('请输入真实姓名!'))
    } else {
      resolve()
    }
  })
}
//用户邮箱失去焦点需要做的逻辑
const validateUserEmail = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value.trim() === '') {
      reject(new Error('邮箱不能为空'))
    } else if (!check.CheckUserEmail(value)) {
      reject(new Error('请输入正确的邮箱地址!'))
    } else {
      resolve()
    }
  })
}
//用户手机号失去焦点需要做的逻辑
const validateUserPhone = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value.trim() === '') {
      reject(new Error('手机后不能为空'))
    } else if (!check.CheckUserPhone(value)) {
      reject(new Error('请输入正确的手机号!'))
    } else {
      resolve()
    }
  })
}
//用户密码失去焦点需要做的逻辑
const validateUserPassword = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value.trim() === '') {
      reject(new Error('密码不能为空'))
    } else if (!check.CheckUserPassword(value)) {
      reject(new Error('请输入合理的密码!'))
    } else {
      resolve(); // 验证通过
    }
  })
}
//用户重复密码失去焦点需要做的逻辑
const validateUserRePassword = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value.trim() === '') {
      reject(new Error('密码不能为空'));
    } else if (!check.CheckUserPassword(value)) {
      reject(new Error('请输入合理的密码!'));
    } else if (value !== formState.userPassword) {
      reject(new Error('请确认重复密码的正确性!'));
    } else {
       resolve(); // 验证通过
    }
  });
};



const rules = reactive({
  userAccount: [{ validator: validateUserAccount, trigger: 'blur' }],
  userName: [{ validator: validateUserName, trigger: 'blur' }],
  userEmail: [{ validator: validateUserEmail, trigger: 'blur' }],
  userPassword: [{ validator: validateUserPassword, trigger: 'blur' }],
  userRePassword: [{ validator: validateUserRePassword, trigger: 'blur' }],
})

const onFinish = (values) => {
  console.log('Success:', values.userPassword)

  axios.request({
    url: 'http://localhost/User/user',
    method: 'post',
    params: {
      userAccount: values.userAccount,
      userName: values.userName,
      userPhone: values.userPhone,
      userEmail: values.userEmail,
      userPassword: values.userPassword
    }
  })
    .then(response => {
      // 处理获取到的数据
      console.log(response.data);
      router.push('/login')
    })
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.userAccount &&
    formState.userEmail &&
    formState.userName &&
    formState.userPassword &&
    formState.userRePassword &&
    formState.userPhone)
})
</script>

<style lang="scss" scoped>
html,
body,
#app {
  width: 100%;
}



.register {
  width: 600px;
  background-color: rgba(183, 183, 247, 0.4);
  margin: 0 auto;
  border: 0px solid black;
  border-radius: 2rem;
  color: #000;
  padding-bottom: 20px;

  h1 {
    line-height: 5rem;
    text-align: center;
  }

  .register-form {
    width: 60%;
    margin: 0 auto;
  }

  a {
    color: aliceblue;
  }
}


#components-form-demo-normal-register .register-form {
  max-width: 300px;
}

#components-form-demo-normal-register .register-form-forgot {
  float: right;
}

#components-form-demo-normal-register .register-form-button {
  width: 100%;
}
</style>
