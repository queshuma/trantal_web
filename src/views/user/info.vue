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
import link from "@/api/Link.js";

const formSize = ref('default')
const UserData = ref({})

link("/User/info", 'GET',{}, {}, {}).then(response => {
  // 处理获取到的数据
  UserData.value = response.data.result
})

const submitInfo = () => {
  link("/User/user", 'GET', UserData.value, {}, { 'Content-Type': 'application/json' }, true).then(response => {
    // 处理获取到的数据
    UserData.value = response.data.result
  })
}

const resetForm = () => {
  link("/User/find", 'GET', UserData.value, {}, {}, true).then(response => {
    // 处理获取到的数据
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
