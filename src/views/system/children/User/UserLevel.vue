<template>
    <div>
        <h2>用户信息</h2>
          <el-input v-model="input" placeholder="请输入用户手机号" class="info-input" @change="getUserData()"/>
        <el-form :inline="true" label-width="180px" class="demo-ruleForm" :size="formSize" v-if="UserData" status-icon>
            <el-form-item label="品牌名称" disabled>
                <el-input v-model=UserData.userAccount :disabled="true" />
            </el-form-item>
            <el-form-item label="用户姓名">
                <el-input v-model=UserData.userName :disabled="true" />
            </el-form-item>
            <el-form-item label="联系手机号">
                <el-input v-model=UserData.userPhone :disabled="true" />
            </el-form-item>
            <el-form-item label="邮箱地址">
                <el-input v-model=UserData.userEmail :disabled="true" />
            </el-form-item>
            <el-form-item label="邮箱地址">
                <el-input v-model=UserData.userEmail :disabled="true" />
            </el-form-item>
            <el-form-item label="注册时间">
                <el-input v-model=UserData.userTime :disabled="true" />
            </el-form-item>
            <el-form-item label="最后登录时间">
                <el-input v-model=UserData.userLast :disabled="true" />
            </el-form-item>
            <el-form-item label="修改用户等级权限">
                <el-select v-model="UserData.userLevel">
                    <el-option label="普通消费者-00" value="0" />
                    <el-option label="入驻品牌方-01" value="1" />
                    <el-option label="系统管理员-02" value="2" />
                </el-select>
            </el-form-item>
            <el-form-item style="display:inline-block;margin-top:40px;" >
                <el-button type="primary" @click="submitInfo" style="margin-left: 400px;">
                    提交信息
                </el-button>
                <el-button @click="resetForm">重置信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="js" setup>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios';

const UserData = ref()
const input = ref()

onMounted(() => {
    
})

const submitInfo = () => {
    console.log(UserData.value)
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

const getUserData = function () {
    axios.request({
        url: 'http://localhost/User/info/phone',
        method: 'get',
        params: {
            userPhone: input.value
        },
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            UserData.value = response.data.result
            console.log(response)
        })
 }

</script>

<style lang="scss" scoped>
.info-input{
    width: 300px;
    text-align: right;
    margin: 10px 0 20px 60%;
}
</style>