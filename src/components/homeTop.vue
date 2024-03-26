<template>
    <div class="top">
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title=" 数派π 甄选电商管理系统"
            sub-title="SHU PI 数派π brand commerce Manager System " >
            <template #extra>
          <div class="flex items-center">
            <el-button type="error" class="ml-2" @click="logout">退出</el-button>
          </div>
        </template>
        </a-page-header>
    </div>
</template>

<script lang="js" setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

let router = useRouter()

const logout = function () { 
    console.log("ts");
    axios.request({
        url: 'http://localhost/User/logout',
        method: 'get',
        params: {},
        data: {},
        withCredentials: true
    })
        .then(response => {
            // 处理获取到的数据
            const data = response.data.result
            router.push('/login')
        })
}
</script>

<style lang="scss" scoped>
    .top {
        background-color: #bcdbff;
    }
</style>