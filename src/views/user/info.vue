<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <indexTop></indexTop>
            </el-header>
            <el-container class="content">
                <el-aside width="200px">
                    <shopLeft></shopLeft>
                </el-aside>
                <el-container>
                    <el-main>
                        <h2>用户信息</h2>
                        <el-form :inline="true" label-width="180px" class="demo-ruleForm" :size="formSize" status-icon>
                            <el-form-item label="用户昵称">
                                <el-input v-model=UserData.userAccount />
                            </el-form-item>
                            <el-form-item label="用户姓名">
                                <el-input v-model=UserData.userName />
                            </el-form-item>
                            <el-form-item label="联系手机号">
                                <el-input v-model=UserData.userPhone />
                            </el-form-item>
                            <el-form-item label="邮箱地址">
                                <el-input v-model=UserData.userEmail />
                            </el-form-item>
                            <el-form-item label="邮箱地址">
                                <el-input v-model=UserData.userEmail />
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <el-input v-model=UserData.userTime :disabled="true" />
                            </el-form-item>
                            <el-form-item label="最后登录时间">
                                <el-input v-model=UserData.userLast :disabled="true" />
                            </el-form-item>
                            <el-form-item style="display:inline;">
                                <el-button type="primary" @click="submitInfo">
                                    提交信息
                                </el-button>
                                <el-button @click="resetForm">重置信息</el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer>
                <indexBottom></indexBottom>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref } from 'vue'

import axios from 'axios';

const formSize = ref('default')
const UserData = ref({})


axios.request({
    url: 'http://localhost/User/info',
    method: 'get',
    params: {},
    data: {},
    withCredentials: true
})
    .then(response => {
        // 处理获取到的数据
        console.log(response)
        UserData.value = response.data.result
        console.log(UserData.value.userAccount)
    })

const submitInfo = () => {
    console.log(UserData.value.userAccount)
    axios.request({
                url: 'http://localhost/User/user',
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        params: {},
        data: UserData.value,
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            UserData.value = response.data.result
        })
}

const resetForm = () => {
    axios.request({
        url: 'http://localhost/User/find',
        method: 'get',
        params: {},
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            console.log(response)
            UserData.value = response.data.result
        })
}


</script>

<style lang="scss" scoped>
body {
    position: relative;
}

.el-main {
    min-height: 800px;
}

.content {
    width: 80%;
    margin: 0 auto;
    padding: 0;

}

.el-header {
    padding: 0;
    margin: 0;
    height: auto;
}

.el-footer {
    padding: 0;
    margin: 0;
}
</style>
