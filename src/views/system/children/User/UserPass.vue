<template>
    <div class="content">
        <h2>修改用户密码</h2>
        <el-form style="max-width: 600px" :model="userInfo" status-icon :rules="rules" label-width="auto"
            class="demo-ruleForm">
            <el-form-item label="用户Id" prop="id">
                <el-input v-model="userInfo.id"/>
            </el-form-item>
            <el-form-item label="用户昵称" prop="account">
                <el-input v-model="userInfo.account" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="用户姓名" prop="name">
                <el-input v-model="userInfo.name" disabled />
            </el-form-item>
            <el-form-item label="用户手机" prop="phone">
                <el-input v-model="userInfo.phone" disabled />
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
                <el-input v-model="userInfo.password" :disabled="!checkUser" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="checkEvent()" v-if="!checkUser">校验用户</el-button>
                <el-button type="primary" @click="modifyEvent()" v-else>修改密码</el-button>
                <el-button @click="reset()">刷新页面</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="js" setup>
import { reactive, ref } from 'vue'
import axios from 'axios';

const userInfo = reactive(
    {
        id: '',
        name: '',
        account: '',
        phone: '',
        password: '',
    }
)
const checkUser = ref(false)

//校验用户信息
const checkEvent = function () { 
    axios.request({
        url: 'http://localhost/User/info/id',
        method: 'GET',
        params: {
            userId: userInfo.id
        },
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            const userData = response.data.result
            userInfo.account = userData.userAccount
            userInfo.name = userData.userName
            userInfo.phone = userData.userPhone
            checkUser.value = !checkUser.value
        })
}

const modifyEvent = () => {
    axios.request({
        url: 'http://localhost/User/password',
        method: 'PUT',
        params: {
            userId: userInfo.id,
            password: userInfo.password
        },
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            console.log(response.data.result)
        })
}

const reset = function() {
    window.location.reload()
}
</script>
<style lang="scss" scoped>
.content {
    width: 80%;
    margin: 20px auto;
}
</style>
